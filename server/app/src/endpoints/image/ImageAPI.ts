import { Router, Response, Request } from "express";
import fileUpload from "express-fileupload";
import { ImageModel } from "../../models/Image";
import { ImageDataModel } from "../../models/ImageData";
import Auth from "../../middlewares/Auth/Auth";
import PostImageHandler from "./PostImage/Handler";

export default class ImageAPI {
	readonly router: Router = Router();

	constructor() {
		this.router.post("/", fileUpload(), Auth.middleware, PostImageHandler.callback);
		this.router.get("/:id/full", this.getFullImageCallback);
		this.router.get("/:id", this.getImageCallback);
	}

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
