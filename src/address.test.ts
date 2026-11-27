// One address everywhere: the one the app is told (src/config.ts) and the one Cloudflare serves (wrangler.jsonc).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';
import { appManifest, STORE_PREFIX } from '../scripts/pwa.ts';
import { SURVIVAL } from './config.ts';

it('lives at the address Cloudflare is told to serve, and nowhere else', () => {
  const text = readFileSync(fileURLToPath(new URL('../wrangler.jsonc', import.meta.url)), 'utf8');
  const config = JSON.parse(text.replace(/^\s*\/\/.*$/gm, '')) as { name: string; routes: { pattern: string; custom_domain: boolean }[]; workers_dev: boolean; preview_urls: boolean; previews: object; assets: { directory: string } };
  expect(config.name).toBe('way1ong-survival');
  expect(config.routes).toEqual([{ pattern: new URL(SURVIVAL.address).host, custom_domain: true }]);
  expect(SURVIVAL.address).toBe('https://survival.way1ong.eu');
  expect(config.workers_dev).toBe(false);
  expect(config.preview_urls).toBe(false);
  expect(config.previews).toEqual({});
  expect(config.assets.directory).toBe('./dist');
});

it('is an app of its own for the browser: started from its folder, with icons, standing alone', () => {
  const manifest = appManifest({ name: 'way1ong Survival', shortName: 'Survival', description: 'x', lang: 'en' }, '#000000', '#111111');
  expect(manifest.start_url).toBe('./');
  expect(manifest.scope).toBe('./');
  expect(manifest.display).toBe('standalone');
  expect(manifest).not.toHaveProperty('id');
  expect(manifest.icons.map((icon) => icon.purpose).sort()).toEqual(['any', 'any', 'maskable']);
  expect(STORE_PREFIX).toBe('way1ong-survival-');
});

it('keeps the pages unchanged on the way: Cloudflare may add nothing', () => {
  const headers = readFileSync(fileURLToPath(new URL('../public/_headers', import.meta.url)), 'utf8');
  expect(headers).toMatch(/no-transform/);
});
