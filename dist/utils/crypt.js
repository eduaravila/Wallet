"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
exports.encrypt = (data) => {
    let encrypted_data = crypto_js_1.default.AES.encrypt(data, process.env.SECRET).toString();
    return encrypted_data;
};
exports.decrypt = (data) => {
    let decrypted_data = crypto_js_1.default.AES.decrypt(data, process.env.SECRET);
    return decrypted_data.toString(crypto_js_1.default.enc.Utf8);
};
//# sourceMappingURL=crypt.js.map