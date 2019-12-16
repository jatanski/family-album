import { Router, Response, Request } from "express";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import { ImageModel } from "../../models/Image";
import jimp from "jimp";
import { ImageDataModel, ImageDataDocument } from "../../models/ImageData";
import Auth from "../../middlewares/Auth/Auth";
import InvalidArgumentError from "../../../lib/errors/InvalidArgumentError";

interface PostImageInput {
	userId: ImageDataDocument["ownerId"];
	name?: ImageDataDocument["name"];
	description?: ImageDataDocument["description"];
}

export default class ImageAPI {
	readonly router: Router = Router();

	constructor() {
		this.router.post("/", fileUpload(), Auth.middleware, this.PostImageHandler.callback);
		this.router.get("/:id/full", this.getFullImageCallback);
		this.router.get("/:id", this.getImageCallback);
	}

	private PostImageHandler = class PostImageHandler {
		private body: PostImageInput;
		private files: FileArray;
		private res: Response;

		static async callback(req: Request, res: Response) {
			try {
				await new PostImageHandler(req, res).handle();
			} catch (error) {
				res.status(500).send("something went wrong");
			}
		}

		private constructor(req: Request, res: Response) {
			this.checkBody(req.body);
			this.body = req.body;
			this.checkFiles(req.files);
			this.files = req.files!;
			this.res = res;
		}

		private checkBody(body: any): void {
			this.checkUserId(body.userId);
			this.checkDescription(body.description);
			this.checkName(body.name);
		}

		private checkUserId(userId: any): void {
			if (typeof userId != "string")
				throw new InvalidArgumentError("userId", "string", typeof userId);
		}

		private checkName(name: any): void {
			if (this.isStringOrUndefined(name))
				throw new InvalidArgumentError("name", "string?", typeof name);
		}

		private checkDescription(description: any) {
			if (this.isStringOrUndefined(description))
				throw new InvalidArgumentError("description", "string?", typeof description);
		}

		private isStringOrUndefined(value: any): boolean {
			return typeof value != "string" && typeof value != "undefined";
		}

		private checkFiles(files: any): void {
			if (!files) throw new InvalidArgumentError("files", "defined", "undefined");
		}

		private async handle() {
			for (let i in this.files) {
				const oneFileOrMore = this.files[i];
				if (oneFileOrMore instanceof Array) {
					for (let file of oneFileOrMore) {
						await this.saveImage(file);
					}
				} else {
					this.saveImage(oneFileOrMore);
				}
			}
			this.res.status(204).send();
		}

		private async saveImage(file: UploadedFile) {
			const image = new ImageModel({
				data: file.data,
				contentType: file.mimetype
			});
			let small = await jimp.read(file.data);
			small = small.scale(256 / small.bitmap.width).quality(60);
			const { userId, name, description } = this.body;
			const imageDate = new ImageDataModel({
				ownerId: userId,
				imageId: image.id.toString(),
				miniature: {
					data: await small.getBufferAsync(jimp.MIME_JPEG),
					contentType: "image/jpeg"
				},
				name,
				description
			});
			await image.save();
			await imageDate.save();
		}
	};

	private postImageCallback = async (req: Request, res: Response) => {
		const { userId } = req.body;
		const { files } = req;
		if (files && typeof userId == "string") {
			for (let i in files) {
				const file = files[i];
				if (!(file instanceof Array)) {
					const image = new ImageModel({
						data: file.data,
						contentType: file.mimetype
					});
					await image.save();
					const liveImage = await jimp.read(file.data);
					const small = liveImage.scale(256 / liveImage.bitmap.width).quality(60);
					const imageDate = new ImageDataModel({
						userId,
						imageId: image.id.toString(),
						miniature: {
							data: await small.getBufferAsync(jimp.MIME_JPEG),
							contentType: "image/jpeg"
						}
					});
					await imageDate.save();
					res.status(200).send();
				}
			}
		} else {
			res.status(400).send("wrong input data");
		}
	};

	private getFullImageCallback = async (req: Request, res: Response) => {
		const { id } = req.params;
		const image = await ImageModel.findById(id);
		if (image) {
			res
				.status(200)
				.contentType(image.contentType)
				.end(image.data, "binary");
		}
	};

	private getImageCallback = async (req: Request, res: Response) => {
		const { id } = req.params;
		const imageData = await ImageDataModel.findOne()
			.where("imageId")
			.equals(id);
		if (imageData) {
			const { name, description, miniature } = imageData;
			const { data, contentType } = miniature;
			res.status(200).send({
				name,
				description,
				miniature: {
					data,
					contentType
				}
			});
		} else {
			res.status(500).send();
		}
	};
}
