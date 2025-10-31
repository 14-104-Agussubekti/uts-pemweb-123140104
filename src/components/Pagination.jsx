import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  return (
    <nav className="pagination" aria-label="Page navigation">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        &larr; Previous
      </button>

      <span>
        Halaman {currentPage} dari {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
      >
        Next &rarr;
      </button>
    </nav>
  );
};

export default Pagination;