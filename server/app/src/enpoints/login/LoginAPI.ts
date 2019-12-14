import { Router, Request, Response } from "express";
import { UserModel } from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginAPI {
	public router = Router();

	constructor() {
		this.router.post("", async (req: Request, res: Response) => {
			const { email, password } = req.body;
			try {
				if (typeof email == "string" && typeof password == "string") {
					const user = await UserModel.findOne()
						.where("email")
						.equals(email);
					if (user) {
						const areMatching = await bcrypt.compare(email, user.email);
						if (areMatching) {
							res.status(200).send(
								jwt.sign(
									{
										id: user.id
									},
									process.env.JWT_SECRET!
								)
							);
						} else {
							res.status(400).send("Wrong email or password.");
						}
					} else {
						res.status(400).send("Wrong email or password.");
					}
				} else {
					res.status(400).send("Wrong email or password.");
				}
			} catch (error) {
				console.error(error);
				res.status(500).send("Unexpected error. Try again later.");
			}
		});
	}
}
