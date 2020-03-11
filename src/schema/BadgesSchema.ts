import {
  ObjectType,
  Field,
  Directive,
  Int,
  InputType,
  registerEnumType,
  ID
} from "type-graphql";
import { Type } from "class-transformer";
import mongoose from "mongoose";
import {
  Trim,
  SanitizerConstraint,
  SanitizerInterface,
  Sanitize
} from "class-sanitizer";

import { decrypt, encrypt } from "../utils/crypt";
import badge_model from "../models/badge";

@SanitizerConstraint()
export class toLowerCase implements SanitizerInterface {
  sanitize(text: string): string {
    return text.toLowerCase();
  }
}

enum badgeTypeEnum {
  Type = "type",
  Ratiry = "rarity",
  Zone = "zone"
}

registerEnumType(badgeTypeEnum, {
  name: "badgeTypeEnum"
});

@ObjectType()
export class SuccessResponse {
  @Field(type => String)
  msg?: string;

  @Field(type => String)
  code?: string;
}

@Directive(`@key(fields:"_id")`)
@ObjectType()
export class Badge {
  @Field(type => ID, { nullable: false })
  _id: mongoose.Types.ObjectId;

  @Field(type => badgeTypeEnum)
  type: badgeTypeEnum;

  @Field(type => String)
  name: string;

  @Field(type => String)
  image: string;

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
export class NewBadge {
  @Field(type => badgeTypeEnum)
  type: badgeTypeEnum;

  @Field(type => String)
  name: string;

  @Field(type => String)
  image: string;
}

@InputType()
export class EditBadge {
  @Field(type => badgeTypeEnum, { nullable: true })
  type: badgeTypeEnum;

  @Field(type => String, { nullable: true })
  name: string;

  @Field(type => String, { nullable: true })
  image: string;
}

@InputType({ description: "Modify an existing badge" })
export class ModifyBadge extends EditBadge {
  @Field(type => ID)
  id: mongoose.Types.ObjectId;
}

export async function resolveBadgeReference(
  reference: Pick<Badge, "_id">
): Promise<Badge> {
  let result = await badge_model.findOne({ _id: reference._id });
  return result;
}
