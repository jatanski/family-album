import { ImageDataDocument, ImageDataModel } from "../../../models/ImageData";
import { UploadedFile } from "express-fileupload";
import { Response, Request } from "express";
import { ImageModel } from "../../../models/Image";
import MiniatureCreator from "./MiniatureCreator";
import PostImageValidator from "./Validator";
import InvalidDataError from "../../../../lib/errors/InvalidDataError";
import PostImageErrorHandler from "./ErrorHandler";

interface PostImageInput {
	userId: ImageDataDocument["ownerId"];
	albumId: ImageDataDocument["albumId"];
	description?: ImageDataDocument["description"];
	creationDate?: number;
}

export default class PostImageHandler {
	private body: PostImageInput;
	private res: Response;
	private image: UploadedFile;
	private imageId: string = "";

	static async callback(req: Request, res: Response) {
		try {
			await new PostImageHandler(req, res).handle();
		} catch (error) {
			PostImageErrorHandler.handleErrorAndSendFailure(error, res);
		}
	}

	private constructor(req: Request, res: Response) {
		req.body.creationDate = Number(req.body.creationDate);
		PostImageValidator.checkBody(req.body);
		this.body = req.body;
		PostImageValidator.checkFiles(req.files);
		const image = Object.values(req.files!)[0];
		PostImageValidator.checkImage(image);
		this.image = image as UploadedFile;
		this.res = res;
	}

	private async handle() {
		await this.saveImage();
		this.sendSuccess();
	}

	private async saveImage() {
		const imageDocument = new ImageModel({
			data: this.image.data,
			contentType: this.image.mimetype
		});
		this.imageId = imageDocument.id;
		const { userId: ownerId, description, albumId, creationDate } = this.body;
		const miniature = await this.getMiniature();
		const imageDate = new ImageDataModel({
			imageId: imageDocument.id.toString(),
			miniature,
			ownerId,
			description,
			albumId,
			creationDate
		});
		await imageDocument.save();
		await imageDate.save();
	}

	private async getMiniature() {
		try {
			return await MiniatureCreator.create(this.image.data);
		} catch (error) {
			throw new InvalidDataError(error.message ?? "Invalid image.");
		}
	}

	private sendSuccess() {
		const { description, creationDate, albumId } = this.body;
		this.res.status(200).send({
			id: this.imageId,
			imageId: this.imageId,
			description,
			creationDate,
			albumId
		});
	}
}
