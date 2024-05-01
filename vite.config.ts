import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname, 'src'),

  build: {
    outDir: resolve(__dirname, 'dist'),
  },

  plugins: [handlebars()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:color';
          @use './src/assets/styles/vars' as *;
          @use './src/assets/styles/mixins' as *;
        `,
      },
    },
  },
});
