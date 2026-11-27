// Draws the app's icons from its colour tokens (src/styles/tokens.css); the picture is scripts/icon-art.mjs.
// Needs Playwright (preinstalled in the cloud session). Run: node scripts/make-icons.mjs
// Writes src/icons/: icon.svg (browser tab), icon-192.png, icon-512.png, icon-maskable-512.png,
// apple-touch-icon.png (180 × 180). Do not edit those files by hand.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { picture, SHARE, TOKENS } from './icon-art.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'src', 'styles', 'tokens.css'), 'utf8');
const block = css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {')));
const token = (name) => {
  const m = block.match(new RegExp(`${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`No ${name} in tokens.css`);
  return m[1].trim();
};
const C = Object.fromEntries(Object.entries(TOKENS).map(([key, name]) => [key, token(name)]));

const out = join(root, 'src', 'icons');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'icon.svg'), picture(512, { full: false, share: SHARE.plain }, C) + '\n');

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
const shots = [
  ['icon-192.png', 192, { full: false, share: SHARE.plain }],
  ['icon-512.png', 512, { full: false, share: SHARE.plain }],
  // maskable: the launcher cuts its own shape, everything important stays in the middle 80 %
  ['icon-maskable-512.png', 512, { full: true, share: SHARE.maskable }],
  ['apple-touch-icon.png', 180, { full: true, share: SHARE.apple }],
];
for (const [file, size, opts] of shots) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${picture(size, opts, C)}</body></html>`);
  await page.locator('svg').screenshot({ path: join(out, file), omitBackground: true });
  console.log(file);
}
await browser.close();
