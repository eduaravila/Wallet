import {
  ObjectType,
  Field,
  Int,
  ID,
  InputType,
  Directive,
  registerEnumType
} from "type-graphql";
import {
  Trim,
  SanitizerConstraint,
  SanitizerInterface,
  Sanitize
} from "class-sanitizer";
import { Type } from "class-transformer";
import mongoose from "mongoose";

import { IsTokenBanned } from "../utils/validators/banned";

@SanitizerConstraint()
export class toLowerCase implements SanitizerInterface {
  sanitize(text: string): string {
    return text.toLowerCase();
  }
}

@Directive("@extends")
@Directive(`@key(fields: "_id")`)
@ObjectType()
export class User {
  @Directive("@external")
  @Field(type => ID)
  _id: mongoose.Types.ObjectId;
}

@ObjectType()
export class Coins {
  @Field(type => String)
  total: string;

  @Field(type => String)
  last_earned: string;

  @Field(type => String)
  last_spend: string;
}

@ObjectType()
export class Level {
  @Field(type => String)
  total: string;

  @Field(type => String)
  current: string;

  @Field(type => String)
  last_earned: string;

  @Field(type => String)
  last_spend: string;
}

@ObjectType()
export class SuccessResponse {
  @Field(type => String)
  msg?: string;

  @Field(type => String)
  code?: string;
}

@ObjectType()
export class Points {
  @Field(type => Int, { nullable: true })
  total: number;

  @Field(type => Int, { nullable: true })
  after24: number;

  @Field(type => Int, { nullable: true })
  rarity: number;

  @Field(type => Int, { nullable: true })
  completed: number;

  @Field(type => Int, { nullable: true })
  trophys: number;

  @Field(type => Int, { nullable: true })
  experience: number;

  @Field(type => String, { nullable: true })
  grade: string;

  @Field(type => Int, { nullable: true })
  photos: number;

  @Field(type => Int, { nullable: true })
  commentary: number;
}

@ObjectType()
export class StatsObject {
  @Field(type => String)
  Challenge: string;

  @Field(type => ID)
  Commentary: mongoose.Types.ObjectId;

  @Field(type => Points)
  Points: Points;

  @Field(type => String)
  start_date: string;

  @Field(type => String)
  total_time: string;

  @Field(type => String)
  end_date: string;
}

@ObjectType()
export class SuccessResponseStats {
  @Field(type => String)
  msg?: string;

  @Field(type => String)
  code?: string;

  @Field(type => StatsObject)
  stats?: StatsObject;
}

@InputType()
export class findInput {
  @Field(type => Int, { nullable: true })
  page: number;

  @Field(type => Int, { nullable: true })
  size: number;

  @Field(type => String, { nullable: true, defaultValue: "" })
  @Trim()
  @Sanitize(toLowerCase)
  search: string;
}

@Directive(`@key(fields:"_id")`)
@ObjectType()
export class Wallet {
  @Field(type => ID)
  _id: mongoose.Types.ObjectId;

  @Field(type => Coins, { nullable: true })
  Coins: Coins;

  @Field(type => Level, { nullable: true })
  Level: Level;

  @Type(() => User)
  @Field()
  User: User;

  @Field(type => String, { nullable: true })
  created_at: string;

  @Field(type => String, { nullable: true })
  updated_at: string;

  @Field(type => ID, { nullable: true })
  updated_by: mongoose.Types.ObjectId;

  @Field(type => ID, { nullable: true })
  created_by: mongoose.Types.ObjectId;
}

@InputType()
export class completeChallenge {
  @IsTokenBanned({ message: "This token is already marked" })
  @Field(type => String, { description: "Token from the commentary service" })
  commentary: string;

  @IsTokenBanned({ message: "This token is already marked" })
  @Field(type => String, { description: "Token from the media service" })
  media: string;

  @IsTokenBanned({ message: "This token is already marked" })
  @Field(type => String, { description: "Token from the challenge service" })
  challenge: string;
}
