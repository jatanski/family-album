import InvalidArgumentError from "../../../../lib/errors/InvalidArgumentError";
import UnexpectedPropertiesError from "../../../../lib/errors/UnexpectedArgumentError";
import { Response } from "express";

export abstract class PostAlbumErrorHandler {
	private static expectedErrorTypes = [InvalidArgumentError, UnexpectedPropertiesError];
	private static res: Response;
	private static error: any;

	static handleErrorAndSendFailure(error: any, res: Response) {
		this.error = error;
		this.res = res;
		if (this.isErrorExpected()) this.sendExpectedErrorFailure();
		else this.sendUnexpectedErrorFailure();
	}

	private static isErrorExpected() {
		return this.expectedErrorTypes.some(ErrorType => this.error instanceof ErrorType);
	}

	private static sendExpectedErrorFailure() {
		this.res.status(400).send(this.error?.message);
	}

	private static sendUnexpectedErrorFailure() {
		console.error(this.error);
		this.res.status(500).send("Unexpected error. Please try again later!");
	}
}
