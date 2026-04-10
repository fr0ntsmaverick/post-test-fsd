import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/post-test-fsd/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
