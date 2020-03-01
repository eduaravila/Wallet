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
const crypt_1 = require("../utils/crypt");
const jwtAdmin_1 = __importDefault(require("../utils/jwtAdmin"));
const Rarity_1 = __importDefault(require("../models/Rarity"));
exports.setNewRarity = ({ coins, level, name, trophys }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let tokenData = yield jwtAdmin_1.default.decrypt_data(localToken)();
        if (ctx.req.ipInfo.error) {
            ctx.req.ipInfo = {};
        }
        let { country = "", region = "", city = "", timezone = "", ll = [] } = ctx.req.ipInfo;
        let coinsEncripted = crypt_1.encrypt(coins.toString());
        let levelEncripted = crypt_1.encrypt(level.toString());
        let trophysEncripted = crypt_1.encrypt(trophys.toString());
        let newRarityDb = new Rarity_1.default({
            name,
            coins: coinsEncripted,
            level: levelEncripted,
            trophys: trophysEncripted,
            created_by: tokenData.userId,
            updated_by: tokenData.userId,
            location: {
                country,
                region,
                city,
                timezone,
                ll
            }
        });
        yield newRarityDb.save();
        return Promise.resolve(`${newRarityDb._id} succesfully created`);
    }
    catch (error) {
        console.log(error);
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.modifyRarity = ({ coins, level, name, trophys, id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let tokenData = yield jwtAdmin_1.default.decrypt_data(localToken)();
        if (ctx.req.ipInfo.error) {
            ctx.req.ipInfo = {};
        }
        let { country = "", region = "", city = "", timezone = "", ll = [] } = ctx.req.ipInfo;
        let coinsEncripted = coins ? crypt_1.encrypt(coins.toString()) : undefined;
        let levelEncripted = level ? crypt_1.encrypt(level.toString()) : undefined;
        let trophysEncripted = trophys ? crypt_1.encrypt(trophys.toString()) : undefined;
        let editRarityDb = yield Rarity_1.default.findByIdAndUpdate({ _id: id }, {
            name,
            coins: coinsEncripted,
            level: levelEncripted,
            trophys: trophysEncripted,
            updated_by: tokenData.userId,
            updated_at: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ"),
            location: {
                country,
                region,
                city,
                timezone,
                ll
            }
        }, { omitUndefined: true });
        yield editRarityDb.save();
        console.log(editRarityDb);
        return Promise.resolve(`${editRarityDb._id} succesfully updated`);
    }
    catch (error) {
        console.log(error);
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.deleteRarity = ({ id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let tokenData = yield jwtAdmin_1.default.decrypt_data(localToken)();
        let deletedChallenge = yield Rarity_1.default.delete({ _id: id }, tokenData.userId);
        return Promise.resolve(`${deletedChallenge._id} succesfully created`);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
exports.getRarity = ({ page = 0, size = 0, search }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let offset = page * size;
        let limit = offset + size;
        let token = ctx.req.headers.token;
        let localToken = yield jwtAdmin_1.default.validateToken(token);
        let result = search.length > 0
            ? yield Rarity_1.default
                .find({
                $or: [
                    { name: { $regex: ".*" + search + ".*" } },
                    { _id: { $regex: ".*" + search + ".*" } }
                ]
            })
                .skip(offset)
                .limit(limit)
            : yield Rarity_1.default
                .find({})
                .skip(offset)
                .limit(limit);
        let descripted_result = result.map(i => (Object.assign(Object.assign({}, i), { coins: crypt_1.decrypt(i.coins), level: crypt_1.decrypt(i.level), trophys: crypt_1.decrypt(i.trophys) })));
        return Promise.resolve(descripted_result);
    }
    catch (error) {
        new apollo_server_express_1.ApolloError(error);
    }
});
//# sourceMappingURL=rarity.js.map