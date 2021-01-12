import { FC } from "react";
import { MDBCarouselItem, MDBView, MDBCarouselCaption } from "mdbreact";
import { CarouselImageProps } from "../Carousel.types";
import BaseModel from "../../../utils/baseModel";

const CarouselImage: FC<CarouselImageProps> = ({ image, itemId, description, creationDate }) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL ?? "";
	const src: string = `${serverUrl}/image/${image}/full`;

	return (
		<MDBCarouselItem itemId={itemId}>
			<MDBView>
				<img className="d-block w-100" src={src} alt="First slide" />
			</MDBView>
			<MDBCarouselCaption style={{ position: "static", padding: "0px" }}>
				<div className="carousel__caption">
					<p className="carousel__caption--el">{description}</p>
					{creationDate && (
						<p className="carousel__caption--el">
							{" "}
							<span>Data zrobienia: {BaseModel.getDateString(+creationDate)}</span>
						</p>
					)}
				</div>
			</MDBCarouselCaption>
		</MDBCarouselItem>
	);
};

export default CarouselImage;
