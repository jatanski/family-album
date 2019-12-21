import React, { FC } from 'react';
import Miniatures from '../Miniatures';

interface MiniaturesImageProps {
  image: string;
}

const Images: FC<MiniaturesImageProps> = ({ image }) => {
  return <p>Miniatures</p>;
};

export default Images;
