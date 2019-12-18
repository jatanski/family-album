import LoginHandler from "./LoginHandler";
import { Router, json } from "express";

export class LoginAPI {
	public router = Router();

	constructor() {
		this.router.use(json());
		this.router.post("/", LoginHandler.callback);
	}
}
