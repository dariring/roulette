import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  optimizeDeps: {
    exclude: ['box2d-wasm'],
  },
  build: {
    target: 'esnext',
  },
});