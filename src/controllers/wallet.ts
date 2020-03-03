import moment from "moment";
import { ApolloError } from "apollo-server-express";

import walletModel from "../models/wallet";
import { findInput, completeChallenge } from "../schema/WalletSchema";

import Jwt from "../utils/jwt";
import JwtAdmin from "../utils/jwtAdmin";

export const setCompleteChallenge = async (
  { challenge, commentary, media }: completeChallenge,
  ctx: any
) => {
  try {
    
    let token = ctx.req.headers.token;
    let localToken = await JwtAdmin.validateTokenWallet(token);
    let localTokenChallenge = await JwtAdmin.validateTokenWallet(challenge);
    let localTokenCommentary = await JwtAdmin.validateTokenWallet(commentary);
    let localTokenMedia = await JwtAdmin.validateTokenWallet(media);

    let tokenData: any = await Jwt.decrypt_data(localToken)();

    if (ctx.req.ipInfo.error) {
      ctx.req.ipInfo = {};
    }

    let newCommentary = new walletModel({
      created_by: tokenData.userId,
      updated_by: tokenData.userId,
      created_at: moment().format("YYYY-MM-DD/HH:mm:ZZ"),
      updated_at: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    });
    await newCommentary.save();
    return Promise.resolve(`${newCommentary._id} succesfully created`);
  } catch (error) {
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
              $or: [
                { User: { $regex: ".*" + search + ".*" } },
                { _id: { $regex: ".*" + search + ".*" } }
              ]
            })
            .skip(offset)
            .limit(limit)
        : await walletModel
            .find({})
            .skip(offset)
            .limit(limit);

    return Promise.resolve(result);
  } catch (error) {
    throw new ApolloError(error);
  }
};
