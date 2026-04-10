import { useLocation, useNavigate } from 'react-router-dom';
import { usePostList } from '@/widgets/PostList/model/usePostList';

export const usePostsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPage = (() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    return isNaN(page) ? 1 : page;
  })();

  const { posts, isLoading, error, totalCount } = usePostList(currentPage);
  const totalPages = Math.ceil(totalCount / 10);

  const handlePageChange = (page: number) => {
    navigate(`/?page=${page}`, { replace: true });
  };

  return {
    posts,
    isLoading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
  };
};