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
import {
  SuccessResponse,
  findInput,
  completeChallenge,
  Wallet
} from "../schema/WalletSchema";

import { getWallets, setCompleteChallenge } from "../controllers/wallet";

@Resolver(of => Wallet)
export class WalletResolver {
  @Query(returns => [Wallet], {
    description: "Admin query 🔏"
  })
  async Wallets(
    @Arg("findInput", () => findInput) findInput: findInput,
    @Ctx() ctx: any
  ) {
    let msg = await getWallets(findInput, ctx);
    return [...msg];
  }

  @Mutation(returns => SuccessResponse)
  async CompleteChallenge(
    @Arg("completeChallenge", () => completeChallenge)
    completeChallenge: completeChallenge,
    @Ctx() ctx: any
  ) {
    let msg = await setCompleteChallenge(completeChallenge, ctx);
    return {
      msg,
      code: "200"
    };
  }
}
