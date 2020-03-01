import mongoose, { Model } from "mongoose";
import {
  SoftDeleteDocument,
  SoftDeleteInterface,
  SoftDeleteModel
} from "mongoose-delete";

enum rarityEmun {
  Normal = "normal",
  Epic = "epic",
  Legendary = "legendary"
}

export interface WalletModelType extends mongoose.Document, SoftDeleteDocument {
  Coins: {
    total: number;
    last_earned: string;
    last_spend: string;
  };
  Trophys: {
    total: number;
    last_earned: string;
    last_spend: string;
  };
  Level: {
    actual: number;
    points: number;
    last_earned: string;
    last_spend: string;
  };
  User: {
    _id: mongoose.Types.ObjectId;
  };
  created_at: string;
  updated_at: string;
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
}

export interface WalletModelStaticsType
  extends SoftDeleteModel<WalletModelType> {}

export interface BannedModelType extends mongoose.Document, SoftDeleteDocument {
  token: string;
  created_at: string;
  updated_at: string;
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
}

export interface BannedModelStaticsType
  extends SoftDeleteModel<BannedModelType> {}

export interface RarityModelType extends mongoose.Document, SoftDeleteDocument {
  name: rarityEmun;
  trophys: string;
  level: string;
  coins: string;
  created_at: string;
  updated_at: string;
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
}

export interface RarityModelStaticsType
  extends SoftDeleteModel<RarityModelType> {}
