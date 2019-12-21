import { Response } from "express";
import EmptyQueryError from "../../../../lib/errors/EmptyQueryError";
import InvalidArgumentError from "../../../../lib/errors/InvalidArgumentError";

export default abstract class PatchAlbumErrorHandler {
	private static error: any;
	private static res: Response;
	private static readonly expectedErrorTypes = [InvalidArgumentError, EmptyQueryError];

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
		if (this.error instanceof EmptyQueryError) this.handleEmptyQueryError();
		else this.handleInvalidArgumentError();
	}

	private static handleEmptyQueryError() {
		this.res.status(404).send(this.error?.message);
	}

	private static handleInvalidArgumentError() {
		this.res.status(400).send(this.error?.message);
	}

	private static handleUnexpectedError() {
		console.error(this.error);
		this.res.status(500).send("Unexpected error. Please try again later.");
	}
}
