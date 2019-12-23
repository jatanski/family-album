export interface CarouselProps {
	selectedAlbum: string;
}

export interface CarouselState {
	imageIds: Array<string> | undefined;
	imageDescriptions: Array<string>;
	imageCreatedDates: Array<string>;
}

export interface CarouselViewProps {
	imageIds: CarouselState['imageIds'];
	imageDescriptions: Array<string>;
	imageCreatedDates: Array<string>;
}

export interface CarouselImageProps {
	image: string;
	itemId: number;
	description: string;
	createdDate: string;
}
