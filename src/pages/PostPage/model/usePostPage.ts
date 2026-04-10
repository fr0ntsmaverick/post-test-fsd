import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { fetchPostById } from '@/entities/Post';

export const usePostPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const fromPage = (() => {
    const fromSearch = Number(searchParams.get('page'));
    const fromState = (location.state as { fromPage?: number })?.fromPage;
    const page = fromSearch || fromState || 1;
    return isNaN(page) ? 1 : Math.max(1, page); 
  })();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    post,
    isLoading,
    error,
    fromPage,
    postId: id,
  };
};