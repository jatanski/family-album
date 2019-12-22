export interface CarouselProps {
	selectedAlbum: string;
}

export interface CarouselState {
	imageIds: Array<string> | undefined;
	imageDescriptions: Array<string>;
}

export interface CarouselViewProps {
	imageIds: Array<string> | undefined;
	imageDescriptions: Array<string>;
}

export interface CarouselImageProps {
	image: string;
	itemId: number;
	description: string;
}
