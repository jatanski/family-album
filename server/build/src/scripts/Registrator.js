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
var readline_1 = __importDefault(require("readline"));
var joi_1 = __importDefault(require("@hapi/joi"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var User_1 = require("../models/User");
var Registrator = /** @class */ (function () {
    function Registrator() {
    }
    Registrator.main = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Welcome in register process.");
                        if (!this.isAnyInputDataMissing(email, password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.askForData()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.email = email;
                        this.password = password;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.tryRegistering()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error(error_1.message);
                        process.exit(1);
                        return [3 /*break*/, 6];
                    case 6:
                        console.log("You are registered now with email: " + this.email + " and password: " + this.password + ".");
                        this.rl.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    Registrator.isAnyInputDataMissing = function (email, password) {
        return !email || !password;
    };
    Registrator.askForData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.asyncQuestion("email: ")];
                    case 1:
                        _a.email = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.asyncQuestion("password: ")];
                    case 2:
                        _b.password = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Registrator.asyncQuestion = function (query) {
        var _this = this;
        return new Promise(function (res) {
            _this.rl.question(query, res);
        });
    };
    Registrator.tryRegistering = function () {
        return __awaiter(this, void 0, void 0, function () {
            var password, _a, _b, _c, user;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.validateInput();
                        _b = (_a = bcryptjs_1.default).hash;
                        _c = [this.password];
                        return [4 /*yield*/, bcryptjs_1.default.genSalt()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    case 2:
                        password = _d.sent();
                        user = new User_1.UserModel({ email: this.email, password: password });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Registrator.validateInput = function () {
        var error = this.scheme.validate({
            email: this.email,
            password: this.password
        }).error;
        if (error)
            throw error;
    };
    Registrator.email = "";
    Registrator.password = "";
    Registrator.scheme = joi_1.default.object({
        email: joi_1.default
            .string()
            .email()
            .required(),
        password: joi_1.default
            .string()
            .min(3)
            .regex(/[a-z]/)
            .regex(/[A-Z]/)
            .regex(/[0-9]/)
            .required()
    });
    Registrator.rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return Registrator;
}());
exports.Registrator = Registrator;
