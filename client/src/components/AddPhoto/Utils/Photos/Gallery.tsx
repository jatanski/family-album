import React from 'react';
import PhotoToAdd from './PhotoToAdd';
import { GalleryPropsI } from '../../types';

const Gallery = ({ photos, handleDescInput }: GalleryPropsI) => {
  return photos.map((photo: HTMLImageElement, i: number) => {
    return <PhotoToAdd handleDescInput={handleDescInput} photo={photo} key={i} index={i}></PhotoToAdd>;
  });
};

export default Gallery;
