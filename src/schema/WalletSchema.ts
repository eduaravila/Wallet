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
  @Field()
  _id: string;
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
  @Field(type => String, { nullable: false })
  _id: string;

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
  @Field(type => String, { description: "Token from the commentary service" })
  commentary: string;

  @Field(type => String, { description: "Token from the media service" })
  media: string;

  @Field(type => String, { description: "Token from the challenge service" })
  challenge: string;
}
