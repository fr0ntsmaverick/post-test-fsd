import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Хранилище ID поста и страницы
type PostScrollInfo = {
  postId: number;
  page: number;
  scrollY?: number;
};

const postScrollMap = new Map<string, PostScrollInfo>();

export const useScrollToPostOnReturn = () => {
  const location = useLocation();
  const isRestoringRef = useRef(false);

  // Сохраняем информацию о том, с какого поста ушли
  const savePostScrollInfo = (postId: number, page: number) => {
    postScrollMap.set(location.key, {
      postId,
      page,
      scrollY: window.scrollY
    });
  };

  // Восстанавливаем скролл к посту
  const restoreScrollToPost = async (targetPostId: number) => {
    // Ждём загрузки постов
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Ищем элемент поста по data-атрибуту
    const postElement = document.querySelector(`[data-post-id="${targetPostId}"]`);
    
    if (postElement) {
      const elementPosition = postElement.getBoundingClientRect().top + window.scrollY;
      const offset = 20; // Отступ сверху
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    const savedInfo = postScrollMap.get(location.key);
    
    if (savedInfo && !isRestoringRef.current) {
      isRestoringRef.current = true;
      restoreScrollToPost(savedInfo.postId).finally(() => {
        isRestoringRef.current = false;
        postScrollMap.delete(location.key);
      });
    }
  }, [location.key]);

  return { savePostScrollInfo };
};