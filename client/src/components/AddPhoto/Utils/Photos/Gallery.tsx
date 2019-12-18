import React from 'react';
import PhotoToAdd from './PhotoToAdd';

const Gallery = ({ photos }: any) => {
  return photos.map((photo: any, i: number) => {
    return <PhotoToAdd photo={photo} key={i}></PhotoToAdd>;
  });
};

export default Gallery;
