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
const mongoose_1 = __importDefault(require("mongoose"));
const connect_db = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set("useCreateIndex", true);
        let db = process.env.DEV
            ? yield mongoose_1.default.connect(`mongodb://127.0.0.1:27017/wallet`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            : yield mongoose_1.default.connect(`mongodb+srv://ECOLOTE:${process.env.DB_PASS}@cluster0-u30oq.mongodb.net/wallet`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        return Promise.resolve({ msg: "Data base conected" });
    }
    catch (error) {
        console.log(error);
        Promise.reject("Error with the data base conection");
    }
});
exports.default = connect_db;
//# sourceMappingURL=index.js.map