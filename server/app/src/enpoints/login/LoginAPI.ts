import LoginHandler from "./LoginHandler";
import { Router } from "express";

export class LoginAPI {
	public router = Router();

	constructor() {
		this.router.post("/", LoginHandler.callback);
	}
}
