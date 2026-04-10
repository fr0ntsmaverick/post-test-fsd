/**
 * Вычисляет номера страниц для пагинации с многоточиями
 * @param currentPage - текущая страница
 * @param totalPages - всего страниц
 * @param delta - количество страниц с каждой стороны от текущей
 * @returns массив номеров страниц и строк '...'
 */


export const getPageNumbers = (
  currentPage: number, 
  totalPages: number, 
  delta: number = 2
): (number | string)[] => {
  if (totalPages <= 1) return [1];
  
  const range = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(page => 
      page === 1 || 
      page === totalPages || 
      (page >= currentPage - delta && page <= currentPage + delta)
    );
  
  return range.reduce<(number | string)[]>((result, page, index, array) => {
    const prevPage = array[index - 1];
    
    if (prevPage) {
      const gap = page - prevPage;
      
      if (gap === 2) {
        result.push(prevPage + 1);
      } else if (gap > 2) {
        result.push('...');
      }
    }
    
    result.push(page);
    return result;
  }, []);
};