import { FC } from "react";
import { MiniaturesImageProps } from "../Miniatures.types";
import { useHistory, useLocation } from "react-router-dom";

const Images: FC<MiniaturesImageProps> = ({ image }) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL ?? "";
	const src: string = `${serverUrl}/image/${image}/miniature`;

	const history = useHistory();
	const location = useLocation();

	function takeAlbumIdFromQuery(): string {
		return history.location.pathname.split("/").slice(2).join();
	}

	const changeUrl = () => {
		const linkToCarouselWithAlbumId = `carousel/${takeAlbumIdFromQuery()}`;
		location.pathname = "";
		history.replace(linkToCarouselWithAlbumId);
	};

	return (
		<div className="miniatures__wrap--el">
			<img onClick={changeUrl} src={src} className="img-fluid" alt="" />
		</div>
	);
};

export default Images;
