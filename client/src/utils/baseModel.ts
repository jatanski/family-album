import { SyntheticEvent } from 'react';
import { allActions } from '../redux/store';

class BaseModel {
	static baseApiUrl = 'http://localhost:3069/';

	static saveAuthToken(token: string): void {
		localStorage.setItem('token', token);
	}

	static getAuthToken(): string | null {
		return localStorage.getItem('token');
	}

	static onLogout(): void {
		localStorage.removeItem('token');
	}

	static async downloadAnythingWithBody(endpoint: string): Promise<any> {
		const token: string | null = BaseModel.getAuthToken();

		if (token) {
			try {
				const response = await fetch(BaseModel.baseApiUrl + endpoint, {
					method: 'GET',
					headers: { 'x-token': token },
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
