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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../models/User");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jwt_1 = __importDefault(require("../../../lib/token/jwt"));
var EmptyQueryError_1 = __importDefault(require("../../../lib/errors/EmptyQueryError"));
var InvalidArgumentError_1 = __importDefault(require("../../../lib/errors/InvalidArgumentError"));
var AuthError_1 = __importDefault(require("../../../lib/errors/AuthError"));
var LoginErrorHandler_1 = __importDefault(require("./LoginErrorHandler"));
var LoginHandler = /** @class */ (function () {
    function LoginHandler(req, res) {
        this.userFromDB = {};
        this.res = res;
        this.checkLoginBodyType(req.body);
        this.body = req.body;
    }
    LoginHandler.prototype.checkLoginBodyType = function (body) {
        var email = body.email, password = body.password;
        if (typeof email != "string")
            this.throwNotAStringError("email", email);
        if (typeof password != "string")
            this.throwNotAStringError("password", password);
    };
    LoginHandler.prototype.throwNotAStringError = function (varName, variable) {
        throw new InvalidArgumentError_1.default(varName, "string", typeof variable);
    };
    LoginHandler.prototype.handle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tryLoggingIn()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        LoginErrorHandler_1.default.handleErrorAndSendFailure(error_1, this.res);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginHandler.prototype.tryLoggingIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUser()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.arePasswordMatching()];
                    case 2:
                        if (_a.sent())
                            this.sendSuccess();
                        else
                            throw new AuthError_1.default();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginHandler.prototype.findUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryUser()];
                    case 1:
                        user = _a.sent();
                        if (user)
                            this.userFromDB = user;
                        else
                            this.throwNoUserFoundError();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginHandler.prototype.queryUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.UserModel.findOne()
                            .where("email")
                            .equals(this.body.email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginHandler.prototype.arePasswordMatching = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcryptjs_1.default.compare(this.body.password, this.userFromDB.password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginHandler.prototype.sendSuccess = function () {
        this.res.status(200).send(this.getToken());
    };
    LoginHandler.prototype.getToken = function () {
        return jwt_1.default.sign({
            id: this.userFromDB.id
        });
    };
    LoginHandler.prototype.throwNoUserFoundError = function () {
        throw new EmptyQueryError_1.default("user", "email");
    };
    LoginHandler.callback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var handler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = new LoginHandler(req, res);
                    return [4 /*yield*/, handler.handle()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return LoginHandler;
}());
exports.default = LoginHandler;
