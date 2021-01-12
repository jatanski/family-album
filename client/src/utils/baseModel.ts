import { SyntheticEvent } from "react";
import { allActions } from "../redux/store";
import jwt from "jsonwebtoken";

class BaseModel {
	static baseApiUrl = `${process.env.REACT_APP_SERVER_URL ?? ""}/`;

	static saveAuthToken(token: string): void {
		localStorage.setItem("token", token);
	}

	static getDateString(time: number) {
		const date = new Date(time);
		const day = date.getDate();
		const days = String(day).length === 2 ? `${day}` : `0${day}`;
		const month = date.getMonth() + 1;
		const months = String(month).length === 2 ? `${month}` : `0${month}`;
		const years = String(date.getFullYear());
		return `${years}-${months}-${days}`;
	}

	static giveUserIdFromToken(): string | undefined {
		const token = BaseModel.getAuthToken();
		const tokenAfterDecode = jwt.decode(token!);

		if (typeof tokenAfterDecode === "string") {
			return undefined;
		} else {
			return tokenAfterDecode!.id;
		}
	}

	static getAuthToken(): string | null {
		return localStorage.getItem("token");
	}

	static onLogout(): void {
		localStorage.removeItem("token");
	}

	static async downloadAnythingWithBody(endpoint: string): Promise<any> {
		const token: string | null = BaseModel.getAuthToken();

		if (token) {
			try {
				const response = await fetch(BaseModel.baseApiUrl + endpoint, {
					method: "GET",
					headers: { "x-token": token },
				});

				const responseData = await response.json();

				return responseData;
			} catch (error) {
				console.error(error);
			}
		}
	}

	static setSelectedAlbum(e: SyntheticEvent<HTMLButtonElement>): void {
		allActions.setAlbum(e.currentTarget.id);
	}

	static async asyncForEach<T>(
		array: Array<T>,
		callbackfn: (value: T, index: number, array: T[]) => Promise<void>,
		thisArg?: any,
	): Promise<void> {
		let index = 0;
		for (const item of thisArg ?? array) {
			await callbackfn(item, index, array);
			index++;
		}
	}
}

export default BaseModel;
