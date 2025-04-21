import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'FormToUrlToForm',
      fileName: (format) => `form-to-url-to-form.${format}.js`
    },
    rollupOptions: {
      output: {
        // Provide global variables to use in the UMD build
        globals: {}
      }
    }
  }
});
