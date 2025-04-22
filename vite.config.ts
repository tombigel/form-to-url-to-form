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
    {
      name: 'handle-demo-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/form-to-url-to-form/examples/demo/')) {
            res.writeHead(301, { Location: '/form-to-url-to-form/' });
            res.end();
            return;
          }
          next();
        });
      },
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `<script>
            if (window.location.pathname.includes('/examples/demo/')) {
              window.location.href = '/form-to-url-to-form/';
            }
          </script>
          </head>`
        );
      },
    },
  ],
  base: '/form-to-url-to-form/',
  build: {
    outDir: 'build',
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
