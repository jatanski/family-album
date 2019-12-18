import { ReactNode, SyntheticEvent } from 'react';

export interface ViewProps {
  handleFileInput: () => void;
  submitForm: (e: SyntheticEvent<HTMLButtonElement>) => Promise<void>;
  photos: Array<HTMLInputElement>;
}

export interface FormProps {
  handleFileInput: () => void;
}

export interface AlbumFormProps {
  children: ReactNode;
  submitForm: (e: SyntheticEvent<HTMLButtonElement>) => Promise<void>;
}
