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
  Wallet,
  SuccessResponseStats,
  CurrentArena
} from "../schema/WalletSchema";

import {
  getWallets,
  setCompleteChallenge,
  myWallets,
  myArena
} from "../controllers/wallet";

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

  @Query(returns => Wallet, {
    description: "Admin query 🔏"
  })
  async MyWallet(@Ctx() ctx: any) {
    return await myWallets(ctx);
  }

  @Query(returns => CurrentArena)
  async MyArena(@Arg("arenas", () => String) arenas: string, @Ctx() ctx: any) {
    return await myArena(arenas, ctx);
  }

  @Mutation(returns => SuccessResponseStats)
  async CompleteChallenge(
    @Arg("completeChallenge", () => completeChallenge)
    completeChallenge: completeChallenge,
    @Ctx() ctx: any
  ) {
    return await setCompleteChallenge(completeChallenge, ctx);
  }
}
