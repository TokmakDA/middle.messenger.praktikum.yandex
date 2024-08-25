import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import handlebars from './vite-plugin-handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },

  plugins: [
    handlebars(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint . --ext .ts',
      },
      stylelint: {
        lintCommand: 'stylelint "**/*.scss"',
      },
    }),
    {
      name: 'vite-plugin-custom-message',
      apply: 'serve',
      configResolved(config) {
        // eslint-disable-next-line no-console
        console.log(
          `🚀 Проект "${config.root}" успешно запущен в режиме разработки!`,
        );
      },
    },
  ],

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
