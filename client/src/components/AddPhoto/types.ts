import { FormEvent, ReactNode } from 'react';

export type ViewProps = {
  handleFileInput: (e: FormEvent<HTMLInputElement>) => void;
};

export type AlbumFormProps = {
  children: ReactNode;
};
