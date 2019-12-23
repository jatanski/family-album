import React, { FC } from 'react';
import { MDBCarouselItem, MDBView, MDBCarouselCaption } from 'mdbreact';
import { CarouselImageProps } from '../Carousel.types';

const CarouselImage: FC<CarouselImageProps> = ({ image, itemId, description, creationDate }) => {
	const src: string = `http://localhost:3069/image/${image}/full`;
	return (
		<MDBCarouselItem itemId={itemId}>
			<MDBView>
				<img className="d-block w-100" src={src} alt="First slide" />
			</MDBView>
			<MDBCarouselCaption>
				<p>{description}</p>
				<p>Data zrobienia: {new Date(creationDate).toDateString()}</p>
			</MDBCarouselCaption>
		</MDBCarouselItem>
	);
};

export default CarouselImage;
