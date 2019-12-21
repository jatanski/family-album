import React, { FC } from 'react';
import { MDBCarousel, MDBCarouselInner, MDBContainer } from 'mdbreact';
import CarouselImage from './Carousel.utils/Carousel.image';
import { CarouselViewProps } from './Carousel.types';

const CarouselView: FC<CarouselViewProps> = ({ imageIds, imageDescriptions }) => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={imageIds?.length}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          {imageIds
            ? imageIds.map((image, i) => (
                <CarouselImage description={imageDescriptions[i]} key={image} image={image} itemId={i}></CarouselImage>
              ))
            : null}
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default CarouselView;
