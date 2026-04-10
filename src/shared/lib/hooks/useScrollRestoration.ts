import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getScrollPosition, saveScrollPosition, scrollToElement, findPostElement } from '@/shared/lib/utils/scrollStorage';

export const useScrollRestoration = () => {
  const location = useLocation();
  const isRestoringRef = useRef(false);

  // Восстановление скролла к посту или позиции
  useEffect(() => {
    if (isRestoringRef.current) return;

    const state = location.state as { fromPostId?: number };
    
    if (state?.fromPostId) {
      isRestoringRef.current = true;
      
      setTimeout(() => {
        const postElement = findPostElement(state.fromPostId!);
        if (postElement) {
          scrollToElement(postElement);
        }
        isRestoringRef.current = false;
        
        // Очищаем state после восстановления
        window.history.replaceState({}, document.title);
      }, 150);
    } else {
      const savedPosition = getScrollPosition();
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo({ top: savedPosition.scrollY, behavior: 'instant' });
        }, 100);
      }
    }
  }, [location]);

  // Сохранение позиции скролла
  useEffect(() => {
    const saveCurrentScroll = () => {
      const scrollY = window.scrollY;
      const page = new URLSearchParams(location.search).get('page') || '1';
      saveScrollPosition(scrollY, page);
    };

    window.addEventListener('beforeunload', saveCurrentScroll);
    
    return () => {
      window.removeEventListener('beforeunload', saveCurrentScroll);
      saveCurrentScroll();
    };
  }, [location.search]);
};