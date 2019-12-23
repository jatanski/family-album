export interface CarouselProps {
	selectedAlbum: string;
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
