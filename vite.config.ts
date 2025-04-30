import { defineConfig } from 'vite';
import { resolve } from 'path';
import { configDefaults } from 'vitest/config';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  root: 'demo',
  base: '/form-to-url-to-form/',
  build: {
    outDir: '../build',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    exclude: [...configDefaults.exclude],
  }
});
