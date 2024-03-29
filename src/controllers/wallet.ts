import moment from "moment";
import { ApolloError } from "apollo-server-express";

import walletModel from "../models/wallet";
import { findInput, completeChallenge, Coins } from "../schema/WalletSchema";

import Jwt from "../utils/jwt";
import JwtAdmin from "../utils/jwtAdmin";
import jwtTicket from "../utils/jwtTicket";
import jwtArena from "../utils/jwtArena";
import rarity_model from "../models/Rarity";
import jwt from "jsonwebtoken";
import { decrypt, encrypt } from "../utils/crypt";
import banned_model from "../models/banned";

const is_less_than_24 = (start: string, end: string) => {
  var duration = moment.duration(
    moment(end, "YYYY-MM-DD/HH:mm:ZZ").diff(
      moment(start, "YYYY-MM-DD/HH:mm:ZZ")
    )
  );
  var total_time = duration.asHours();

  return total_time <= 24 ? true : false;
};

const get_total_hours = (start: string, end: string) => {
  var duration = moment.duration(
    moment(end, "YYYY-MM-DD/HH:mm:ZZ").diff(
      moment(start, "YYYY-MM-DD/HH:mm:ZZ")
    )
  );
  var total_time = duration.asMinutes();

  return total_time;
};

const get_total = <T extends number>(items: T[], multipli_items: T[]) => {
  let sum = items.reduce((a, b) => a + b, 0);
  return multipli_items.reduce((a, b) => a * b, sum);
};

// ? get the challenge range
const get_grade = (less24: boolean, commentary: number, photo: number) => {
  let grades = ["D+", "C+", "B+", "A+"];
  let grade = 0;
  if (less24) {
    grade++;
  }
  [commentary, photo].map(i => (i > 1 ? grade++ : null));
  console.log(grade);
  return grades[grade];
};

export const setCompleteChallenge = async (
  { challenge, commentary, media }: completeChallenge,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;
    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );
    let tokenData: any = await Jwt.decrypt_data(localToken)();

    let localTokenChallenge = await jwtTicket.validateToken(challenge);
    let decryptlocalTokenChallenge: any = await jwtTicket.decrypt_data(
      localTokenChallenge
    )();

    let localTokenCommentary =
      commentary && (await jwtTicket.validateToken(commentary));
    let decryptlocalTokenCommentary: any = !!commentary
      ? await jwtTicket.decrypt_data(localTokenCommentary)()
      : { multiplier: 1 };
    console.log("commentary", decryptlocalTokenCommentary);

    let localTokenMedia = media && (await jwtTicket.validateToken(media));
    let decryptlocalTokenMedia: any = media
      ? await jwtTicket.decrypt_data(localTokenMedia)()
      : { multiplier: 1 };

    console.log("media", decryptlocalTokenMedia);
    // ? the challenge points
    let after_24: number = is_less_than_24(
      decryptlocalTokenChallenge.created_at,
      decryptlocalTokenChallenge.closed_at
    )
      ? 100
      : 0;

    let total_time: number = get_total_hours(
      decryptlocalTokenChallenge.created_at,
      decryptlocalTokenChallenge.closed_at
    );

    let challenge_coins: number = +decryptlocalTokenChallenge.points;

    // * ratity points
    let rarity = await rarity_model.findOne({
      name: decryptlocalTokenChallenge.rarity
    });
    let decripted_rariry = {
      ...rarity,
      coins: decrypt(rarity.coins),
      level: decrypt(rarity.level),
      trophys: decrypt(rarity.trophys)
    };

    let rarityCoins: number = +decripted_rariry.coins;
    let rarityLevel: number = +decripted_rariry.level;
    let rarityTrophys: number = +decripted_rariry.trophys;

    // ! commentary & photos points
    let commentaryMultiplier = +decryptlocalTokenCommentary.multiplier;
    let mediaMultiplier = +decryptlocalTokenMedia.multiplier;

    let totalCoins = get_total(
      [rarityCoins, after_24, challenge_coins],
      [commentaryMultiplier, mediaMultiplier]
    );
    console.log("total from challenge", totalCoins);

    let currentWallet = await walletModel.findOne({
      User: decryptlocalTokenChallenge.userId
    });

    let currentCoins = currentWallet ? decrypt(currentWallet.Coins.total) : 0;
    let currentLevel = currentWallet ? decrypt(currentWallet.Level.total) : 0;
    let currentTrophys = currentWallet
      ? decrypt(currentWallet.Trophys.total)
      : 0;

    console.log(currentCoins, currentLevel, currentTrophys);

    currentCoins = +currentCoins + totalCoins;
    currentTrophys = +currentTrophys + rarityTrophys;
    currentLevel = +currentLevel + rarityLevel;

    let newCommentary = await walletModel.findOneAndUpdate(
      { User: tokenData.userId },
      {
        User: tokenData.userId,
        Coins: {
          total: encrypt(currentCoins.toString()),
          last_earned: moment().format("YYYY-MM-DD/HH:mm:ZZ")
        },
        Trophys: {
          total: encrypt(currentTrophys.toString()),
          last_earned: moment().format("YYYY-MM-DD/HH:mm:ZZ")
        },
        Level: {
          total: encrypt(currentLevel.toString()),
          last_earned: moment().format("YYYY-MM-DD/HH:mm:ZZ")
        },
        created_by: tokenData.userId,
        updated_by: tokenData.userId,
        created_at: moment().format("YYYY-MM-DD/HH:mm:ZZ"),
        updated_at: moment().format("YYYY-MM-DD/HH:mm:ZZ")
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    let idChallengeToken = (await jwt.decode(challenge, {
      complete: true
    })) as any;

    let idMediaToken = (await jwt.decode(media, {
      complete: true
    })) as any;

    let idCommentaryToken = (await jwt.decode(commentary, {
      complete: true
    })) as any;

    let bannedTokenChallenge = new banned_model({
      token: idChallengeToken.header.kid
    });
    await bannedTokenChallenge.save();

    if (media) {
      let bannedTokenMedia = new banned_model({
        token: idMediaToken.header.kid
      });
      await bannedTokenMedia.save();
    }

    if (commentary) {
      let bannedTokenCommentary = new banned_model({
        token: idCommentaryToken.header.kid
      });
      await bannedTokenCommentary.save();
    }
    let grade = get_grade(!!after_24, mediaMultiplier, commentaryMultiplier);

    let stats = {
      Challenge: decryptlocalTokenChallenge.Challenge,
      Commentary: commentary ? decryptlocalTokenCommentary._id : "",
      Points: {
        total: totalCoins,
        after24: after_24,
        rarity: rarityCoins,
        completed: challenge_coins,
        trophys: rarityTrophys,
        experience: rarityLevel,
        grade,
        photos: mediaMultiplier,
        commentary: commentaryMultiplier
      },
      total_time,
      start_date: decryptlocalTokenChallenge.created_at,
      end_date: decryptlocalTokenChallenge.closed_at
    };

    return Promise.resolve({
      msg: `${newCommentary._id} succesfully created`,
      code: "200",
      stats
    });
  } catch (error) {
    console.log(error);

    throw new ApolloError(error);
  }
};

export const getWallets = async (
  { page = 0, size = 0, search }: findInput,
  ctx: any
) => {
  try {
    let offset = page * size;
    let limit = offset + size;
    let token = ctx.req.headers.token;

    let localToken = await JwtAdmin.validateToken(token);

    let result =
      search.length > 0
        ? await walletModel
            .find({
              $or: [{ _id: { $regex: ".*" + search + ".*" } }]
            })
            .skip(offset)
            .limit(limit)
        : await walletModel
            .find({})
            .skip(offset)
            .limit(limit);

    let descripted_result = result.map((i: any) => ({
      ...i,
      Coins: { ...i.Coins, total: decrypt(i.Coins.total) },
      Level: { ...i.Level, total: decrypt(i.Level.total) },
      Trophys: { ...i.Trophys, total: decrypt(i.Trophys.total) }
    }));

    return Promise.resolve(descripted_result);
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const myWallets = async (ctx: any) => {
  try {
    let token = ctx.req.headers.token;
    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );
    let tokenData: any = await Jwt.decrypt_data(localToken)();

    let result = await walletModel.findOne({ User: tokenData.userId }).lean();

    if (!result) {
      let newWallet = await walletModel
        .findOneAndUpdate(
          { User: tokenData.userId },
          {
            User: tokenData.userId,
            Coins: {
              total: encrypt("0".toString()),
              last_earned: moment().format("YYYY-MM-DD/HH:mm:ZZ")
            },
            Trophys: {
              total: encrypt("0".toString()),
              last_earned: moment().format("YYYY-MM-DD/HH:mm:ZZ")
            },
            Level: {
              total: encrypt("0".toString()),
              last_earned: moment().format("YYYY-MM-DD/HH:mm:ZZ")
            },
            created_by: tokenData.userId,
            updated_by: tokenData.userId,
            created_at: moment().format("YYYY-MM-DD/HH:mm:ZZ"),
            updated_at: moment().format("YYYY-MM-DD/HH:mm:ZZ")
          },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
          }
        )
        .lean();

      let decrypted_result = {
        ...newWallet,
        Coins: { ...newWallet.Coins, total: "0" },
        Level: { ...newWallet.Level, total: "0" },
        Trophys: {
          ...newWallet.Trophys,
          total: "0"
        }
      };
      console.log(decrypted_result);
      return Promise.resolve(decrypted_result);
    }
    console.log(result);

    let decrypted_result = {
      ...result,
      Coins: { ...result.Coins, total: decrypt(result.Coins.total) },
      Level: { ...result.Level, total: decrypt(result.Level.total) },
      Trophys: { ...result.Trophys, total: decrypt(result.Trophys.total) }
    };
    console.log(decrypted_result);

    return Promise.resolve(decrypted_result);
  } catch (error) {
    throw new ApolloError(error);
  }
};

// ? returns your max arena based on your points
export const myArena = async (arenas: string, ctx: any) => {
  try {
    let token = ctx.req.headers.token;
    let localToken = await Jwt.validateToken(
      token,
      ctx.req.body.variables.publicKey
    );
    let tokenData: any = await Jwt.decrypt_data(localToken)();

    let arenaToken = await jwtArena.validateToken(arenas);
    let tokenArenaData: any = await Jwt.decrypt_data(arenaToken)();

    let result = await walletModel.findOne({ User: tokenData.userId }).lean();

    let decrypted_result = {
      ...result,
      Coins: { ...result.Coins, total: decrypt(result.Coins.total) },
      Level: { ...result.Level, total: decrypt(result.Level.total) },
      Trophys: { ...result.Trophys, total: decrypt(result.Trophys.total) }
    };

    let filteredArenas = JSON.parse(tokenArenaData.arenas).filter(
      (i: any) => i.minPoints <= decrypted_result.Level.total
    );

    let currentArena = filteredArenas.reduce((a: any, b: any) =>
      a.minPoints >= b.minPoints ? a : b
    );

    return Promise.resolve({
      availableArenas: [...filteredArenas.map((i: any) => ({ _id: i.id }))],
      currentArena: { _id: currentArena.id }
    });
  } catch (error) {
    console.log(error);

    throw new ApolloError(error);
  }
};
