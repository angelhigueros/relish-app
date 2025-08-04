import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  isLastPage?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false,
  isLastPage = false
}) => {
  const totalPages = isLastPage 
    ? currentPage 
    : Math.max(currentPage + 1, Math.ceil(totalItems / itemsPerPage));
  
  if (totalPages <= 1 && isLastPage) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta);
         i <= Math.min(totalPages - 1, currentPage + delta);
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous"
        disabled={currentPage === 1 || isLoading}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="pagination-next"
        disabled={isLastPage || isLoading}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      
      <ul className="pagination-list">
        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="pagination-ellipsis">&hellip;</span>
            ) : (
              <button
                className={`pagination-link ${currentPage === page ? 'is-current' : ''}`}
                aria-label={`Go to page ${page}`}
                disabled={isLoading}
                onClick={() => typeof page === 'number' && onPageChange(page)}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;