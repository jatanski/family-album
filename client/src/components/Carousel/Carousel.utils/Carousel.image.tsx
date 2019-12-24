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
			<MDBCarouselCaption style={{ position: 'static', padding: '0px' }}>
				<div className="carousel__caption">
					<p className="carousel__caption--el">{description}</p>
					{creationDate && (
						<p className="carousel__caption--el">
							{' '}
							<span>Data zrobienia: {new Date(creationDate).toDateString()}</span>
						</p>
					)}
				</div>
			</MDBCarouselCaption>
		</MDBCarouselItem>
	);
};

export default CarouselImage;
