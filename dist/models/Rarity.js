"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const Rarity_schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ["normal", "epic", "legendary"]
    },
    trophys: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        required: true,
        unique: true
    },
    coins: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: String,
        required: true,
        default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    updated_at: {
        type: String,
        required: true,
        default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    created_by: {
        type: mongoose_1.default.Types.ObjectId
    },
    updated_by: {
        type: mongoose_1.default.Types.ObjectId
    }
});
Rarity_schema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    indexFields: true,
    overrideMethods: true,
    deletedBy: true
});
const rarity_model = mongoose_1.default.model("rarity", Rarity_schema);
exports.default = rarity_model;
//# sourceMappingURL=Rarity.js.map