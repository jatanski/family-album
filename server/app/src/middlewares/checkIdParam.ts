import { NextFunction, Response, Request } from "express";

export default function checkParamId(paramName: string) {
	return function(req: Request, res: Response, next: NextFunction) {
		const id = req.params[paramName];
		if (/^[0-9a-fA-F]{24}$/.test(id)) next();
		else res.status(404).send("Invalid id provided.");
	};
}
