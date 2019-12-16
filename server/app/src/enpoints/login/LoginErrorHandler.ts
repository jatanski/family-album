import { Response } from "express";
import EmptyQueryError from "../../../lib/errors/EmptyQueryError";
import InvalidArgumentError from "../../../lib/errors/InvalidArgumentError";
import LoginError from "../../../lib/errors/LoginError";

export default class LoginErrorHandler {
	private error: any;
	private res: Response;
	private expectedErrors = [EmptyQueryError, InvalidArgumentError, LoginError];

	private constructor(error: any, res: Response) {
		this.error = error;
		this.res = res;
	}

	static handleErrorAndSendFailure(error: any, res: Response) {
		new LoginErrorHandler(error, res).handleError();
	}

	private handleError(): void {
		console.error(this.error);
		if (this.isErrorExpected()) this.res.status(400).send("Wrong email or password.");
		else this.res.status(500).send("Unexpected error. Try again later.");
	}

	private isErrorExpected(): boolean {
		return this.expectedErrors.some(errorType => this.error instanceof errorType);
	}
}
