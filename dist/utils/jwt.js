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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypt_1 = require("./crypt");
class Token {
    constructor(data) {
        this.configuration_token = {
            algorithm: "RS256"
        };
        this.data = Object.assign({ issuer: process.env.AUTOR, audience: process.env.APP_NAME }, data);
        this.token = "";
    }
    static decrypt_data(object_data) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                let llave_objeto = Object.keys(object_data);
                let nuevo = {};
                llave_objeto.map((i) => {
                    if (i != "iat" && i != "exp") {
                        nuevo = Object.assign(Object.assign({}, nuevo), { [i]: crypt_1.decrypt(object_data[i]) });
                    }
                });
                return Promise.resolve(nuevo);
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
    _crypt_data() {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                let llave_objeto = Object.keys(this.data);
                let nuevo = {};
                llave_objeto.map((i) => (nuevo = Object.assign(Object.assign({}, nuevo), { [i]: crypt_1.encrypt(this.data[i]) })));
                return Promise.resolve(nuevo);
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
    create_token(expiresIn = "24h", keyid, privateKey) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.data = Object.assign({}, (yield this._crypt_data()()));
            try {
                this.token = yield jsonwebtoken_1.default.sign(this.data, privateKey, {
                    algorithm: "RS256",
                    expiresIn,
                    keyid,
                    issuer: process.env.APP_NAME,
                    audience: "GENERAL"
                });
                resolve(this.token);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    static validateToken(token, publicKey) {
        try {
            return Promise.resolve(jsonwebtoken_1.default.verify(token, publicKey));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
exports.default = Token;
//# sourceMappingURL=jwt.js.map