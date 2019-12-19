import InvalidArgumentError from "../../../../lib/errors/InvalidArgumentError";
import { FileArray, UploadedFile } from "express-fileupload";

export default abstract class PostImageValidator {
	static checkBody(body: any): void {
		this.checkAlbumId(body.albumId);
		this.checkUserId(body.userId);
		this.checkDescription(body.description);
	}

	private static checkAlbumId(albumId: any): void {
		if (typeof albumId != "string") throw new InvalidArgumentError("albumId", "string", typeof albumId);
	}

	private static checkUserId(userId: any): void {
		if (typeof userId != "string")
			throw new InvalidArgumentError("userId", "string", typeof userId);
	}

	private static checkDescription(description: any) {
		if (this.isStringOrUndefined(description))
			throw new InvalidArgumentError("description", "string?", typeof description);
	}

	private static isStringOrUndefined(value: any): boolean {
		return typeof value != "string" && typeof value != "undefined";
	}
	static checkFiles(files: FileArray | undefined): void {
		if (!files) throw new InvalidArgumentError("files", "defined", "undefined");
		if (!this.isExactlyOneFile(files)) {
			throw new InvalidArgumentError(
				"files",
				"1 element length",
				`${Object.keys(files).length} elements length`
			);
		}
	}

	private static isExactlyOneFile(files: FileArray) {
		const keys = Object.keys(files);
		return !(keys.length == 0 || keys.length > 1);
	}

	static checkImage(image: UploadedFile | UploadedFile[]): void {
		if (image instanceof Array) throw new InvalidArgumentError("file", "file", `Array<file>`);
		if (!this.isImage(image)) throw new InvalidArgumentError("file", "image/*", image.mimetype);
	}

	private static isImage(file: UploadedFile) {
		const type = file.mimetype.split("/")[0];
		return type == "image";
	}
}
