import { CustomError } from "ts-custom-error";

export default class AuthError extends CustomError {
	constructor() {
		super("Wrong password provided.");
	}
}
