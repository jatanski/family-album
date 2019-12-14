import { CustomError } from "ts-custom-error";

export default class EnvVarError extends CustomError {
	constructor(varName: string) {
		super(`${varName} environmental variable is essential, but was not provided.`);
	}
}
