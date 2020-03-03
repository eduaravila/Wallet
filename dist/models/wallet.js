"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const Wallet_schema = new mongoose_1.default.Schema({
    Coins: {
        total: {
            type: Number,
            required: true
        },
        last_earned: {
            type: String,
            required: true,
            default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        },
        last_spend: {
            type: String,
            required: true,
            default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        }
    },
    Trophys: {
        total: {
            type: Number,
            required: true
        },
        last_earned: {
            type: String,
            required: true,
            default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        },
        last_spend: {
            type: String,
            required: true,
            default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        }
    },
    Level: {
        actual: {
            type: Number,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        last_earned: {
            type: String,
            required: true,
            default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        },
        last_spend: {
            type: String,
            required: true,
            default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
        }
    },
    User: {
        type: mongoose_1.default.Types.ObjectId
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
Wallet_schema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    indexFields: true,
    overrideMethods: true,
    deletedBy: true
});
const wallet_model = mongoose_1.default.model("wallet", Wallet_schema);
exports.default = wallet_model;
//# sourceMappingURL=wallet.js.map