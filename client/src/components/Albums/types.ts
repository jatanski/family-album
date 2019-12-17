import { FormEvent } from 'react';

export interface AlbumProps {
  title: string;
  desc: string;
  timeStart: string;
  timeEnd: string;
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
