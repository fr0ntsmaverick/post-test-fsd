import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './providers/QueryProvider';
import { RouterProvider } from './providers/RouterProvider';
import App from './App';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </QueryProvider>
    </StrictMode>
  );
}