import styles from './PostCard.module.css';

export const PostSkeleton = () => {
  return (
    <article className={styles.skeleton}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonBody} />
      <div className={styles.skeletonFooter}>
        <div className={styles.skeletonUserId} />
        <div className={styles.skeletonReadMore} />
      </div>
    </article>
  );
};
