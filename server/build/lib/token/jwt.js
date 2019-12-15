"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var EnvVarError_1 = __importDefault(require("../errors/EnvVarError"));
var secret = process.env.JWT_SECRET;
if (!secret)
    throw new EnvVarError_1.default("JWT_SECRET");
var jwt = /** @class */ (function () {
    function jwt() {
    }
    jwt.sign = function (payload) {
        return jsonwebtoken_1.default.sign(payload, this.secret);
    };
    jwt.verify = function (token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secret);
        }
        catch (error) {
            throw error;
        }
    };
    jwt.decode = function (token) {
        return jsonwebtoken_1.default.decode(token);
    };
    jwt.secret = secret;
    return jwt;
}());
exports.default = jwt;
