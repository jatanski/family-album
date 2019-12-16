import { Schema, Document, model } from "mongoose";

interface ImageDocument extends Document {
	data: Buffer;
	contentType: string;
}

const imageSchema = new Schema({
	data: {
		type: Buffer,
		required: true
	},
	contentType: {
		type: String,
		required: true
	}
});

export const ImageModel = model<ImageDocument>("Image", imageSchema);
