"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const Commentary_schema = new mongoose_1.default.Schema({
    commentary: {
        type: String,
        required: true
    },
    User: {
        type: mongoose_1.default.Types.ObjectId
    },
    Challenge: {
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
Commentary_schema.plugin(mongoose_delete_1.default, {
    deletedAt: true,
    indexFields: true,
    overrideMethods: true,
    deletedBy: true
});
const commentary_model = mongoose_1.default.model("commentary", Commentary_schema);
exports.default = commentary_model;
//# sourceMappingURL=commentary.js.map