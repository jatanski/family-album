import { Router, Response, Request } from "express";
import fileUpload = require("express-fileupload");
import { ImageModel } from "../../models/Image";

export default class ImageAPI {
	readonly router: Router = Router();

	constructor() {
		fileUpload.FileArray;
		this.router.post("/", fileUpload(), async (req: Request, res: Response) => {
			if (req.files) {
				const { files } = req;
				for (let i in files) {
					const file = files[i];
					if (!(file instanceof Array)) {
						const image = new ImageModel({
							data: file.data,
							contentType: file.mimetype
						});
						await image.save();
					}
				}
			}
		});

		this.router.get("/:id", async (req: Request, res: Response) => {
			const { id } = req.params;
			const image = await ImageModel.findById(id);
			if (image) {
				res
					.status(200)
					.contentType(image.contentType)
					.end(image.data, "binary");
			}
		});
	}
}
