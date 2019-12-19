import { Router, json, Request, Response } from "express";
import Auth from "../../middlewares/Auth/Auth";
import PostAlbumHandler from "./PostAlbum/Handler";
import { AlbumModel } from "../../models/Album";
import { ImageDataModel } from "../../models/ImageData";

export default class AlbumAPI {
	readonly router: Router = Router();

	constructor() {
		this.router.post("/", json(), Auth.middleware, PostAlbumHandler.callback);
		this.router.get("/:albumId", this.getAlbumCallback);
		this.router.get("/:albumId/cover", this.getAlbumCoverCallback);
		this.router.get("/:albumId/info", this.getAlbumInfoCallback);
		this.router.get("/:albumId/images", this.getAlbumImagesCallback);
	}

	private getAlbumCallback = async (req: Request, res: Response) => {
		const { albumId } = req.params;
		const album = await AlbumModel.findById(albumId);
		if (album) {
			const imageDocuments = await ImageDataModel.find()
				.where("albumId")
				.equals(albumId)
				.select("imageId");
			const images = imageDocuments.map(document => document.imageId);
			const { name, description, beginningDate, endDate, authorsId } = album;
			res.status(200).send({
				name,
				description,
				beginningDate: beginningDate?.getTime(),
				endDate: endDate?.getTime(),
				authorsId,
				images,
				albumId
			});
		} else {
			res.status(404).send("There is no album with provided id.");
		}
	};

	private getAlbumCoverCallback = async (req: Request, res: Response) => {
		const { albumId } = req.params;
		const cover = await ImageDataModel.findOne()
			.where("albumId")
			.equals(albumId)
			.select("miniature");
		if (cover) {
			res
				.status(200)
				.contentType(cover.miniature.contentType)
				.end(cover.miniature.data, "binary");
		} else {
			res.status(404).send("There is no album with provided id or this album is empty.");
		}
	};

	private getAlbumInfoCallback = async (req: Request, res: Response) => {
		const { albumId } = req.params;
		const album = await AlbumModel.findById(albumId);
		if (album) {
			const { name, description, beginningDate, endDate, authorsId } = album;
			res.status(200).send({
				name,
				description,
				beginningDate: beginningDate?.getTime(),
				endDate: endDate?.getTime(),
				authorsId,
				albumId
			});
		}
	};

	private getAlbumImagesCallback = async (req: Request, res: Response) => {
		const { albumId } = req.params;
		const album = await AlbumModel.findById(albumId);
		if (album) {
			const imageDocuments = await ImageDataModel.find()
				.where("albumId")
				.equals(albumId)
				.select("imageId");
			const images = imageDocuments.map(document => document.imageId);
			res.status(200).send(images);
		} else {
			res.status(404).send("There is no album with provided id.");
		}
	};
}
