// Service worker of way1ong Survival: keeps the files of this version so the app opens without internet.
// scripts/pwa.ts fills in the version and the list of files at build time; do not edit the built sw.js.
const VERSION = '__VERSION__';
const FILES = __FILES__; // relative to this file
const PREFIX = '__CACHE_PREFIX__';
const CACHE = PREFIX + VERSION;
// The app's page is kept under its own address (the folder): hosts redirect
// /index.html there, and a redirected answer cannot open a page.
const HOME = new URL('./', self.location.href).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.all(
        FILES.map(async (file) => {
          const url = new URL(file, HOME).href;
          // Straight from the server, not from the browser's own cache, so one version is kept whole.
          const response = await fetch(url, { cache: 'reload' });
          if (!response.ok) throw new Error(`${url}: ${response.status}`);
          const plain = response.redirected
            ? new Response(await response.blob(), { status: response.status, statusText: response.statusText, headers: response.headers })
            : response;
          await cache.put(url, plain);
        }),
      );
      // No skipWaiting here: a page that is open keeps the worker and the files of its own version — it
      // fetches pictures only when a card is opened, and a new worker would have thrown the old ones away. The
      // new version takes over once every page of the app is closed — or at once when the person, told that
      // a new version waits, presses "Update" (the message below): the page then loads anew.
    })(),
  );
});

// The page says the person has agreed to the new version: this worker stops waiting for the old pages to close.
self.addEventListener('message', (event) => {
  if (event.data === 'take-over') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
      }
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const key = request.mode === 'navigate' && request.url.startsWith(HOME) ? HOME : request;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      // By address only: a page's module script asks with an Origin header, the kept copy was fetched without
      // one, and servers that answer "Vary: Origin" would otherwise make them never match.
      return (await cache.match(key, { ignoreVary: true })) ?? fetch(request);
    })(),
  );
});
