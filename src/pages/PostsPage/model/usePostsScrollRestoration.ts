import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const usePostsScrollRestoration = (isLoading: boolean) => {
  const location = useLocation();
  const hasRestoredScroll = useRef(false);

  // Сохраняем позицию скролла при уходе
  useEffect(() => {
    const saveCurrentScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        sessionStorage.setItem('posts-scroll-position', JSON.stringify({
          scrollY,
          page: new URLSearchParams(location.search).get('page') || '1',
          timestamp: Date.now()
        }));
      }
    };

    window.addEventListener('beforeunload', saveCurrentScroll);
    
    return () => {
      window.removeEventListener('beforeunload', saveCurrentScroll);
      saveCurrentScroll();
    };
  }, [location.search]);

  // Восстанавливаем позицию к конкретному посту
  const restoreScrollToPost = (postId: number) => {
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (postElement) {
      const elementPosition = postElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 80, behavior: 'smooth' });
      return true;
    }
    return false;
  };

  // Восстанавливаем позицию
  useEffect(() => {
    if (isLoading || hasRestoredScroll.current) return;

    const state = location.state as { fromPostId?: number };
    
    if (state?.fromPostId) {
      // Восстанавливаем скролл к конкретному посту
      setTimeout(() => {
        restoreScrollToPost(state.fromPostId!);
        hasRestoredScroll.current = true;
        // Очищаем state
        window.history.replaceState({}, document.title);
      }, 150);
    } else {
      // Восстанавливаем обычную позицию скролла
      const saved = sessionStorage.getItem('posts-scroll-position');
      if (saved) {
        const { scrollY } = JSON.parse(saved);
        setTimeout(() => {
          window.scrollTo({ top: scrollY, behavior: 'instant' });
        }, 100);
      }
    }
  }, [isLoading, location.state]);
};