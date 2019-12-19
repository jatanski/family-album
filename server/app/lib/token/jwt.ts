import jsonwebtoken from "jsonwebtoken";
import EnvVarError from "../errors/EnvVarError";

const secret = process.env.JWT_SECRET;
if (!secret) throw new EnvVarError("JWT_SECRET");

export type tokenType = string | { [propName: string]: any };;

export default abstract class jwt {
	private static secret = secret!;

	static sign(payload: string | object): string {
		return jsonwebtoken.sign(payload, this.secret);
	}

	static verify(token: string): tokenType {
		try {
			return jsonwebtoken.verify(token, this.secret);
		} catch (error) {
			throw error;
		}
	}

	static decode(token: string): tokenType | null {
		return jsonwebtoken.decode(token);
	}
}
