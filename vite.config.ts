import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { appPlugin } from './scripts/pwa.ts';

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  root: here('src'),
  // public/ holds what the host needs beside the app: _headers for Cloudflare.
  publicDir: here('public'),
  // The built app can be installed and works without internet.
  plugins: [appPlugin(here('.'), { name: 'way1ong Survival', shortName: 'Survival', description: 'A survival guide: advice from official sources only. No ads, no tracking; works without internet.', lang: 'en' })],
  base: './',
  build: {
    outDir: here('dist'),
    emptyOutDir: true,
    modulePreload: { polyfill: false },
    assetsInlineLimit: 0,
  },
  test: {
    root: here('.'),
    include: ['src/**/*.test.ts'],
  },
});
