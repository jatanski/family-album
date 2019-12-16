import { Schema, Document, model } from "mongoose";
import { ImageSchema, ImageDocument } from "./Image";

export interface ImageDataDocument extends Document {
    ownerId: string;
	imageId: string;
	name: string;
	description: string;
	miniature: ImageDocument;
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
	name: {
		type: String,
		default: ""
	},
	description: {
		type: String,
		default: ""
	},
    miniature: {
        type: ImageSchema,
        required: true
    }
});

export const ImageDataModel = model<ImageDataDocument>("ImageData", ImageDataSchema);
