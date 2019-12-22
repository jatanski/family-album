import { ReactNode, SyntheticEvent, FormEvent, ChangeEvent } from 'react';
import { AlbumType } from '../Albums/Album.types';

export interface ViewProps {
	handleFileInput: () => void;
	handleDescInput: (e: FormEvent<HTMLInputElement>) => void;
	handleDateInput: (e: FormEvent<HTMLInputElement>) => void;
	handleSelectAlbumInput: (e: ChangeEvent<HTMLSelectElement>) => void;
	submitForm: (e: SyntheticEvent<HTMLButtonElement>) => Promise<void>;
	deletePhoto: (e: SyntheticEvent<HTMLButtonElement>) => void;
	photos: Array<HTMLImageElement>;
	albums: Array<AlbumType>;
	selectedAlbum: string;
}

export interface FormProps {
	handleFileInput: () => void;
}

export interface AlbumFormProps {
	children: ReactNode;
	submitForm: (e: SyntheticEvent<HTMLButtonElement>) => Promise<void>;
}

export interface GalleryPropsI {
	photos: any;
	handleDescInput: (e: FormEvent<HTMLInputElement>) => void;
	handleDateInput: (e: FormEvent<HTMLInputElement>) => void;
	deletePhoto: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export interface PhotoPropsI {
	index: number;
	photo: HTMLImageElement;
	handleDescInput: (e: FormEvent<HTMLInputElement>) => void;
	handleDateInput: (e: FormEvent<HTMLInputElement>) => void;
	deletePhoto: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export interface handleDescInputState {
	desc: Array<string>;
}

export interface handleDateInputState {
	createdDates: Array<string>;
}

export interface AddPhotoState {
	images: Array<HTMLImageElement>;
	desc: Array<string>;
	createdDates: Array<string>;
	albums: Array<AlbumType>;
	selectedAlbum: string;
	sendedImages: number;
}

export type AddPhotoAlbum = {
	name: string;
	id: string;
};

export type SelectAlbumInputProps = {
	albums: Array<AlbumType>;
	handleSelectAlbumInput: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectedAlbum: string;
};
