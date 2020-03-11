import mongoose, { Schema, mongo } from "mongoose";
import mongoose_delete from "mongoose-delete";
import bc from "bcrypt";
import moment from "moment";
import { BadgeModelType, BadgeModelStaticsType } from "./types";

const Badge_schema: Schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["type", "rarity", "zone"],
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  updated_by: {
    type: mongoose.Types.ObjectId,
    required: true
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
  }
});

Badge_schema.plugin(mongoose_delete, {
  deletedAt: true,
  indexFields: true,
  overrideMethods: true,
  deletedBy: true
});

const challenge_model = mongoose.model<BadgeModelType, BadgeModelStaticsType>(
  "badge",
  Badge_schema
);

export default challenge_model;
