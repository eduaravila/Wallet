import { Resolver, Mutation, Arg, Ctx, Query, ID } from "type-graphql";

import { Badge, NewBadge, ModifyBadge } from "../schema/BadgesSchema";
import { SuccessResponse, findInput } from "../schema/WalletSchema";
import {
  addBadge,
  getBadges,
  deleteBadge,
  modifyBadge
} from "../controllers/badge";

@Resolver(of => Badge)
export class BadgeResolver {
  @Mutation(returns => SuccessResponse, {
    description: "Admin query 🔏"
  })
  async AddBadge(
    @Arg("NewBadge", () => NewBadge) NewBadge: NewBadge,
    @Ctx() ctx: any
  ) {
    let msg = await addBadge(NewBadge, ctx);
    return {
      msg,
      code: "200"
    };
  }

  @Query(returns => [Badge])
  async badges(@Arg("findInput", () => findInput) findInput: findInput) {
    let msg = await getBadges(findInput);
    return [...msg];
  }

  @Mutation(returns => SuccessResponse, {
    description: "Admin query 🔏"
  })
  async DeleteBadge(@Arg("id", () => ID) id: number, @Ctx() ctx: any) {
    let msg = await deleteBadge({ id }, ctx);
    return {
      msg,
      code: "200"
    };
  }

  @Mutation(returns => SuccessResponse, {
    description: "Admin query 🔏"
  })
  async ModifyBadge(
    @Arg("ModifyBadge", { nullable: true })
    modifyBadgeInput: ModifyBadge,
    @Ctx() ctx: any
  ) {
    let msg = await modifyBadge(modifyBadgeInput, ctx);
    return {
      msg,
      code: "200"
    };
  }
}
