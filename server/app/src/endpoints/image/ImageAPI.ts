import { Router, Response, Request } from "express";
import fileUpload from "express-fileupload";
import { ImageModel } from "../../models/Image";
import { ImageDataModel } from "../../models/ImageData";
import Auth from "../../middlewares/Auth/Auth";
import PostImageHandler from "./PostImage/Handler";
import AuthenticationError from "../../../lib/errors/AuthenticationError";
import EmptyQueryError from "../../../lib/errors/EmptyQueryError";

export default class ImageAPI {
	readonly router: Router = Router();

	constructor() {
		this.router.post("/", fileUpload(), Auth.middleware, PostImageHandler.callback);
		this.router.get("/:id/full", this.getFullImageCallback);
		this.router.get("/:id/miniature", this.getMiniatureCallback);
		this.router.get("/:id", this.getImageCallback);
		this.router.get("/user/:userId", this.getUserImagesCallback);
		this.router.delete("/:id", Auth.middleware, this.deleteImageCallback);
	}

	private getFullImageCallback = async (req: Request, res: Response) => {
		const { id } = req.params;
		const image = await ImageModel.findById(id);
		if (image) {
			res
				.status(200)
				.contentType(image.contentType)
				.end(image.data, "binary");
		} else {
			res.status(404).send("There is no image with provided id.");
		}
	};

	private getMiniatureCallback = async (req: Request, res: Response) => {
		const { id } = req.params;
		const imageData = await ImageDataModel.findOne()
			.where("imageId")
			.equals(id)
			.select("miniature");
		if (imageData) {
			res
				.status(200)
				.contentType(imageData.miniature.contentType)
				.end(imageData.miniature.data, "binary");
		} else {
			res.status(404).send("There is no image with provided id.");
		}
	};

	private getImageCallback = async (req: Request, res: Response) => {
		const { id } = req.params;
		const imageData = await ImageDataModel.findOne()
			.where("imageId")
			.equals(id)
			.select("-miniature");
		if (imageData) {
			const { description, imageId } = imageData;
			res.status(200).send({
				description,
				imageId
			});
		} else {
			res.status(404).send("There is no image with provided id.");
		}
	};

	private getUserImagesCallback = async (req: Request, res: Response) => {
		const { userId } = req.params;
		const images = await ImageDataModel.find()
			.where("ownerId")
			.equals(userId)
			.select("imageId");
		res.status(200).send(images.map(image => image.imageId));
	};

	private deleteImageCallback = async (req: Request, res: Response) => {
		const { id } = req.params;
		const { userId } = req.body;
		try {
			const image = await ImageModel.findById(id);
			const imageData = await ImageDataModel.findOne()
				.where("imageId")
				.equals(id);
			if (imageData) {
				if (imageData.ownerId === userId) {
					await imageData.remove();
					await image?.remove();
					res.status(204).send();
				} else
					throw new AuthenticationError("User's are not allowed to delete someone's elses images.");
			} else throw new EmptyQueryError("Image", "id");
		} catch (error) {
			if (error instanceof AuthenticationError) res.status(403).send(error.message);
			else if (error instanceof EmptyQueryError) res.status(404).send(error.message);
			else {
				console.error(error);
				res.status(500).send("Something unexpected happened. Please try later.");
			}
		}
	};
}
