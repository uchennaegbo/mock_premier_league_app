"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: import-name
var joi_1 = __importDefault(require("joi"));
exports.validateUser = function (input) {
    var schema = {
        name: joi_1.default.string()
            .min(3)
            .max(255)
            .required(),
        email: joi_1.default.string()
            .email()
            .required(),
        password: joi_1.default.string().required(),
    };
    return joi_1.default.validate(input, schema);
};
//# sourceMappingURL=user.js.map