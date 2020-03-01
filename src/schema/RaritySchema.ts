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

enum rarityEmun {
  Normal = "normal",
  Epic = "epic",
  Legendary = "legendary"
}

registerEnumType(rarityEmun, {
  name: "rarityEmun"
});

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
export class Rarity {
  @Field(type => String, { nullable: false })
  _id: string;

  @Field(type => rarityEmun, { nullable: true })
  name: rarityEmun;

  @Field(type => String, { nullable: false })
  trophys: string;

  @Field(type => String, { nullable: false })
  level: string;

  @Field(type => String, { nullable: false })
  coins: string;

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
export class newRarity {
  @Field(type => rarityEmun)
  name: rarityEmun;

  @Field(type => Number)
  trophys: number;

  @Field(type => Number)
  level: number;

  @Field(type => Number)
  coins: number;
}

@InputType()
export class EditRarity {
  @Field(type => rarityEmun, { nullable: true })
  name: rarityEmun;

  @Field(type => Number, { nullable: true })
  trophys: number;

  @Field(type => Number, { nullable: true })
  level: number;

  @Field(type => Number, { nullable: true })
  coins: number;
}

@InputType({ description: "Modify an existing ratiry value" })
export class ModifyRarity extends EditRarity {
  @Field(type => ID)
  id: mongoose.Types.ObjectId;
}

//TODO ADD a service to add poinst in case of drops or promotions

// @InputType()
// class editCommentary {
//   @Field(type => String, { nullable: true })
//   commentary: string;

//   @Field(type => ID, { nullable: true })
//   User: mongoose.Types.ObjectId;

//   @Field(type => ID, { nullable: true })
//   Challenge: mongoose.Types.ObjectId;
// }

// @InputType()
// export class commentarytEditInfo extends editCommentary {
//   @Field(type => ID)
//   id: mongoose.Types.ObjectId;
// }
