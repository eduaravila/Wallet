import mongoose, { Schema, mongo } from "mongoose";
import bc from "bcrypt";
import moment from "moment";
import { BannedModelType, BannedModelStaticsType } from "./types";
import mongoose_delete from "mongoose-delete";

const Banned_schema: Schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "1h" } // ? deleted in automatic if the user not continue with the registration process
  },
  created_at: {
    type: String,
    required: true,
    default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
  },
  updated_at: {
    type: String,
    required: true,
    default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
  },
  created_by: {
    type: mongoose.Types.ObjectId
  },
  updated_by: {
    type: mongoose.Types.ObjectId
  }
});

Banned_schema.plugin(mongoose_delete, {
  deletedAt: true,
  indexFields: true,
  overrideMethods: true,
  deletedBy: true
});

const banned_model = mongoose.model<BannedModelType, BannedModelStaticsType>(
  "banned",
  Banned_schema
);

export default banned_model;
