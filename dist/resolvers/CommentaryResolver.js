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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const CommentarySchema_1 = require("../schema/CommentarySchema");
const commentary_1 = require("../controllers/commentary");
const mongoose_1 = __importDefault(require("mongoose"));
let CommentaryResolver = class CommentaryResolver {
    Commentarys(findInput) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield commentary_1.getCommentarys(findInput);
            return [...msg];
        });
    }
    NewCommentary(newCommentary, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield commentary_1.addCommentary(newCommentary, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    DeleteCommentary(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield commentary_1.deleteCommentary({ id }, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    ModifyCommentary(commentarytEditInfo, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield commentary_1.modifyCommentary(commentarytEditInfo, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => [CommentarySchema_1.Commentary]),
    __param(0, type_graphql_1.Arg("findInput", () => CommentarySchema_1.findInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentarySchema_1.findInput]),
    __metadata("design:returntype", Promise)
], CommentaryResolver.prototype, "Commentarys", null);
__decorate([
    type_graphql_1.Mutation(returns => CommentarySchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("newCommentary", () => CommentarySchema_1.newCommentary)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentarySchema_1.newCommentary, Object]),
    __metadata("design:returntype", Promise)
], CommentaryResolver.prototype, "NewCommentary", null);
__decorate([
    type_graphql_1.Mutation(returns => CommentarySchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], CommentaryResolver.prototype, "DeleteCommentary", null);
__decorate([
    type_graphql_1.Mutation(returns => CommentarySchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("commentarytEditInfo", () => CommentarySchema_1.commentarytEditInfo)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentarySchema_1.commentarytEditInfo, Object]),
    __metadata("design:returntype", Promise)
], CommentaryResolver.prototype, "ModifyCommentary", null);
CommentaryResolver = __decorate([
    type_graphql_1.Resolver(of => CommentarySchema_1.Commentary)
], CommentaryResolver);
exports.CommentaryResolver = CommentaryResolver;
//# sourceMappingURL=CommentaryResolver.js.map