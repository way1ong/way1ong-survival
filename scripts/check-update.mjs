// A new version of the built app in a browser: the app that is open says that a new version is out, and its
// button switches to it. Run after a build:
//   npm run build && npm run check:update
//   npm run check:update -- --shot <file.png>    also a picture of the note
// The script serves dist/ itself, opens the app, then serves a copy of dist/ whose service worker carries
// another version — to the browser that is a new release — and looks at what the app does.
// Needs Playwright (preinstalled in the cloud session).
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
if (!existsSync(join(dist, 'sw.js'))) {
  console.error('check-update: dist/sw.js not found — run npm run build first');
  process.exit(1);
}

// The "next release": the same files, another version in the worker.
const next = mkdtempSync(join(tmpdir(), 'survival-next-'));
cpSync(dist, next, { recursive: true });
const worker = readFileSync(join(dist, 'sw.js'), 'utf8');
const version = /const VERSION = "([^"]+)"/.exec(worker)?.[1];
const prefix = /const PREFIX = "([^"]+)"/.exec(worker)?.[1];
if (!version || !prefix) {
  console.error('check-update: the version of the built worker was not found');
  process.exit(1);
}
const NEXT_VERSION = 'next-release';
writeFileSync(join(next, 'sw.js'), worker.replace(`const VERSION = "${version}"`, `const VERSION = "${NEXT_VERSION}"`));

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
let serving = dist;
const server = createServer((request, response) => {
  let path = decodeURIComponent((request.url ?? '/').split('?')[0]);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(serving, path));
  if (!file.startsWith(serving) || !existsSync(file)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-cache' }).end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, resolve));
const origin = `http://localhost:${server.address().port}`;

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const browser = await chromium.launch();
const shot = process.argv.includes('--shot') ? process.argv[process.argv.indexOf('--shot') + 1] : null;
const problems = [];
const note = (text) => problems.push(text);
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'en-GB', deviceScaleFactor: shot ? 2 : 1 });
  const page = await context.newPage();
  page.on('pageerror', (error) => note(`error on the page: ${error.message}`));
  const keys = () => page.evaluate(async () => (await caches.keys()).sort());
  const update = page.locator('.update');

  // The first opening: the worker keeps the files; nothing is said of updates, for there is none.
  await page.goto(`${origin}/`);
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null, null, { timeout: 60000 });
  await page.waitForTimeout(500);
  if (await update.isVisible()) note('the first opening of the app speaks of an update');
  if ((await keys()).join() !== `${prefix}${version}`) note(`after the first opening the caches are ${(await keys()).join(', ')}`);

  // A release comes out while the app is open; the person comes back to the app, and it asks for news.
  serving = next;
  await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.update());
  await update.waitFor({ state: 'visible', timeout: 60000 }).catch(() => note('a new version came out, and the open app says nothing'));
  if (await update.isVisible()) {
    const said = ((await update.locator('.update__words').textContent()) ?? '').trim();
    if (!said) note('the note of the update has no words');
    // The old version goes on working until the person agrees: its files are still kept.
    if (!(await keys()).includes(`${prefix}${version}`)) note('the files of the open version were thrown away before the person agreed');
    // It stands first in the screen, under the heading.
    const [top, heading] = [await update.boundingBox(), await page.locator('.top').boundingBox()];
    if (!top || !heading || top.y < heading.y + heading.height - 1) note('the note of the update is not under the heading');
    if (shot) await page.screenshot({ path: shot });
    const button = update.locator('.btn');
    const size = await button.boundingBox();
    if (!size || size.height < 44) note('the button of the update is lower than 44 px');
    // "Update": the page loads anew on the new version, the old files go.
    await Promise.all([page.waitForEvent('load', { timeout: 60000 }), button.click()]);
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    await page.waitForTimeout(800);
    if ((await keys()).join() !== `${prefix}${NEXT_VERSION}`) note(`after the update the caches are ${(await keys()).join(', ')}`);
    if (await update.isVisible()) note('after the update the app still says a new version is out');
    if ((await page.locator('.section').count()) === 0) note('after the update the app did not open');
  }

  // The cross puts the note away and nothing is loaded anew: the new version waits for the next opening.
  writeFileSync(join(next, 'sw.js'), worker.replace(`const VERSION = "${version}"`, 'const VERSION = "one-more"'));
  serving = next;
  await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.update());
  await update.waitFor({ state: 'visible', timeout: 60000 }).catch(() => note('the second new version is not told of'));
  if (await update.isVisible()) {
    await update.locator('.icon-btn').click();
    await page.waitForTimeout(300);
    if (await update.isVisible()) note('the cross does not put the note of the update away');
    if (!(await keys()).includes(`${prefix}${NEXT_VERSION}`)) note('the cross of the note changed the version');
  }
  await context.close();
} catch (error) {
  note(`the check stopped: ${String(error.message).split('\n')[0]}`);
}
await browser.close();
server.close();
rmSync(next, { recursive: true, force: true });
if (problems.length) {
  console.error(`check-update: ${problems.length} problem(s)`);
  for (const text of problems) console.error(`- ${text}`);
  process.exit(1);
}
console.log('check-update: the open app tells of a new version, "Update" switches to it, the cross leaves it for later — no problems');
