import moment from "moment";
import { ApolloError } from "apollo-server-express";

import { findInput } from "../schema/WalletSchema";
import { newRarity, ModifyRarity } from "../schema/RaritySchema";
import { decrypt, encrypt } from "../utils/crypt";
import JwtAdmin from "../utils/jwtAdmin";
import rarity_model from "../models/Rarity";

export const setNewRarity = async (
  { coins, level, name, trophys }: newRarity,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await JwtAdmin.validateToken(token);

    let tokenData: any = await JwtAdmin.decrypt_data(localToken)();
    if (ctx.req.ipInfo.error) {
      ctx.req.ipInfo = {};
    }

    let {
      country = "",
      region = "",
      city = "",
      timezone = "",
      ll = []
    } = ctx.req.ipInfo;

    let coinsEncripted = encrypt(coins.toString());
    let levelEncripted = encrypt(level.toString());
    let trophysEncripted = encrypt(trophys.toString());

    let newRarityDb = new rarity_model({
      name,
      coins: coinsEncripted,
      level: levelEncripted,
      trophys: trophysEncripted,
      created_by: tokenData.userId,
      updated_by: tokenData.userId,
      location: {
        country,
        region,
        city,
        timezone,
        ll
      }
    });
    await newRarityDb.save();
    return Promise.resolve(`${newRarityDb._id} succesfully created`);
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const modifyRarity = async (
  { coins, level, name, trophys, id }: ModifyRarity,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await JwtAdmin.validateToken(token);

    let tokenData: any = await JwtAdmin.decrypt_data(localToken)();
    if (ctx.req.ipInfo.error) {
      ctx.req.ipInfo = {};
    }

    let {
      country = "",
      region = "",
      city = "",
      timezone = "",
      ll = []
    } = ctx.req.ipInfo;

    let coinsEncripted = coins ? encrypt(coins.toString()) : undefined;
    let levelEncripted = level ? encrypt(level.toString()) : undefined;
    let trophysEncripted = trophys ? encrypt(trophys.toString()) : undefined;

    let editRarityDb = await rarity_model.findByIdAndUpdate(
      { _id: id },
      {
        name,
        coins: coinsEncripted,
        level: levelEncripted,
        trophys: trophysEncripted,
        updated_by: tokenData.userId,
        updated_at: moment().format("YYYY-MM-DD/HH:mm:ZZ"),
        location: {
          country,
          region,
          city,
          timezone,
          ll
        }
      },
      { omitUndefined: true }
    );
    await editRarityDb.save();

    return Promise.resolve(`${editRarityDb._id} succesfully updated`);
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const deleteRarity = async ({ id }: any, ctx: any) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await JwtAdmin.validateToken(token);

    let tokenData: any = await JwtAdmin.decrypt_data(localToken)();

    await rarity_model.delete({ _id: id }, tokenData.userId);

    return Promise.resolve(`${id} succesfully deleted`);
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const getRarity = async (
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
        ? await rarity_model
            .find({
              $or: [
                { name: { $regex: ".*" + search + ".*" } },
                { _id: { $regex: ".*" + search + ".*" } }
              ]
            })
            .skip(offset)
            .limit(limit)
            .lean()
        : await rarity_model
            .find({})
            .skip(offset)
            .limit(limit)
            .lean();

    let descripted_result = result.map(i => ({
      ...i,
      coins: decrypt(i.coins),
      level: decrypt(i.level),
      trophys: decrypt(i.trophys)
    }));

    return Promise.resolve(descripted_result);
  } catch (error) {
    throw new ApolloError(error);
  }
};
