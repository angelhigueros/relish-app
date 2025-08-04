import { useState, useEffect, useCallback } from 'react';
import type { Photo, PhotoFilters } from './types';
import { photoApi } from './services/api';
import FilterSection from './components/FilterSection';
import PhotoGrid from './components/PhotoGrid';
import PhotoModal from './components/PhotoModal';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PhotoFilters>({
    limit: 25,
    offset: 0
  });
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const currentPage = Math.floor((filters.offset || 0) / (filters.limit || 25)) + 1;

  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await photoApi.getPhotos(filters);
      setPhotos(result);
      
      const limit = filters.limit || 25;
      const offset = filters.offset || 0;
      
      if (result.length < limit) {
        setIsLastPage(true);
        setTotalPhotos(offset + result.length);
      } else {
        setIsLastPage(false);
        setTotalPhotos(offset + result.length + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load photos');
      setPhotos([]);
      setIsLastPage(true);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleFiltersChange = (newFilters: PhotoFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      limit: 25,
      offset: 0
    });
  };

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * (filters.limit || 25);
    setFilters(prev => ({
      ...prev,
      offset: newOffset
    }));
  };

  return (
    <div className="app">
      <header className="hero is-primary is-small">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-2">MetaPhoto</h1>
            <h2 className="subtitle">Photo Library Manager</h2>
          </div>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-10-desktop is-12-tablet">
              
              <FilterSection
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isLoading={isLoading}
              />

              {error && (
                <div className="notification is-danger">
                  <button className="delete" onClick={() => setError(null)}></button>
                  <strong>Error:</strong> {error}
                </div>
              )}

              {!isLoading && !error && (
                <div className="box has-background-light">
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <p className="has-text-grey">
                          Showing {photos.length} photos
                          {Object.keys(filters).some(key => key !== 'limit' && key !== 'offset' && filters[key as keyof PhotoFilters]) && (
                            <span> (filtered)</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="level-right">
                      <div className="level-item">
                        <p className="has-text-grey is-size-7">
                          Page {currentPage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isLoading ? (
                <LoadingSpinner message="Loading photos..." />
              ) : (
                <PhotoGrid
                  photos={photos}
                  onPhotoClick={handlePhotoClick}
                  isLoading={isLoading}
                />
              )}

              {!isLoading && !error && photos.length > 0 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalItems={totalPhotos}
                    itemsPerPage={filters.limit || 25}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                    isLastPage={isLastPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;
