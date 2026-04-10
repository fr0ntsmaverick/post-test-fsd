import type { Post, FetchPostsResponse } from './post.model';

export const fetchPosts = async (page: number, limit: number = 10): Promise<FetchPostsResponse> => {

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(page-1)*limit}&_limit=${limit}`);
  const data = await response.json();
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '100', 10);
  
  return { data, totalCount };
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return await response.json();
};