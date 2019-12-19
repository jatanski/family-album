import { CustomError } from "ts-custom-error";

export default class UnexpectedPropertiesError extends CustomError {
	constructor(unexpectedProperties: string) {
		super(`Unexpected properties: ${unexpectedProperties}`);
	}
}
