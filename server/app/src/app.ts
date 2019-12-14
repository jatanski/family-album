import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const dotenvConfigResult = dotenv.config();
if (dotenvConfigResult.error) throw dotenvConfigResult.error;

console.clear();

const MONGO_URI = process.env.DB_URI;

if (MONGO_URI) {
	mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
		console.log("Database connected.");
	});
} else throw new Error("MONGO_URI environmental variable is essential, but was not provided.");

const PORT: string = process.env.PORT ?? "3000";
const app = express();
app.listen(PORT, () => {
	console.log(`Listening at ${PORT} port.`);
});
