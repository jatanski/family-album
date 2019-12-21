export interface CarouselProps {
  selectedAlbum: string;
}

export interface CarouselState {
  images: Array<string> | undefined;
}

export interface CarouselViewProps {
  images: Array<string> | undefined;
}

export interface CarouselImageProps {
  image: string;
  itemId: number;
}
