import { useLocation } from 'react-router-dom';
import { NavigateBackButton } from '@/features/NavigateBack';
import { usePostPage } from '../model/usePostPage';
import styles from './PostPage.module.css';

export const PostPage = () => {
  const { post, isLoading, error, fromPage } = usePostPage();
  const location = useLocation();
  
  const fromPostId = (location.state as { fromPostId?: number })?.fromPostId || post?.id;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonBody} />
          <div className={styles.skeletonBody} />
          <div className={styles.skeletonBody} />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.error}>
        <NavigateBackButton fromPage={fromPage} fromPostId={fromPostId} />
        <h2>Post not found</h2>
        <p>{(error as Error)?.message || 'The requested post does not exist'}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <NavigateBackButton fromPage={fromPage} fromPostId={fromPostId} />

      <article className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span className={styles.userId}>User ID: {post.userId}</span>
          <span className={styles.postId}>Post ID: {post.id}</span>
        </div>

        <div className={styles.content}>
          <p>{post.body}</p>
        </div>
      </article>
    </div>
  );
};