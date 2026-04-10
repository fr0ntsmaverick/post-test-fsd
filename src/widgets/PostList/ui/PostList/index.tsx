import { PostCard, PostSkeleton } from '@/entities/Post';
import type { Post } from '@/entities/Post';
import styles from './PostList.module.css';

type PostListProps = {
  posts: Post[];
  isLoading: boolean;
  page?: number;
}

export const PostList = ({ posts, isLoading, page = 1 }: PostListProps) => {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className={styles.empty}>
        <p>No posts found</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentPage={page} />
      ))}
    </div>
  );
};