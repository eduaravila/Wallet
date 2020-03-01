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
var rarityEmun;
(function (rarityEmun) {
    rarityEmun["Normal"] = "normal";
    rarityEmun["Epic"] = "epic";
    rarityEmun["Legendary"] = "legendary";
})(rarityEmun || (rarityEmun = {}));
type_graphql_1.registerEnumType(rarityEmun, {
    name: "rarityEmun"
});
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
let Rarity = class Rarity {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], Rarity.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => rarityEmun, { nullable: true }),
    __metadata("design:type", String)
], Rarity.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], Rarity.prototype, "trophys", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], Rarity.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], Rarity.prototype, "coins", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Rarity.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Rarity.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Rarity.prototype, "updated_by", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Rarity.prototype, "created_by", void 0);
Rarity = __decorate([
    type_graphql_1.Directive(`@key(fields:"_id")`),
    type_graphql_1.ObjectType()
], Rarity);
exports.Rarity = Rarity;
let newRarity = class newRarity {
};
__decorate([
    type_graphql_1.Field(type => rarityEmun),
    __metadata("design:type", String)
], newRarity.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], newRarity.prototype, "trophys", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], newRarity.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], newRarity.prototype, "coins", void 0);
newRarity = __decorate([
    type_graphql_1.InputType()
], newRarity);
exports.newRarity = newRarity;
let EditRarity = class EditRarity {
};
__decorate([
    type_graphql_1.Field(type => rarityEmun, { nullable: true }),
    __metadata("design:type", String)
], EditRarity.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { nullable: true }),
    __metadata("design:type", Number)
], EditRarity.prototype, "trophys", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { nullable: true }),
    __metadata("design:type", Number)
], EditRarity.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { nullable: true }),
    __metadata("design:type", Number)
], EditRarity.prototype, "coins", void 0);
EditRarity = __decorate([
    type_graphql_1.InputType()
], EditRarity);
exports.EditRarity = EditRarity;
let ModifyRarity = class ModifyRarity extends EditRarity {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], ModifyRarity.prototype, "id", void 0);
ModifyRarity = __decorate([
    type_graphql_1.InputType({ description: "Modify an existing ratiry value" })
], ModifyRarity);
exports.ModifyRarity = ModifyRarity;
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
//# sourceMappingURL=RaritySchema.js.map