import { Request, NextFunction, Response } from "express";
import jwt, { tokenType } from "../../../lib/token/jwt";
import TokenError from "../../../lib/errors/TokenError";
import AuthErrorHandler from "./AuthErrorHandler";

interface AuthToken {
	id: string;
}

abstract class Auth {
	private static token = {} as AuthToken;
	private static req = {} as Request;
	private static next = {} as NextFunction;
	static middleware(req: Request, res: Response, next: NextFunction) {
		this.setReqResNext(req, next);
		try {
			this.tryAuth();
		} catch (error) {
			AuthErrorHandler.handleErrorAndSendFailure(error, res);
		}
	}

	private static setReqResNext(req: Request, next: NextFunction) {
		this.req = req;
		this.next = next;
	}

	private static tryAuth() {
		this.validateToken();
		this.processToken();
		this.next();
	}

	private static validateToken() {
		const token = this.req.headers["x-token"];
		this.setToken(token);
	}

	private static setToken(tokenHeader: any) {
		try {
			const token = jwt.verify(tokenHeader);
			if (this.checkTokenType(token)) this.token = token;
		} catch (error) {
			this.throwTokenError();
		}
	}

	private static checkTokenType(token: tokenType): token is AuthToken {
		if (this.isTokensTypeCorrect(token)) return true;
		this.throwTokenError();
	}

	private static isTokensTypeCorrect(token: tokenType): boolean {
		return typeof token != "string" && typeof token?.id == "string";
	}

	private static throwTokenError(): never {
		throw new TokenError();
	}

	private static processToken() {
		if (!this.req.body) this.req.body = {};
		this.req.body.userId = this.token.id;
	}
}

Auth.middleware = Auth.middleware.bind(Auth);

export default Auth;
