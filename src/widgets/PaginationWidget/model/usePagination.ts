import { useMemo } from 'react';
import { getPageNumbers } from '@/shared/lib/utils/getPageNumbers';

export const usePagination = (currentPage: number, totalPages: number, delta: number = 2) => {
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages, delta),
    [currentPage, totalPages, delta]
  );

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    pageNumbers,
    hasPrevPage,
    hasNextPage,
  };
};