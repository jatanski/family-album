import { Schema, Document, model } from "mongoose";

export interface ImageDocument extends Document {
	data: Buffer;
	contentType: string;
}

export const ImageSchema = new Schema({
	data: {
		type: Buffer,
		required: true
	},
	contentType: {
		type: String,
		required: true
	}
});

export const ImageModel = model<ImageDocument>("Image", ImageSchema);
