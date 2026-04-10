import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './app/providers/QueryProvider';
import { RouterProvider } from './app/providers/RouterProvider';
import App from './app/App';

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
