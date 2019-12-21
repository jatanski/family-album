import { AlbumType } from '../Albums/Album.types';

export interface MiniaturesState {
  images: Array<string> | undefined;
}

export interface MiniaturesProps {
  selectedAlbum: string;
}

export interface MiniaturesViewProps {
  images: Array<string> | undefined;
}

export interface MiniaturesImageProps {
  image: string;
}
