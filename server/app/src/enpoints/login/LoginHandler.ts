import { Request, Response } from "express";
import { UserModel, UserDocument } from "../../models/User";
import bcrypt from "bcryptjs";

import jwt from "../../../lib/token/jwt";
import EmptyQueryError from "../../../lib/errors/EmptyQueryError";
import InvalidArgumentError from "../../../lib/errors/InvalidArgumentError";
import LoginError from "../../../lib/errors/LoginError";
import LoginErrorHandler from "./LoginErrorHandler";

interface LoginInput {
	email: string;
	password: string;
}

export default class LoginHandler {
	private res: Response;
	private body: LoginInput;
	private userFromDB: UserDocument = {} as UserDocument;

	static callback = async (req: Request, res: Response) => {
		try {
			await new LoginHandler(req, res).handle();
		} catch (error) {
			LoginErrorHandler.handleErrorAndSendFailure(error, res);
		}

	};

	private constructor(req: Request, res: Response) {
		this.res = res;
		this.checkLoginBodyType(req.body);
		this.body = req.body;
	}

	private checkLoginBodyType(body: any): void {
		const { email, password } = body;
		if (typeof email != "string") this.throwNotAStringError("email", email);
		if (typeof password != "string") this.throwNotAStringError("password", password);
	}

	private throwNotAStringError(varName: string, variable: any): never {
		throw new InvalidArgumentError(varName, "string", typeof variable);
	}

	private async handle() {
		await this.findUser();
		if (await this.arePasswordMatching()) this.sendSuccess();
		else throw new LoginError();
	}

	private async findUser(): Promise<void> {
		const user = await this.queryUser();
		if (user) this.userFromDB = user;
		else this.throwNoUserFoundError();
	}

	private async queryUser(): Promise<UserDocument | null> {
		return await UserModel.findOne()
			.where("email")
			.equals(this.body.email);
	}

	private async arePasswordMatching(): Promise<boolean> {
		return await bcrypt.compare(this.body.password, this.userFromDB.password);
	}

	private sendSuccess(): void {
		this.res
			.status(200)
			.header("x-token", this.getToken())
			.send();
	}

	private getToken(): string {
		return jwt.sign({
			id: this.userFromDB.id
		});
	}

	private throwNoUserFoundError(): never {
		throw new EmptyQueryError("user", "email");
	}
}
