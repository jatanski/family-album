import { Schema, Document, model } from "mongoose";
import { ImageSchema, ImageDocument } from "./Image";

export interface ImageDataDocument extends Document {
	ownerId: string;
	imageId: string;
	description: string;
	miniature: ImageDocument;
	albumId: string;
	creationDate: Date;
}

const ImageDataSchema = new Schema({
	ownerId: {
		type: String,
		required: true
	},
	imageId: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		default: ""
	},
	miniature: {
		type: ImageSchema,
		required: true
	},
	albumId: {
		type: String,
		required: true
	},
	creationDate: {
		type: Date,
		required: false
	}
});

export const ImageDataModel = model<ImageDataDocument>("ImageData", ImageDataSchema);
