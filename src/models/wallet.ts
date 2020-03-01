import mongoose, { Schema, mongo } from "mongoose";
import bc from "bcrypt";
import moment from "moment";
import { WalletModelType, WalletModelStaticsType } from "./types";
import mongoose_delete from "mongoose-delete";

const Wallet_schema: Schema = new mongoose.Schema({
  Coins: {
    total: {
      type: Number,
      required: true
    },
    last_earned: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    last_spend: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    }
  },
  Trophys: {
    total: {
      type: Number,
      required: true
    },
    last_earned: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    last_spend: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    }
  },
  Level: {
    actual: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    last_earned: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    last_spend: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
    }
  },
  User: {
    type: mongoose.Types.ObjectId
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

Wallet_schema.plugin(mongoose_delete, {
  deletedAt: true,
  indexFields: true,
  overrideMethods: true,
  deletedBy: true
});

const wallet_model = mongoose.model<WalletModelType, WalletModelStaticsType>(
  "wallet",
  Wallet_schema
);

export default wallet_model;
