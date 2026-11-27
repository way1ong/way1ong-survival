import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { appPlugin } from './scripts/pwa.ts';

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// The test build of `npm run audit` (SAMPLE=1) adds a sample card and its made-up source, so the card's window can
// be checked before the first real card exists. The app's own build never has them: scripts/pwa.ts stops a build
// that carries the sample's mark.
const sample = process.env.SAMPLE === '1';

export default defineConfig({
  root: here('src'),
  // public/ holds what the host needs beside the app: _headers for Cloudflare.
  publicDir: here('public'),
  // The built app can be installed and works without internet.
  resolve: { alias: { '#extra': here(sample ? 'src/data/extra-sample.json' : 'src/data/extra-none.json') } },
  plugins: [appPlugin(here('.'), { sample, name: 'way1ong Survival', shortName: 'Survival', description: 'A survival guide: advice from official sources only. No ads, no tracking; works without internet.', lang: 'en' })],
  base: './',
  build: {
    outDir: sample ? here('node_modules/.cache/way1ong-sample') : here('dist'),
    emptyOutDir: true,
    modulePreload: { polyfill: false },
    assetsInlineLimit: 0,
  },
  test: {
    root: here('.'),
    include: ['src/**/*.test.ts'],
  },
});
