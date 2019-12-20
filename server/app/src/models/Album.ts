import { Schema, Document, model } from "mongoose";

export interface AlbumDocument extends Document {
	name: string;
	authorsId: string[];
	description: string;
	beginningDate?: Date;
	endDate?: Date;
	toSerializableObject(): {
		name: string;
		authorsId: string[];
		description: string;
		beginningDate?: number;
		endDate?: number;
	};
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

AlbumSchema.methods.toSerializableObject = function toSerializableObject(this: AlbumDocument) {
	const { name, description, beginningDate, endDate, authorsId, _id } = this;
	return {
		name,
		description,
		beginningDate: beginningDate?.getTime(),
		endDate: endDate?.getTime(),
		authorsId,
		_id: _id?.toString()
	};
};

export const AlbumModel = model<AlbumDocument>("Album", AlbumSchema);
