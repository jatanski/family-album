import React, { FC } from 'react';
import { MiniaturesViewProps } from './Miniatures.types';
import MiniaturesImage from './utils/Miniatures.image';

const View: FC<MiniaturesViewProps> = ({ images }) => {
	return <>{images && images.map(image => <MiniaturesImage key={image} image={image}></MiniaturesImage>)}</>;
};

export default View;
