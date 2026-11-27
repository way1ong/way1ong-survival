// Install and offline (build only): the web app manifest, the icons and a service worker that keeps this
// build's files, so the app opens without internet. No library: the worker is scripts/sw-template.js with
// this build's version and file list filled in — the same way as in way1ong Sky and the games.
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';

export interface AppInfo {
  /** Name on the home screen and in the app list; short name under the icon. */
  name: string;
  shortName: string;
  description: string;
  /** Language of the manifest's texts. */
  lang: string;
  /** The test build with the sample card (npm run audit); the app's own build — false. */
  sample?: boolean;
}

/** The mark of the sample card's data (src/data/extra-sample.json): it must never reach the app's own build. */
export const SAMPLE_MARK = 'SAMPLE-ONLY-NOT-FOR-RELEASE';
/**
 * The mark the owner's personal guide carries in its own data (decision of 27.11; a closed repository of its own):
 * it must never reach the public app, whatever else is built.
 */
export const PRIVATE_MARK = 'PRIVATE-ONLY-NOT-FOR-PUBLIC';

/** What the worker's storage is called: this prefix and the version. Nothing else on the address may begin so. */
export const STORE_PREFIX = 'way1ong-survival-';

/** A colour token from src/styles/tokens.css (the light theme, the first `:root` block). */
export function token(root: string, name: string): string {
  const css = readFileSync(join(root, 'src', 'styles', 'tokens.css'), 'utf8');
  const start = css.indexOf(':root {');
  const value = css.slice(start, css.indexOf('}', start)).match(new RegExp(`${name}:\\s*([^;]+);`))?.[1]?.trim();
  if (!value) throw new Error(`No ${name} in src/styles/tokens.css`);
  return value;
}

/** The web app manifest; it is served next to the page. No "id": the identity is the start address. */
export function appManifest(app: AppInfo, background: string, theme: string) {
  return {
    start_url: './',
    scope: './',
    name: app.name,
    short_name: app.shortName,
    description: app.description,
    lang: app.lang,
    dir: 'ltr',
    display: 'standalone',
    background_color: background,
    theme_color: theme,
    categories: ['education'],
    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

export function appPlugin(root: string, app: AppInfo): Plugin {
  return {
    name: 'way1ong-survival-app',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return {
          html,
          tags: [
            { tag: 'link', attrs: { rel: 'manifest', href: 'manifest.webmanifest' }, injectTo: 'head' },
            { tag: 'link', attrs: { rel: 'icon', href: 'icons/icon.svg', type: 'image/svg+xml' }, injectTo: 'head' },
            { tag: 'link', attrs: { rel: 'apple-touch-icon', href: 'icons/apple-touch-icon.png' }, injectTo: 'head' },
          ],
        };
      },
    },
    writeBundle(options, bundle) {
      const out = options.dir;
      if (!out) throw new Error('No output folder');
      for (const [file, chunk] of Object.entries(bundle)) {
        const code = chunk.type === 'chunk' ? chunk.code : String(chunk.source);
        if (!app.sample && code.includes(SAMPLE_MARK)) throw new Error(`${file}: the sample card got into the app's own build`);
        if (code.includes(PRIVATE_MARK)) throw new Error(`${file}: the personal guide got into the public app`);
      }
      mkdirSync(join(out, 'icons'), { recursive: true });
      const icons = readdirSync(join(root, 'src', 'icons'));
      for (const icon of icons) copyFileSync(join(root, 'src', 'icons', icon), join(out, 'icons', icon));
      writeFileSync(join(out, 'manifest.webmanifest'), `${JSON.stringify(appManifest(app, token(root, '--bg'), token(root, '--bar')), null, 2)}\n`);

      // Everything the build made is kept, so every card opens without internet too.
      const files = ['index.html', 'manifest.webmanifest', ...icons.map((icon) => `icons/${icon}`), ...Object.keys(bundle).filter((file) => file !== 'index.html')];
      const template = readFileSync(join(root, 'scripts', 'sw-template.js'), 'utf8');
      // The version changes with any kept file and with the worker's own code.
      const hash = createHash('sha256').update(template);
      for (const file of files) hash.update(file).update(readFileSync(join(out, file)));
      const version = hash.digest('hex').slice(0, 12);
      const worker = template
        .replace("'__VERSION__'", JSON.stringify(version))
        .replace('__FILES__', JSON.stringify(files.map((file) => (file === 'index.html' ? './' : file))))
        .replace("'__CACHE_PREFIX__'", JSON.stringify(STORE_PREFIX));
      writeFileSync(join(out, 'sw.js'), worker);
      this.info?.(`service worker ${version}, ${files.length} files`);
    },
  };
}
