import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#api': path.resolve(__dirname, './src/api'),
      '#pages': path.resolve(__dirname, './src/pages'),
      '#layout': path.resolve(__dirname, './src/layout'),
      '#components': path.resolve(__dirname, './src/components'),
      '#assets': path.resolve(__dirname, './src/assets'),
      '#stores': path.resolve(__dirname, './src/stores'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
});
