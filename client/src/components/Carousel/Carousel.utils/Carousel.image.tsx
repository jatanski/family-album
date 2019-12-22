import React, { FC } from 'react';
import { MDBCarouselItem, MDBView, MDBMask, MDBCarouselCaption } from 'mdbreact';
import { CarouselImageProps } from '../Carousel.types';

const CarouselImage: FC<CarouselImageProps> = ({ image, itemId, description }) => {
	const src: string = `http://localhost:3069/image/${image}/full`;
	return (
		<MDBCarouselItem itemId={itemId}>
			<MDBView>
				<img className="d-block w-100" src={src} alt="First slide" />
			</MDBView>
			<MDBCarouselCaption>
				{/* <h3 className="h3-responsive">Light mask</h3> */}
				<p>{description}</p>
			</MDBCarouselCaption>
		</MDBCarouselItem>
	);
};

export default CarouselImage;
