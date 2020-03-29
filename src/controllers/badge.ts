import moment from "moment";
import { ApolloError } from "apollo-server-express";

import badgeModel from "../models/badge";
import { findInput } from "../schema/WalletSchema";
import JwtAdmin from "../utils/jwtAdmin";
import Jwt from "../utils/jwt";
import jwtTicket from "../utils/jwtTicket";
import { decrypt, encrypt } from "../utils/crypt";
import { NewBadge, ModifyBadge } from "../schema/BadgesSchema";

export const addBadge = async (
  { image, name, type, color }: NewBadge,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await JwtAdmin.validateToken(token);

    let tokenData: any = await JwtAdmin.decrypt_data(localToken)();

    let newBadge = new badgeModel({
      image,
      name,
      type,
      color,
      created_by: tokenData.userId,
      updated_by: tokenData.userId
    });

    await newBadge.save();

    return Promise.resolve(`${newBadge._id} succesfully created`);
  } catch (error) {
    console.log(error);

    return new ApolloError(error);
  }
};

export const getBadges = async ({ page = 0, size = 0, search }: findInput) => {
  try {
    let offset = page * size;
    let limit = offset + size;

    let result =
      search.length > 0
        ? await badgeModel
            .find({
              $or: [
                { name: { $regex: ".*" + search + ".*" } },
                { _id: { $regex: ".*" + search + ".*" } }
              ]
            })
            .skip(offset)
            .limit(limit)
            .lean()
        : await badgeModel
            .find({})
            .skip(offset)
            .limit(limit)
            .lean();

    return Promise.resolve(result);
  } catch (error) {
    new ApolloError(error);
  }
};

export const deleteBadge = async ({ id }: any, ctx: any) => {
  try {
    let token = ctx.req.headers.token;

    let localToken = await JwtAdmin.validateToken(token);

    let tokenData: any = await JwtAdmin.decrypt_data(localToken)();

    await badgeModel.delete({ _id: id }, tokenData.userId);

    return Promise.resolve(`${id} succesfully deleted`);
  } catch (error) {
    new ApolloError(error);
  }
};

export const modifyBadge = async (
  { id, image, name, type, color }: ModifyBadge,
  ctx: any
) => {
  try {
    let token = ctx.req.headers.token;
    let localToken = await JwtAdmin.validateToken(token);

    let tokenData: any = await JwtAdmin.decrypt_data(localToken)();

    let updatedBadge = await badgeModel.findByIdAndUpdate(
      id,
      {
        name,
        image,
        type,
        color,
        created_by: tokenData.userId,
        updated_by: tokenData.userId,
        updated_at: moment().format("YYYY-MM-DD/HH:mm:ZZ")
      },
      { omitUndefined: true }
    );

    return Promise.resolve(`${updatedBadge._id} succesfully updated`);
  } catch (error) {
    throw new ApolloError(error);
  }
};
