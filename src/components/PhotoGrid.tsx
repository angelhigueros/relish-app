import React from 'react';
import type { Photo } from '../types';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  isLoading?: boolean;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="has-text-centered p-6">
        <div className="is-size-4 has-text-grey">
          <span className="icon is-large">
            <i className="fas fa-spinner fa-pulse"></i>
          </span>
          <p>Loading photos...</p>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="has-text-centered p-6">
        <div className="is-size-4 has-text-grey">
          <p>No photos found</p>
          <p className="is-size-6 mt-2">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="columns is-multiline is-mobile">
      {photos.map((photo) => (
        <div key={photo.id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
          <PhotoCard photo={photo} onClick={onPhotoClick} />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;