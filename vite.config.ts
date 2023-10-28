import { sveltekit } from '@sveltejs/kit/vite';
import { createRequire } from 'module';
import path from 'path';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);

const prismaClient = require
  .resolve('@prisma/client')
  .replace(/@prisma(\/|\\)client(\/|\\)index\.js/, '.prisma/client/index-browser.js');

const prismaIndexBrowser = path.normalize(path.relative(process.cwd(), prismaClient));

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: { alias: { '.prisma/client/index-browser': prismaIndexBrowser } },
});
