import { Response } from "express";
import TokenError from "../../../lib/errors/TokenError";

export default class AuthErrorHandler {
	private static error: any;
	private static res = {} as Response;
	private static expectedErrorTypes = [TokenError];

	static handleErrorAndSendFailure(error: any, res: Response) {
		this.error = error;
		this.res = res;
		if (this.isErrorExpected()) this.handleExpectedError();
		else this.handleUnexpectedError();
	}

	private static isErrorExpected(): boolean {
		return this.expectedErrorTypes.some(ErrorType => this.error instanceof ErrorType);
	}

	private static handleExpectedError() {
		this.res.status(400).send("Invalid or missing token.");
	}

	private static handleUnexpectedError() {
		console.error(this.error);
		this.res.status(500).send("Unexpected error. Try again later.");
	}
}
