import { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
	email: string;
	password: string;
}

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

export const UserModel = model<UserDocument>("User", userSchema);
