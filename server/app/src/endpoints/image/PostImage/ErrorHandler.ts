import InvalidArgumentError from "../../../../lib/errors/InvalidArgumentError";
import InvalidDataError from "../../../../lib/errors/InvalidDataError";
import { Response } from "express";

const expectedErrorTypes = [InvalidDataError, InvalidArgumentError];
export default class PostImageErrorHandler {
	static readonly expectedErrorTypes = expectedErrorTypes;

	static handleErrorAndSendFailure(error: any, res: Response) {
		if (this.isErrorExpected(error)) res.status(400).send(error.message);
		else {
			console.error(error);
			res.status(500).send("something went wrong");
		}
	}
	private static isErrorExpected(error: any): error is InstanceType<(typeof expectedErrorTypes[number])> {
		return this.expectedErrorTypes.some(ErrorType => error instanceof ErrorType);
	}
}

