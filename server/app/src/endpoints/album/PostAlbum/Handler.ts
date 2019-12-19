import { AlbumDocument, AlbumModel } from "../../../models/Album";
import { Request, Response } from "express";
import PostAlbumValidator from "./Validator";
import { PostAlbumErrorHandler } from "./ErrorHandler";

interface PostAlbumInput {
	name: AlbumDocument["name"];
	description?: AlbumDocument["description"];
	beginningDate?: number;
	endDate?: number;
	userId: string;
}

export default class PostAlbumHandler {
	private body: PostAlbumInput;
	private res: Response;

	static callback = async (req: Request, res: Response) => {
		try {
			await new PostAlbumHandler(req, res).handle();
		} catch (error) {
			PostAlbumErrorHandler.handleErrorAndSendFailure(error, res);
		}
	};

	private constructor(req: Request, res: Response) {
		PostAlbumValidator.checkBody(req.body);
		this.body = req.body;
		this.res = res;
	}

	private async handle() {
		const { userId: authorId, ...restBody } = this.body;
		const album = new AlbumModel({
			authorsId: [authorId],
			...restBody
		});
		await album.save();
		this.res.status(200).send({
			_id: album._id.toString(),
			authorsId: [authorId],
			...restBody
		});
	}
}
