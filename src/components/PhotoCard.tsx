import React from 'react';
import type { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const fallbackImageUrl = "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D142441704W10000H6925/views/1,width=1200,height=630,appearanceId=839,backgroundColor=F2F2F2/image-not-found-sticker.jpg";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackImageUrl) {
      target.src = fallbackImageUrl;
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-square">
          <img 
            src={photo?.thumbnailUrl} 
            alt={photo?.title}
            style={{ objectFit: 'cover' }}
            loading="lazy"
            onError={handleImageError}
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <p className="title is-6 mb-2" title={photo.title}>
            {photo?.title?.length > 50 ? `${photo?.title.substring(0, 50)}...` : photo?.title}
          </p>
          <p className="subtitle is-7 mb-2 has-text-grey">
            Album: {photo?.album?.title}
          </p>
          <p className="is-size-7 has-text-grey-light mb-3">
            By: {photo?.album?.user?.name}
          </p>
          <button 
            className="button is-primary is-small is-fullwidth"
            onClick={() => onClick(photo)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;