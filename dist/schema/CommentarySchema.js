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
let Challenge = class Challenge {
};
__decorate([
    type_graphql_1.Directive("@external"),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Challenge.prototype, "_id", void 0);
Challenge = __decorate([
    type_graphql_1.Directive("@extends"),
    type_graphql_1.Directive(`@key(fields: "_id")`),
    type_graphql_1.ObjectType()
], Challenge);
exports.Challenge = Challenge;
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
let Commentary = class Commentary {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], Commentary.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Commentary.prototype, "commentary", void 0);
__decorate([
    class_transformer_1.Type(() => User),
    type_graphql_1.Field(),
    __metadata("design:type", User)
], Commentary.prototype, "User", void 0);
__decorate([
    class_transformer_1.Type(() => Challenge),
    type_graphql_1.Field(),
    __metadata("design:type", Challenge)
], Commentary.prototype, "Challenge", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Commentary.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], Commentary.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Commentary.prototype, "updated_by", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Commentary.prototype, "created_by", void 0);
Commentary = __decorate([
    type_graphql_1.Directive(`@key(fields:"_id")`),
    type_graphql_1.ObjectType()
], Commentary);
exports.Commentary = Commentary;
let newCommentary = class newCommentary {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], newCommentary.prototype, "commentary", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], newCommentary.prototype, "Challenge", void 0);
newCommentary = __decorate([
    type_graphql_1.InputType()
], newCommentary);
exports.newCommentary = newCommentary;
let editCommentary = class editCommentary {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], editCommentary.prototype, "commentary", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], editCommentary.prototype, "User", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], editCommentary.prototype, "Challenge", void 0);
editCommentary = __decorate([
    type_graphql_1.InputType()
], editCommentary);
let commentarytEditInfo = class commentarytEditInfo extends editCommentary {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], commentarytEditInfo.prototype, "id", void 0);
commentarytEditInfo = __decorate([
    type_graphql_1.InputType()
], commentarytEditInfo);
exports.commentarytEditInfo = commentarytEditInfo;
//# sourceMappingURL=CommentarySchema.js.map