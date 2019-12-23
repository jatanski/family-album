import { History } from 'history';

export interface MiniaturesState {
	images: Array<string> | undefined;
}

export interface MiniaturesProps {
	selectedAlbum: string;
	history: History<any>;
}

export interface MiniaturesViewProps {
	images: Array<string> | undefined;
}

export interface MiniaturesImageProps {
	image: string;
}
