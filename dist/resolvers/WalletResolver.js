"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const WalletSchema_1 = require("../schema/WalletSchema");
const wallet_1 = require("../controllers/wallet");
let WalletResolver = class WalletResolver {
    Wallets(findInput, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield wallet_1.getWallets(findInput, ctx);
            return [...msg];
        });
    }
    CompleteChallenge(completeChallenge, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield wallet_1.setCompleteChallenge(completeChallenge, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => [WalletSchema_1.Wallet], {
        description: "Admin query 🔏"
    }),
    __param(0, type_graphql_1.Arg("findInput", () => WalletSchema_1.findInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WalletSchema_1.findInput, Object]),
    __metadata("design:returntype", Promise)
], WalletResolver.prototype, "Wallets", null);
__decorate([
    type_graphql_1.Mutation(returns => WalletSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("completeChallenge", () => WalletSchema_1.completeChallenge)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WalletSchema_1.completeChallenge, Object]),
    __metadata("design:returntype", Promise)
], WalletResolver.prototype, "CompleteChallenge", null);
WalletResolver = __decorate([
    type_graphql_1.Resolver(of => WalletSchema_1.Wallet)
], WalletResolver);
exports.WalletResolver = WalletResolver;
//# sourceMappingURL=WalletResolver.js.map