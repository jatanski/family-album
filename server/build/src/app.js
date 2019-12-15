"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var EnvVarError_1 = __importDefault(require("../lib/errors/EnvVarError"));
var LoginAPI_1 = require("./enpoints/login/LoginAPI");
var dotenvConfigResult = dotenv_1.default.config();
if (dotenvConfigResult.error)
    throw dotenvConfigResult.error;
console.clear();
var MONGO_URI = process.env.DB_URI;
if (MONGO_URI) {
    mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
        console.log("Database connected.");
    });
}
else
    throw new EnvVarError_1.default("DB_URI");
var PORT = (_a = process.env.PORT, (_a !== null && _a !== void 0 ? _a : "3000"));
var app = express_1.default();
app.use(express_1.json());
app.use("/login", new LoginAPI_1.LoginAPI().router);
app.listen(PORT, function () {
    console.log("Listening at " + PORT + " port.");
});
