import mongoose, { Schema, mongo } from "mongoose";
import bc from "bcrypt";
import moment from "moment";
import { RarityModelType, RarityModelStaticsType } from "./types";
import mongoose_delete from "mongoose-delete";

const Rarity_schema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["normal", "epic", "legendary"]
  },
  trophys: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    required: true,
    unique: true
  },
  coins: {
    type: String,
    required: true,
    unique: true
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

Rarity_schema.plugin(mongoose_delete, {
  deletedAt: true,
  indexFields: true,
  overrideMethods: true,
  deletedBy: true
});

const rarity_model = mongoose.model<RarityModelType, RarityModelStaticsType>(
  "rarity",
  Rarity_schema
);

export default rarity_model;
