const STORAGE_KEY = 'posts-scroll-position';

export type ScrollPosition = {
  scrollY: number;
  page: string;
  timestamp: number;
};

export const saveScrollPosition = (scrollY: number, page: string): void => {
  if (scrollY > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      scrollY,
      page,
      timestamp: Date.now()
    }));
  }
};

export const getScrollPosition = (): ScrollPosition | null => {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};

export const clearScrollPosition = (): void => {
  sessionStorage.removeItem(STORAGE_KEY);
};

export const findPostElement = (postId: number): HTMLElement | null => {
  return document.querySelector(`[data-post-id="${postId}"]`);
};

export const scrollToElement = (element: HTMLElement, offset: number = 80): void => {
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
};
