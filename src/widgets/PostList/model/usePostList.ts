import { usePostsQuery } from '@/entities/Post';

export const usePostList = (page: number) => {
  const { data, isLoading, error } = usePostsQuery(page, 10);
  
  return {
    posts: data?.data || [],
    isLoading,
    error,
    totalCount: data?.totalCount || 0,
  };
};