"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvConfigResult = dotenv_1.default.config();
if (dotenvConfigResult.error)
    throw dotenvConfigResult.error;
console.clear();
const MONGO_URI = process.env.DB_URI;
if (MONGO_URI) {
    mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Database connected.");
    });
}
else
    throw new Error("MONGO_URI environmental variable is essential, but was not provided.");
const PORT = (_a = process.env.PORT, (_a !== null && _a !== void 0 ? _a : "3000"));
const app = express_1.default();
app.listen(PORT, () => {
    console.log(`Listening at ${PORT} port.`);
});
