import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Arg,
  Ctx,
  ID
} from "type-graphql";
import { SuccessResponse, findInput } from "../schema/WalletSchema";

import {
  EditRarity,
  ModifyRarity,
  Rarity,
  newRarity
} from "../schema/RaritySchema";
import {
  modifyRarity,
  setNewRarity,
  deleteRarity,
  getRarity
} from "../controllers/rarity";

@Resolver(of => Rarity)
export class RarityResolver {
  @Query(returns => [Rarity], {
    description: "Admin query 🔏"
  })
  async Raritys(
    @Arg("findInput", () => findInput) findInput: findInput,
    @Ctx() ctx: any
  ) {
    let msg = await getRarity(findInput, ctx);
    return [...msg];
  }

  @Mutation(returns => SuccessResponse, {
    description: "Admin query 🔏"
  })
  async NewRarity(
    @Arg("newRarity", () => newRarity)
    newRarity: newRarity,
    @Ctx() ctx: any
  ) {
    let msg = await setNewRarity(newRarity, ctx);
    return {
      msg,
      code: "200"
    };
  }

  @Mutation(returns => SuccessResponse, {
    description: "Admin query 🔏"
  })
  async ModifyRarity(
    @Arg("ModifyRarity", () => ModifyRarity)
    ModifyRarity: ModifyRarity,
    @Ctx() ctx: any
  ) {
    let msg = await modifyRarity(ModifyRarity, ctx);
    return {
      msg,
      code: "200"
    };
  }

  @Mutation(returns => SuccessResponse, {
    description: "Admin query 🔏"
  })
  async DeleteRarity(@Arg("id", () => ID) id: number, @Ctx() ctx: any) {
    let msg = await deleteRarity({ id }, ctx);
    return {
      msg,
      code: "200"
    };
  }
}
