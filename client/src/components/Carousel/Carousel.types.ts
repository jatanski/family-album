import { History } from 'history';

export interface CarouselProps {
	selectedAlbum: string;
	history: History<any>;
}

export interface CarouselState {
	imageIds: Array<string> | undefined;
	imageDescriptions: Array<string>;
	imageCreationDates: Array<string>;
}

export interface CarouselViewProps {
	imageIds: CarouselState['imageIds'];
	imageDescriptions: Array<string>;
	imageCreationDates: Array<string>;
}

export interface CarouselImageProps {
	image: string;
	itemId: number;
	description: string;
	creationDate: string;
}

export interface FullImageObjectsType {
	description: string;
	creationDate: string;
	imageId: string;
}
