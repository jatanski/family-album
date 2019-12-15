import readline from "readline";
import joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";

export abstract class Registrator {
	private static email: string = "";
	private static password: string = "";
	private static scheme = joi.object({
		email: joi
			.string()
			.email()
			.required(),
		password: joi
			.string()
			.min(3)
			.regex(/[a-z]/)
			.regex(/[A-Z]/)
			.regex(/[0-9]/)
			.required()
	});
	private static rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	static async main(email?: string, password?: string) {
		console.log("Welcome in register process.");

		if (this.isAnyInputDataMissing(email, password)) await this.askForData();
		else {
			this.email = email!;
			this.password = password!;
		}

		try {
			await this.tryRegistering();
		} catch (error) {
			console.error(error.message);
			throw error;
		}

		console.log(`You are registered now with email: ${this.email} and password: ${this.password}.`);

		this.rl.close();
	}

	private static isAnyInputDataMissing(email?: string, password?: string): boolean {
		return !email || !password;
	}

	private static async askForData() {
		this.email = await this.asyncQuestion("email: ");
		this.password = await this.asyncQuestion("password: ");
	}

	private static asyncQuestion(query: string) {
		return new Promise<string>(res => {
			this.rl.question(query, res);
		});
	}

	private static async tryRegistering(): Promise<void> {
		this.validateInput();
		const password = await bcrypt.hash(this.password, await bcrypt.genSalt());
		const user = new UserModel({ email: this.email, password });
		await user.save();
	}

	private static validateInput() {
		const { error } = this.scheme.validate({
			email: this.email,
			password: this.password
		});
		if (error) throw error;
	}
}
