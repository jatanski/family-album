import { CustomError } from "ts-custom-error";

export default class EmptyQueryError extends CustomError {
	constructor(name: string, providedData: string) {
		super(`${name} with provided ${providedData} was not found`);
	}
}
