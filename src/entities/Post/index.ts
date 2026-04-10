export type {
  Post,
  FetchPostsParams,
  FetchPostsResponse,
} from './model/post.model';

export { PostCard } from './ui/PostCard';
export { PostSkeleton } from './ui/PostSkeleton';
export { fetchPosts, fetchPostById } from './model/post.api';
export { usePostsQuery, usePostQuery } from './model/post.queries';