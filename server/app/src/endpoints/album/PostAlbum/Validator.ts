import InvalidArgumentError from "../../../../lib/errors/InvalidArgumentError";
import UnexpectedPropertiesError from "../../../../lib/errors/UnexpectedArgumentError";

export default abstract class PostAlbumValidator {
	static checkBody(body: any): void {
		const { name, description, beginningDate, endDate, userId, ...rest } = body;
		this.checkName(name);
		this.checkDescription(description);
		this.checkBeginningDate(beginningDate);
		this.checkEndDate(endDate);
		this.checkChronology(beginningDate, endDate);
		this.checkRest(rest);
	}

	private static checkName(name: any): void {
		if (typeof name != "string") throw new InvalidArgumentError("name", "string", typeof name);
	}

	private static checkDescription(description: any): void {
		if (typeof description != "string" && description !== void 0)
			throw new InvalidArgumentError("description", "string?", typeof description);
	}

	private static checkEndDate(endDate: any): void {
		if (!this.isTime(endDate) && endDate !== void 0)
			throw new InvalidArgumentError("endDate", "number? && time", typeof endDate);
	}

	private static checkBeginningDate(beginningDate: any): void {
		console.log(beginningDate);
		if (!this.isTime(beginningDate) && beginningDate !== void 0)
			throw new InvalidArgumentError("beginningDate", "number? && time", typeof beginningDate);
	}

	private static isTime(time: any): boolean {
		return typeof time == "number" && !Number.isNaN(new Date(time).getTime());
	}

	private static checkChronology(begin: number, end: number): void {
		if (begin === void 0 || end === void 0) return;
		if (begin >= end)
			throw new InvalidArgumentError(
				"beginningDate && endDate",
				"beginningDate < endDate",
				"beginningDate >= endDate"
			);
	}

	private static checkRest(rest: any): void {
		if (!this.isEmpty(rest)) throw new UnexpectedPropertiesError(JSON.stringify(Object.keys(rest)));
	}

	private static isEmpty(object: any): boolean {
		return Object.keys(object).length == 0;
	}
}
