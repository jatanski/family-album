import { Request, Response } from "express";
import { UserModel, UserDocument } from "../../models/User";
import bcrypt from "bcryptjs";

import jwt from "../../../lib/token/jwt";
import EmptyQueryError from "../../../lib/errors/EmptyQueryError";
import InvalidArgumentError from "../../../lib/errors/InvalidArgumentError";
import AuthError from "../../../lib/errors/AuthError";
import LoginErrorHandler from "./LoginErrorHandler";

interface LoginInput {
	email: string;
	password: string;
}

export default class LoginHandler {
	private res: Response;
	private body: LoginInput;
	private userFromDB: UserDocument = {} as UserDocument;

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

	static callback = async (req: Request, res: Response) => {
		const handler = new LoginHandler(req, res);
		await handler.handle();
	};

	private async handle() {
		try {
			await this.tryLoggingIn();
		} catch (error) {
			LoginErrorHandler.handleErrorAndSendFailure(error, this.res);
		}
	}

	private async tryLoggingIn(): Promise<void> {
		await this.findUser();
		if (await this.arePasswordMatching()) this.sendSuccess();
		else throw new AuthError();
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
			.header("x-auth-token", this.getToken())
			.status(200)
			.send({});
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
