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
const wallet_1 = __importDefault(require("../models/wallet"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const jwtAdmin_1 = __importDefault(require("../utils/jwtAdmin"));
exports.setCompleteChallenge = ({ challenge, commentary, media }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateTokenWallet(token);
        let localTokenChallenge = yield jwtAdmin_1.default.validateTokenWallet(challenge);
        let localTokenCommentary = yield jwtAdmin_1.default.validateTokenWallet(commentary);
        let localTokenMedia = yield jwtAdmin_1.default.validateTokenWallet(media);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        if (ctx.req.ipInfo.error) {
            ctx.req.ipInfo = {};
        }
        let newCommentary = new wallet_1.default({
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
exports.getWallets = ({ page = 0, size = 0, search }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let offset = page * size;
        let limit = offset + size;
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let result = search.length > 0
            ? yield wallet_1.default
                .find({
                $or: [
                    { User: { $regex: ".*" + search + ".*" } },
                    { _id: { $regex: ".*" + search + ".*" } }
                ]
            })
                .skip(offset)
                .limit(limit)
            : yield wallet_1.default
                .find({})
                .skip(offset)
                .limit(limit);
        return Promise.resolve(result);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
//# sourceMappingURL=wallet.js.map