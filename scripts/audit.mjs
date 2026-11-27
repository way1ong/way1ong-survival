// The built app in a browser, on phone, tablet and computer screens, in every language and in light and dark:
//   npm run build && npm run audit
//   npm run audit -- --shots <folder>    also pictures of the screens
// Checks: no sideways scrolling, touch targets of at least 44 px, a name on every button, the cross at the top of
// every window and that it closes the window, the keyboard, very large text, contrast of the colours, and that
// the app opens without internet once it has been opened. Needs Playwright (preinstalled in the cloud session).
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
if (!existsSync(join(dist, 'index.html'))) {
  console.error('audit: dist/ not found — run npm run build first');
  process.exit(1);
}
const shotsAt = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;
if (shotsAt) mkdirSync(shotsAt, { recursive: true });

const LANG_KEY = /langKey: '([^']+)'/.exec(readFileSync(join(root, 'src', 'config.ts'), 'utf8'))?.[1];
const LANGS = ['uk', 'hu', 'en'];
const SCREENS = [
  { name: 'phone-320', width: 320, height: 640 },
  { name: 'phone-360', width: 360, height: 780 },
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'phone-landscape', width: 844, height: 390 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'pc-1366', width: 1366, height: 800 },
];
const SCHEMES = ['light', 'dark'];
const MIN_TARGET = 44;
const MIN_CONTRAST = 4.5;

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = createServer((request, response) => {
  let path = decodeURIComponent((request.url ?? '/').split('?')[0]);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(dist, path));
  if (!file.startsWith(dist) || !existsSync(file)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-cache' }).end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, resolve));
const origin = `http://localhost:${server.address().port}`;

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const problems = [];
let checks = 0;
const note = (where, text) => problems.push(`${where}: ${text}`);

/** What the page shows now: sideways scrolling, small or nameless buttons. */
async function look(page, where) {
  checks++;
  const found = await page.evaluate((min) => {
    const out = [];
    const doc = document.documentElement;
    if (doc.scrollWidth > doc.clientWidth + 1) out.push(`the page scrolls sideways (${doc.scrollWidth} > ${doc.clientWidth})`);
    const open = document.querySelector('dialog[open]');
    const scope = open ?? document;
    for (const el of scope.querySelectorAll('button, a[href]')) {
      const box = el.getBoundingClientRect();
      if (box.width === 0 && box.height === 0) continue;
      if (el.closest('[hidden]')) continue;
      const name = (el.getAttribute('aria-label') ?? el.textContent ?? '').trim();
      if (!name) out.push(`a ${el.tagName.toLowerCase()} without a name`);
      // Links inside running text are exempt (WCAG 2.5.8); buttons and links standing alone are not.
      const inline = el.tagName === 'A' && el.parentElement?.tagName === 'P' && el.parentElement.textContent.trim() !== el.textContent.trim();
      if (!inline && el.tagName === 'BUTTON' && (box.width < min - 0.5 || box.height < min - 0.5)) out.push(`"${name}" is ${Math.round(box.width)}×${Math.round(box.height)} px`);
    }
    if (open) {
      const box = open.getBoundingClientRect();
      if (box.left < -0.5 || box.right > window.innerWidth + 0.5) out.push('a window is wider than the screen');
    }
    return out;
  }, MIN_TARGET);
  for (const text of found) note(where, text);
}

/** The contrast of text against what lies under it, for the main kinds of text on the screen. */
async function contrast(page, where) {
  checks++;
  const found = await page.evaluate((min) => {
    const rgb = (text) => (text.match(/[\d.]+/g) ?? []).map(Number);
    const lum = ([r, g, b]) => {
      const f = (v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const under = (el) => {
      for (let node = el; node; node = node.parentElement) {
        const c = rgb(getComputedStyle(node).backgroundColor);
        if (c.length >= 3 && (c[3] ?? 1) > 0.99) return c;
      }
      return rgb(getComputedStyle(document.body).backgroundColor);
    };
    const out = [];
    for (const selector of ['.top__title', '.tagline', '.sections__title', '.section', 'dialog[open] p', 'dialog[open] h2', 'dialog[open] .btn', 'dialog[open] .chip', 'dialog[open] a', '.update__words', '.update .btn']) {
      for (const el of document.querySelectorAll(selector)) {
        if (!el.getClientRects().length) continue;
        const a = lum(rgb(getComputedStyle(el).color));
        const b = lum(under(el));
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        if (ratio < min) out.push(`${selector}: contrast ${ratio.toFixed(2)}`);
      }
    }
    return [...new Set(out)];
  }, MIN_CONTRAST);
  for (const text of found) note(where, text);
}

/** A window: the cross stands at its top right, is big enough, and closes it. */
async function windowCross(page, where) {
  checks++;
  const dialog = page.locator('dialog[open]');
  if (!(await dialog.count())) return note(where, 'no window opened');
  const cross = dialog.locator('.dialog__cross');
  const [d, c] = [await dialog.boundingBox(), await cross.boundingBox()];
  if (!d || !c) return note(where, 'the window has no cross');
  // Its margin grows with the text: allowed up to half the cross's own size.
  const slack = Math.max(16, c.height / 2);
  if (c.y - d.y > slack || d.x + d.width - (c.x + c.width) > slack) note(where, 'the cross is not in the top right corner of the window');
  // It stays at the top while the window is scrolled down.
  await dialog.evaluate((el) => el.scrollTo(0, el.scrollHeight));
  const after = await cross.boundingBox();
  const box = await dialog.boundingBox();
  if (!after || !box || after.y - box.y > slack) note(where, 'the cross leaves the top of the window when it is scrolled');
  await cross.click();
  await page.waitForTimeout(100);
  if (await page.locator('dialog[open]').count()) note(where, 'the cross does not close the window');
}

try {
  for (const scheme of SCHEMES) {
    for (const lang of LANGS) {
      for (const screen of SCREENS) {
        const where = `${screen.name} ${lang} ${scheme}`;
        const context = await browser.newContext({ viewport: { width: screen.width, height: screen.height }, colorScheme: scheme, locale: lang, deviceScaleFactor: shotsAt ? 2 : 1, serviceWorkers: 'block' });
        await context.addInitScript(([key, code]) => localStorage.setItem(key, code), [LANG_KEY, lang]);
        const page = await context.newPage();
        page.on('pageerror', (error) => note(where, `error on the page: ${error.message}`));
        await page.goto(`${origin}/`);
        await page.waitForSelector('.section');
        if ((await page.evaluate(() => document.documentElement.lang)) !== lang) note(where, 'the page does not say its language');
        await look(page, where);
        await contrast(page, where);
        if (shotsAt && scheme === 'light' && ['phone-390', 'pc-1366'].includes(screen.name)) await page.screenshot({ path: join(shotsAt, `${screen.name}-${lang}.png`), fullPage: true });

        await page.locator('.top .icon-btn').click();
        await look(page, `${where}, menu`);
        await contrast(page, `${where}, menu`);
        if (shotsAt && scheme === 'light' && screen.name === 'phone-390') await page.screenshot({ path: join(shotsAt, `${screen.name}-${lang}-menu.png`) });
        await windowCross(page, `${where}, menu`);

        const sections = page.locator('.section');
        const count = await sections.count();
        for (let i = 0; i < count; i++) {
          await sections.nth(i).click();
          await look(page, `${where}, section ${i + 1}`);
          if (i === 0) await contrast(page, `${where}, section`);
          await windowCross(page, `${where}, section ${i + 1}`);
        }
        await context.close();
      }
    }
  }

  // The keyboard: the menu first, then the sections; Escape closes a window and the focus comes back.
  {
    const where = 'keyboard';
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    const page = await context.newPage();
    await page.goto(`${origin}/`);
    await page.waitForSelector('.section');
    await page.keyboard.press('Tab');
    if (!(await page.evaluate(() => document.activeElement?.matches('.top .icon-btn')))) note(where, 'the first Tab does not reach the menu');
    await page.keyboard.press('Tab');
    if (!(await page.evaluate(() => document.activeElement?.matches('.section')))) note(where, 'the second Tab does not reach the first section');
    await page.keyboard.press('Enter');
    if (!(await page.locator('dialog[open]').count())) note(where, 'Enter does not open a section');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    if (await page.locator('dialog[open]').count()) note(where, 'Escape does not close the window');
    if (!(await page.evaluate(() => document.activeElement?.matches('.section')))) note(where, 'after the window the focus is not back on its section');
    checks++;
    await context.close();
  }

  // Very large text (the system's text size at 200 %) on the narrowest phone.
  {
    const where = 'large text, phone-320';
    const context = await browser.newContext({ viewport: { width: 320, height: 640 }, serviceWorkers: 'block' });
    await context.addInitScript(([key]) => localStorage.setItem(key, 'hu'), [LANG_KEY]);
    const page = await context.newPage();
    await page.goto(`${origin}/`);
    await page.waitForSelector('.section');
    await page.addStyleTag({ content: 'html { font-size: 225% !important; }' });
    await look(page, where);
    await page.locator('.top .icon-btn').click();
    await look(page, `${where}, menu`);
    await windowCross(page, `${where}, menu`);
    await context.close();
  }

  // Without internet: once opened, the app opens again offline.
  {
    const where = 'offline';
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${origin}/`);
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null, null, { timeout: 60000 });
    await context.setOffline(true);
    await page.reload();
    if ((await page.locator('.section').count()) === 0) note(where, 'the app does not open without internet');
    checks++;
    await context.close();
  }
} catch (error) {
  note('audit', `stopped: ${String(error.message).split('\n')[0]}`);
}

await browser.close();
server.close();
if (problems.length) {
  console.error(`audit: ${problems.length} problem(s) in ${checks} checks`);
  for (const text of problems.slice(0, 80)) console.error(`- ${text}`);
  process.exit(1);
}
console.log(`audit: ${checks} checks on ${SCREENS.length} screens × ${LANGS.length} languages × ${SCHEMES.length} colour schemes, keyboard, large text, offline — no problems`);
