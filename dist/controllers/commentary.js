"use strict";
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
const moment_1 = __importDefault(require("moment"));
const apollo_server_express_1 = require("apollo-server-express");
const commentary_1 = __importDefault(require("../models/commentary"));
const jwt_1 = __importDefault(require("../utils/jwt"));
exports.addCommentary = ({ Challenge, commentary }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwt_1.default.validateToken(token, ctx.req.body.variables.publicKey);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        if (ctx.req.ipInfo.error) {
            ctx.req.ipInfo = {};
        }
        let newCommentary = new commentary_1.default({
            Challenge,
            User: tokenData.userId,
            commentary,
            created_by: tokenData.userId,
            updated_by: tokenData.userId,
            created_at: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ"),
            updated_at: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        });
        yield newCommentary.save();
        return Promise.resolve(`${newCommentary._id} succesfully created`);
    }
    catch (error) {
        return new apollo_server_express_1.ApolloError(error);
    }
});
exports.deleteCommentary = ({ id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwt_1.default.validateToken(token, ctx.req.body.variables.publicKey);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        let deletedCommentary = yield commentary_1.default.delete({ $and: [{ _id: id }, { created_by: tokenData.userId }] }, tokenData.userId);
        return Promise.resolve(`${id.toString()} succesfully deleted`);
    }
    catch (error) {
        console.log(error);
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.getCommentarys = ({ page = 0, size = 0, search }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let offset = page * size;
        let limit = offset + size;
        let result = search.length > 0
            ? yield commentary_1.default
                .find({
                $or: [
                    { name: { $regex: ".*" + search + ".*" } },
                    { _id: { $regex: ".*" + search + ".*" } }
                ]
            })
                .skip(offset)
                .limit(limit)
            : yield commentary_1.default
                .find({})
                .skip(offset)
                .limit(limit);
        return Promise.resolve(result);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.modifyCommentary = ({ Challenge, commentary, id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwt_1.default.validateToken(token, ctx.req.body.variables.publicKey);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        if (ctx.req.ipInfo.error) {
            ctx.req.ipInfo = {};
        }
        let newCommentary = yield commentary_1.default.findOneAndUpdate({ $and: [{ _id: id }, { created_by: tokenData.userId }] }, {
            Challenge,
            commentary,
            updated_at: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        }, { omitUndefined: true });
        return Promise.resolve(`${newCommentary._id} succesfully updated`);
    }
    catch (error) {
        return new apollo_server_express_1.ApolloError(error);
    }
});
//# sourceMappingURL=commentary.js.map