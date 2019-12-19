import { Schema, Document, model } from "mongoose";

export interface AlbumDocument extends Document {
	name: string;
	authorsId: string[];
	description: string;
	beginningDate?: Date;
	endDate?: Date;
}

export const AlbumSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ""
	},
	beginningDate: Date,
	endDate: Date,
	authorsId: {
		type: [String],
		required: true
	}
});

export const AlbumModel = model<AlbumDocument>("Album", AlbumSchema);
