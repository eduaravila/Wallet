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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const class_sanitizer_1 = require("class-sanitizer");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = __importDefault(require("mongoose"));
let toLowerCase = class toLowerCase {
    sanitize(text) {
        return text.toLowerCase();
    }
};
toLowerCase = __decorate([
    class_sanitizer_1.SanitizerConstraint()
], toLowerCase);
exports.toLowerCase = toLowerCase;
let User = class User {
};
__decorate([
    type_graphql_1.Directive("@external"),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
User = __decorate([
    type_graphql_1.Directive("@extends"),
    type_graphql_1.Directive(`@key(fields: "_id")`),
    type_graphql_1.ObjectType()
], User);
exports.User = User;
let Coins = class Coins {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Coins.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Coins.prototype, "last_earned", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Coins.prototype, "last_spend", void 0);
Coins = __decorate([
    type_graphql_1.ObjectType()
], Coins);
exports.Coins = Coins;
let Level = class Level {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Level.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Level.prototype, "current", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Level.prototype, "last_earned", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Level.prototype, "last_spend", void 0);
Level = __decorate([
    type_graphql_1.ObjectType()
], Level);
exports.Level = Level;
let SuccessResponse = class SuccessResponse {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "msg", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "code", void 0);
SuccessResponse = __decorate([
    type_graphql_1.ObjectType()
], SuccessResponse);
exports.SuccessResponse = SuccessResponse;
let findInput = class findInput {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], findInput.prototype, "page", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], findInput.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true, defaultValue: "" }),
    class_sanitizer_1.Trim(),
    class_sanitizer_1.Sanitize(toLowerCase),
    __metadata("design:type", String)
], findInput.prototype, "search", void 0);
findInput = __decorate([
    type_graphql_1.InputType()
], findInput);
exports.findInput = findInput;
let Wallet = class Wallet {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], Wallet.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => Coins, { nullable: true }),
    __metadata("design:type", Coins)
], Wallet.prototype, "Coins", void 0);
__decorate([
    type_graphql_1.Field(type => Level, { nullable: true }),
    __metadata("design:type", Level)
], Wallet.prototype, "Level", void 0);
__decorate([
    class_transformer_1.Type(() => User),
    type_graphql_1.Field(),
    __metadata("design:type", User)
], Wallet.prototype, "User", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Wallet.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Wallet.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Wallet.prototype, "updated_by", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Wallet.prototype, "created_by", void 0);
Wallet = __decorate([
    type_graphql_1.Directive(`@key(fields:"_id")`),
    type_graphql_1.ObjectType()
], Wallet);
exports.Wallet = Wallet;
let completeChallenge = class completeChallenge {
};
__decorate([
    type_graphql_1.Field(type => String, { description: "Token from the commentary service" }),
    __metadata("design:type", String)
], completeChallenge.prototype, "commentary", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "Token from the media service" }),
    __metadata("design:type", String)
], completeChallenge.prototype, "media", void 0);
__decorate([
    type_graphql_1.Field(type => String, { description: "Token from the challenge service" }),
    __metadata("design:type", String)
], completeChallenge.prototype, "challenge", void 0);
completeChallenge = __decorate([
    type_graphql_1.InputType()
], completeChallenge);
exports.completeChallenge = completeChallenge;
//# sourceMappingURL=WalletSchema.js.map