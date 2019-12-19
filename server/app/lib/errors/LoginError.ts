import { CustomError } from "ts-custom-error";

export default class LoginError extends CustomError {
	constructor() {
		super("Wrong password provided.");
	}
}
