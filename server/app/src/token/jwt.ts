import jsonwebtoken from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret)
	throw new Error("JWT_SECRET environmental variable is essential, but was not provided.");

export abstract class jwt {
	private static secret = secret!;

	static sign(payload: string | object): string {
		return jsonwebtoken.sign(payload, this.secret);
	}

	static verify(token: string): string | object {
		try {
			return jsonwebtoken.verify(token, this.secret);
		} catch (error) {
			throw error;
		}
	}

	static decode(token: string): string | { [propName: string]: any } | null {
		return jsonwebtoken.decode(token);
	}
}
