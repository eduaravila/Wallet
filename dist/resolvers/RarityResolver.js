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
const RaritySchema_1 = require("../schema/RaritySchema");
const rarity_1 = require("../controllers/rarity");
let RarityResolver = class RarityResolver {
    Raritys(findInput, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield rarity_1.getRarity(findInput, ctx);
            return [...msg];
        });
    }
    NewRarity(newRarity, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield rarity_1.setNewRarity(newRarity, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    ModifyRarity(ModifyRarity, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield rarity_1.modifyRarity(ModifyRarity, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    DeleteRarity(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield rarity_1.deleteRarity({ id }, ctx);
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
], RarityResolver.prototype, "Raritys", null);
__decorate([
    type_graphql_1.Mutation(returns => WalletSchema_1.SuccessResponse, {
        description: "Admin query 🔏"
    }),
    __param(0, type_graphql_1.Arg("newRarity", () => RaritySchema_1.newRarity)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RaritySchema_1.newRarity, Object]),
    __metadata("design:returntype", Promise)
], RarityResolver.prototype, "NewRarity", null);
__decorate([
    type_graphql_1.Mutation(returns => WalletSchema_1.SuccessResponse, {
        description: "Admin query 🔏"
    }),
    __param(0, type_graphql_1.Arg("ModifyRarity", () => RaritySchema_1.ModifyRarity)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RaritySchema_1.ModifyRarity, Object]),
    __metadata("design:returntype", Promise)
], RarityResolver.prototype, "ModifyRarity", null);
__decorate([
    type_graphql_1.Mutation(returns => WalletSchema_1.SuccessResponse, {
        description: "Admin query 🔏"
    }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RarityResolver.prototype, "DeleteRarity", null);
RarityResolver = __decorate([
    type_graphql_1.Resolver(of => WalletSchema_1.Wallet)
], RarityResolver);
exports.RarityResolver = RarityResolver;
//# sourceMappingURL=RarityResolver.js.map