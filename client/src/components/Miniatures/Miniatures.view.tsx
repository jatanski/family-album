import React, { FC } from 'react';
import { MiniaturesViewProps } from './Miniatures.types';
import MiniaturesImage from './utils/Miniatures.image';

const View: FC<MiniaturesViewProps> = ({ images }) => {
	return (
		<div className="miniatures__wrap">
			{images && images.map(image => <MiniaturesImage key={image} image={image} />)}
		</div>
	);
};

export default View;
