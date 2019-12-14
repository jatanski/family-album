import { Router, Request, Response } from "express";
import { UserModel } from "../../models/User";
import bcrypt from "bcryptjs";

import jwt from "../../../lib/token/jwt";
import EmptyQueryError from "../../../lib/errors/EmptyQueryError";
import InvalidArgumentError from "../../../lib/errors/InvalidArgumentError";

interface LoginInput {
	email: string;
	password: string;
}

export class LoginAPI {
	public router = Router();

	constructor() {
		this.router.post("", async (req: Request, res: Response) => {
			try {
				if (this.checkLoginBodyType(req.body)) {
					const { email, password } = req.body;
					const user = await UserModel.findOne()
						.where("email")
						.equals(email);
					if (user) {
						const areMatching = await bcrypt.compare(password, user.password);
						if (areMatching) {
							res.status(200).send(
								jwt.sign({
									id: user.id
								})
							);
						} else {
							res.status(400).send("Wrong email or password.");
						}
					} else {
						throw new EmptyQueryError("user", "email");
					}
				}
			} catch (error) {
				console.error(error);
				if (error instanceof EmptyQueryError || error instanceof InvalidArgumentError)
					res.status(400).send("Wrong email or password.");
				res.status(500).send("Unexpected error. Try again later.");
			}
		});
	}

	private checkLoginBodyType(body: any): body is LoginInput {
		const { email, password } = body;
		if (typeof email != "string") throw new InvalidArgumentError("email", "string", typeof email);
		if (typeof password != "string")
			throw new InvalidArgumentError("password", "string", typeof password);
		return true;
	}
}
