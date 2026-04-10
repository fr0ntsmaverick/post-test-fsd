import { PostList } from '@/widgets/PostList';
import { Pagination } from '@/widgets/PaginationWidget';
import { usePostsPage } from '../model/usePostsPage';
import { usePostsScrollRestoration } from '../model/usePostsScrollRestoration';
import styles from './PostsPage.module.css';

export const PostsPage = () => {
  const { posts, isLoading, currentPage, totalPages, handlePageChange, error } = usePostsPage();
  
  // Вся логика скролла здесь, на уровне страницы
  usePostsScrollRestoration(isLoading);

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Something went wrong</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <p className={styles.subtitle}>Browse through our latest articles</p>
      </header>

      <PostList posts={posts} isLoading={isLoading} page={currentPage} />

      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};