import { FormEvent, SyntheticEvent, ReactNode } from 'react';

export interface AlbumType {
  name: string;
  description: string;
  beginningDate: number | string | Date;
  endDate: number | string;
  _id?: string;
  authorId?: Array<string>;
  children?: ReactNode;
}

export interface AlbumTypeAndSetAlbum extends AlbumType {
  name: string;
  description: string;
  beginningDate: number | string | Date;
  endDate: number | string;
  _id?: string;
  authorId?: Array<string>;
  setAlbum: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export interface AlbumViewProps {
  albumsArr: Array<AlbumType>;
  toggleShowModal: () => void;
  showModalAddAlbum: boolean;
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
  addAlbum: () => void;
  setAlbum: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export interface AddAlbumModalProps {
  show?: boolean;
  toggle?: () => void;
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
  addAlbum: () => void;
}

export interface AlbumsState {
  showModalAddAlbum: boolean;
  name: string;
  description: string;
  beginningDate: string;
  endDate: string;
  albums: Array<AlbumType>;
}
