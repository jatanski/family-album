import dotenv from "dotenv";
import mongoose from "mongoose";
import { Registrator } from "./Registrator";

dotenv.config();

function connect() {
	const DB_URI = process.env.DB_URI;
	if (DB_URI) {
		return new Promise<void>(res => {
			mongoose.connect(
				DB_URI,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true
				},
				() => {
					console.log("Connected to database.");
					res();
				}
			);
		});
	} else {
		throw new Error("DB_URI not provided");
	}
}

async function program() {
	await connect();
	try {
		await Registrator.main();
		process.exit(0);
	} catch (error) {
		process.exit(1);
	}
}

program();
