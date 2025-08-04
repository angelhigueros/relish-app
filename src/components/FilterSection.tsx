import React from 'react';
import type { PhotoFilters } from '../types';

interface FilterSectionProps {
  filters: PhotoFilters;
  onFiltersChange: (filters: PhotoFilters) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isLoading = false
}) => {
     const handleInputChange = (field: keyof PhotoFilters, value: string) => {
     let processedValue: string | number | undefined;
     if (field === 'limit') {
       processedValue = parseInt(value) || 25;
     } else if (field === 'id') {
       processedValue = value ? parseInt(value) || undefined : undefined;
     } else {
       processedValue = value || undefined;
     }
     
     onFiltersChange({
       ...filters,
       [field]: processedValue,
       offset: 0
     });
   };

  return (
    <div className="box modern-filters">
             <div className="filter-header mb-5">
         <h2 className="title is-4 mb-2">Search & Filter Photos</h2>
         <p className="subtitle is-6 has-text-grey">Find photos by ID, title, album, or user</p>
       </div>
{/*       
      <div className="id-search-section mb-5">
        <div className="columns is-mobile">
          <div className="column is-half">
            <div className="field">
              <label className="label has-text-weight-semibold">
                <span className="icon-text">
                  <span className="icon has-text-primary">
                    <i className="fas fa-hashtag"></i>
                  </span>
                  <span>Search by Photo ID</span>
                </span>
              </label>
              <div className="control has-icons-left">
                <input
                  className="input is-medium"
                  type="number"
                  placeholder="Enter photo ID (1-5000)"
                  value={filters.id || ''}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  disabled={isLoading}
                  min="1"
                  max="5000"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div>
              <p className="help">Quick search for a specific photo by its ID number</p>
            </div>
          </div>
        </div>
      </div> */}

      <hr className="filter-divider" />

      <div className="text-filters-section">
        <h5 className="title is-6 mb-4 has-text-grey-dark">Filter by Content</h5>
        <div className="columns is-multiline">
          <div className="column is-4">
            <div className="field">
              <label className="label has-text-weight-semibold">
                <span className="icon-text">
                  <span className="icon has-text-info">
                    <i className="fas fa-image"></i>
                  </span>
                  <span>Photo Title</span>
                </span>
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Search in photo titles..."
                  value={filters.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  disabled={isLoading}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="field">
              <label className="label has-text-weight-semibold">
                <span className="icon-text">
                  <span className="icon has-text-warning">
                    <i className="fas fa-folder"></i>
                  </span>
                  <span>Album Title</span>
                </span>
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Search in album titles..."
                  value={filters['album.title'] || ''}
                  onChange={(e) => handleInputChange('album.title', e.target.value)}
                  disabled={isLoading}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="field">
              <label className="label has-text-weight-semibold">
                <span className="icon-text">
                  <span className="icon has-text-success">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>User Email</span>
                </span>
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="user@example.com"
                  value={filters['album.user.email'] || ''}
                  onChange={(e) => handleInputChange('album.user.email', e.target.value)}
                  disabled={isLoading}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="filter-divider" />
      <div className="settings-section">
        <h5 className="title is-6 mb-4 has-text-grey-dark">Display Settings</h5>
        <div className="columns is-vcentered">
          <div className="column is-4">
            <div className="field">
              <label className="label has-text-weight-semibold">
                <span className="icon-text">
                  <span className="icon has-text-grey">
                    <i className="fas fa-th"></i>
                  </span>
                  <span>Photos per page</span>
                </span>
              </label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={filters.limit || 25}
                    onChange={(e) => handleInputChange('limit', e.target.value)}
                    disabled={isLoading}
                  >
                    <option value={10}>10 photos</option>
                    <option value={25}>25 photos</option>
                    <option value={50}>50 photos</option>
                    <option value={100}>100 photos</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-8">
            <div className="field" style={{ display: 'flex', alignItems: 'end', height: '100%' }}>
              <div className="control">
                <button
                  className="button is-danger is-outlined"
                  onClick={onClearFilters}
                  disabled={isLoading}
                >
                  <span className="icon">
                    <i className="fas fa-times"></i>
                  </span>
                  <span>Clear All Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;