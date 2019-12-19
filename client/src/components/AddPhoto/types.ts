import { ReactNode, SyntheticEvent, FormEvent } from 'react';

export interface ViewProps {
  handleFileInput: () => void;
  handleDescInput: (e: FormEvent<HTMLInputElement>) => void;
  submitForm: (e: SyntheticEvent<HTMLButtonElement>) => Promise<void>;
  photos: Array<HTMLImageElement>;
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
}

export interface PhotoPropsI {
  index: number;
  photo: HTMLImageElement;
  handleDescInput: (e: FormEvent<HTMLInputElement>) => void;
}

export interface handleDescInputState {
  desc: Array<string>;
}

export interface AddPhotoState {
  images: Array<HTMLImageElement>;
  desc: Array<string>;
}
