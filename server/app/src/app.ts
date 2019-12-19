import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
const dotenvConfigResult = dotenv.config();
import EnvVarError from "../lib/errors/EnvVarError";
import { LoginAPI } from "./endpoints/login/LoginAPI";
import ImageAPI from "./endpoints/image/ImageAPI";
import AlbumAPI from "./endpoints/album/AlbumAPI";
if (dotenvConfigResult.error) throw dotenvConfigResult.error;

console.clear();

const MONGO_URI = process.env.DB_URI;

if (MONGO_URI) {
	mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
		console.log("Database connected.");
	});
} else throw new EnvVarError("DB_URI");

const PORT: string = process.env.PORT ?? "3000";
const app = express();

app.use(
	cors({
		exposedHeaders: ["x-token", "Content-Type"]
	})
);
app.use("/login", new LoginAPI().router);
app.use("/image", new ImageAPI().router);
app.use("/album", new AlbumAPI().router);

app.listen(PORT, () => {
	console.log(`Listening at ${PORT} port.`);
});
