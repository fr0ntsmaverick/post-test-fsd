import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';
import type { Post } from '../../model/post.model';

type PostCardProps = {
  post: Post;
  currentPage: number;
}

export const PostCard = ({ post, currentPage }: PostCardProps) => {
  const page = currentPage || 1;
  
  return (
    <article className={styles.card} data-post-id={post.id}>
      <h3 className={styles.title}>
        <Link to={`/post/${post.id}?page=${page}`} state={{ fromPage: page, fromPostId: post.id }}>
          {post.title}
        </Link>
      </h3>
      <p className={styles.body}>{post.body.substring(0, 120)}...</p>
      <div className={styles.footer}>
        <span>User ID: {post.userId}</span>
        <Link to={`/post/${post.id}?page=${page}`} state={{ fromPage: page, fromPostId: post.id }} className={styles.readMore}>
          Read more →
        </Link>
      </div>
    </article>
  );
};