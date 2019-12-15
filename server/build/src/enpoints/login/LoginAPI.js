"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoginHandler_1 = __importDefault(require("./LoginHandler"));
var express_1 = require("express");
var LoginAPI = /** @class */ (function () {
    function LoginAPI() {
        this.router = express_1.Router();
        this.router.post("/", LoginHandler_1.default.callback);
    }
    return LoginAPI;
}());
exports.LoginAPI = LoginAPI;
