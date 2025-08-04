import React from 'react';
import type { Photo } from '../types';

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, isOpen, onClose }) => {
  if (!photo || !isOpen) return null;

  const fallbackImageUrl = "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D142441704W10000H6925/views/1,width=1200,height=630,appearanceId=839,backgroundColor=F2F2F2/image-not-found-sticker.jpg";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackImageUrl) {
      target.src = fallbackImageUrl;
    }
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ maxWidth: '95vw', maxHeight: '90vh', width: '1200px' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Photo Details</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        
        <section className="modal-card-body" style={{ overflowY: 'auto' }}>
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  style={{ width: '100%', height: 'auto' }}
                  onError={handleImageError}
                />
              </figure>
            </div>
            
            <div className="column is-half">
              <div className="content">
                <h4 className="title is-4">Photo Information</h4>
                <table className="table is-striped is-narrow is-fullwidth">
                  <tbody>
                    <tr>
                      <td><strong>ID</strong></td>
                      <td>{photo.id}</td>
                    </tr>
                    <tr>
                      <td><strong>Title</strong></td>
                      <td>{photo.title}</td>
                    </tr>
                  </tbody>
                </table>

                <h5 className="title is-5 mt-5">Album Information</h5>
                <table className="table is-striped is-narrow is-fullwidth">
                  <tbody>
                    <tr>
                      <td><strong>Album ID</strong></td>
                      <td>{photo.album.id}</td>
                    </tr>
                    <tr>
                      <td><strong>Album Title</strong></td>
                      <td>{photo.album.title}</td>
                    </tr>
                  </tbody>
                </table>

                <h5 className="title is-5 mt-5">User Information</h5>
                <table className="table is-striped is-narrow is-fullwidth">
                  <tbody>
                    <tr>
                      <td><strong>Name</strong></td>
                      <td>{photo.album.user.name}</td>
                    </tr>
                    <tr>
                      <td><strong>Username</strong></td>
                      <td>{photo.album.user.username}</td>
                    </tr>
                    <tr>
                      <td><strong>Email</strong></td>
                      <td>{photo.album.user.email}</td>
                    </tr>
                    <tr>
                      <td><strong>Phone</strong></td>
                      <td>{photo.album.user.phone}</td>
                    </tr>
                    <tr>
                      <td><strong>Website</strong></td>
                      <td>
                        <a href={`https://${photo.album.user.website}`} target="_blank" rel="noopener noreferrer">
                          {photo.album.user.website}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 className="title is-6 mt-4">Address</h6>
                <table className="table is-striped is-narrow is-fullwidth">
                  <tbody>
                    <tr>
                      <td><strong>Street</strong></td>
                      <td>{photo.album.user.address.street}</td>
                    </tr>
                    <tr>
                      <td><strong>Suite</strong></td>
                      <td>{photo.album.user.address.suite}</td>
                    </tr>
                    <tr>
                      <td><strong>City</strong></td>
                      <td>{photo.album.user.address.city}</td>
                    </tr>
                    <tr>
                      <td><strong>Zipcode</strong></td>
                      <td>{photo.album.user.address.zipcode}</td>
                    </tr>
                    <tr>
                      <td><strong>Coordinates</strong></td>
                      <td>{photo.album.user.address.geo.lat}, {photo.album.user.address.geo.lng}</td>
                    </tr>
                  </tbody>
                </table>

                <h6 className="title is-6 mt-4">Company</h6>
                <table className="table is-striped is-narrow is-fullwidth">
                  <tbody>
                    <tr>
                      <td><strong>Company</strong></td>
                      <td>{photo.album.user.company.name}</td>
                    </tr>
                    <tr>
                      <td><strong>Catch Phrase</strong></td>
                      <td>{photo.album.user.company.catchPhrase}</td>
                    </tr>
                    <tr>
                      <td><strong>Business</strong></td>
                      <td>{photo.album.user.company.bs}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PhotoModal;