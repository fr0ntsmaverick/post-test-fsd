import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPostById } from './post.api';

export const usePostsQuery = (page: number, limit: number = 10) => {
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => fetchPosts(page, limit),
    staleTime: 1000 * 60 * 5,
  });
};

export const usePostQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};