import { CustomError } from "ts-custom-error";

export default class InvalidArgumentError extends CustomError {
	constructor(varName: string, expected: string, received: string) {
		super(`(${varName}) expected to be: (${expected}), but received (${received})`);
	}
}
