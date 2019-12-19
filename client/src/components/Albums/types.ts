import { FormEvent } from 'react';

export interface AlbumProps {
  name: string;
  description: string;
  beginningDate: Date | string;
  endDate: Date | string;
}

export interface ViewProps {
  albumsArr: Array<AlbumProps>;
  toggleShowModal: () => void;
  showModalAddAlbum: boolean;
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
  addAlbum: () => void;
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
  albums: Array<AlbumProps>;
}
