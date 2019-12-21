import InvalidArgumentError from "../../../../lib/errors/InvalidArgumentError";
import PostAlbumValidator from "../PostAlbum/Validator";

export default abstract class PatchAlbumValidator {
	static checkBody(body: any): void {
		const { name, description, beginningDate, endDate, authorsId, ...rest } = body;
		this.checkName(name);
		this.checkDescription(description);
		PostAlbumValidator["checkBeginningDate"](beginningDate);
		PostAlbumValidator["checkEndDate"](endDate);
		PostAlbumValidator["checkChronology"](beginningDate, endDate);
		this.checkAuthors(authorsId);
		PostAlbumValidator["checkRest"](rest);
	}

	private static checkName(name: any): void {
		if (!this.isStringOrUndefined(name))
			throw new InvalidArgumentError("name", "string?", typeof name);
	}

	private static checkDescription(description: any): void {
		if (!this.isStringOrUndefined(description))
			throw new InvalidArgumentError("description", "string?", typeof description);
	}

	private static isStringOrUndefined(variable: any): boolean {
		return typeof variable == "string" || variable === void 0;
	}

	private static checkAuthors(authorsId: any) {
		if (!this.isNonEmptyArrayOfString(authorsId) && authorsId !== void 0)
			throw new InvalidArgumentError("authorsId", "string[]?", typeof authorsId);
	}

	private static isNonEmptyArrayOfString(array: any): boolean {
		return array instanceof Array && array.length != 0 && array.every(id => typeof id == "string");
	}

	static checkAlbumId(id: string) {
		if (!/^[0-9a-fA-F]{24}$/.test(id))
			throw new InvalidArgumentError("albumId", "ObjectId", "not ObjectId string");
	}
}
