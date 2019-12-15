"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EmptyQueryError_1 = __importDefault(require("../../../lib/errors/EmptyQueryError"));
var InvalidArgumentError_1 = __importDefault(require("../../../lib/errors/InvalidArgumentError"));
var AuthError_1 = __importDefault(require("../../../lib/errors/AuthError"));
var LoginErrorHandler = /** @class */ (function () {
    function LoginErrorHandler(error, res) {
        this.expectedErrors = [EmptyQueryError_1.default, InvalidArgumentError_1.default, AuthError_1.default];
        this.error = error;
        this.res = res;
    }
    LoginErrorHandler.handleErrorAndSendFailure = function (error, res) {
        var handler = new LoginErrorHandler(error, res);
        handler.handleError();
    };
    LoginErrorHandler.prototype.handleError = function () {
        console.error(this.error);
        if (this.isErrorExpected())
            this.res.status(400).send("Wrong email or password.");
        else
            this.res.status(500).send("Unexpected error. Try again later.");
    };
    LoginErrorHandler.prototype.isErrorExpected = function () {
        var _this = this;
        return this.expectedErrors.some(function (errorType) { return _this.error instanceof errorType; });
    };
    return LoginErrorHandler;
}());
exports.default = LoginErrorHandler;
