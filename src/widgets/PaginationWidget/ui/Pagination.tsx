import { usePagination } from '../model/usePagination';
import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  delta?: number;
};

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  delta = 2
}: PaginationProps) => {
  const { pageNumbers, hasPrevPage, hasNextPage } = usePagination(
    currentPage, 
    totalPages, 
    delta
  );

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        aria-label="Previous page"
        className={styles.button}
      >
        ← Previous
      </button>

      <div className={styles.pages}>
        {pageNumbers.map((page, index) => (
          <button
            key={`${page}-${index}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            aria-label={typeof page === 'number' ? `Go to page ${page}` : 'More pages'}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={styles.button}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
};
