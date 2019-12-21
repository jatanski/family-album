import { AlbumDocument, AlbumModel } from "../../../models/Album";
import EmptyQueryError from "../../../../lib/errors/EmptyQueryError";
import { Response, Request } from "express";
import PatchAlbumValidator from "./Validator";
import PatchAlbumErrorHandler from "./ErrorHandler";

interface PatchAlbumInput {
	name?: AlbumDocument["name"];
	description?: AlbumDocument["description"];
    beginningDate?: number;
    endDate?: number;
	authorsId?: AlbumDocument["authorsId"];
}

export default class PatchAlbumHandler {
	private body: PatchAlbumInput;
	private albumId: string;
	private res: Response;
	private album = {} as AlbumDocument;

	static callback = async (req: Request, res: Response) => {
		try {
			await new PatchAlbumHandler(req, res).handle();
		} catch (error) {
            PatchAlbumErrorHandler.handleErrorAndSendFailure(error, res);
		}
	};

	private constructor(req: Request, res: Response) {
		PatchAlbumValidator.checkBody(req.body);
		this.body = req.body;
		PatchAlbumValidator.checkAlbumId(req.params.albumId);
		this.albumId = req.params.albumId;
		this.res = res;
	}

	private async handle() {
		await this.findAlbum();
		await this.setChanges();
		this.sendSuccess();
	}

	private async findAlbum(): Promise<void> {
		const album = await AlbumModel.findById(this.albumId);
		if (album) this.album = album;
		else this.throwNoAlbumFoundError();
	}

	private async setChanges() {
		this.album.set(this.body);
		await this.album.save();
	}

	private sendSuccess() {
		this.res.status(200).send(this.album.toSerializableObject());
	}

	private throwNoAlbumFoundError(): never {
		throw new EmptyQueryError("Album", "id");
	}
}
