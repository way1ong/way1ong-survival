// Without internet: in the built app a service worker keeps this version's files (scripts/pwa.ts builds
// it), so the app opens offline after the first visit. Only on the app's own page, which carries the app
// manifest: not while developing, not on a test page that shows the app, not inside another site's frame.
//
// A new version is fetched in the background and waits: the open page keeps its own files. The person is
// told that it waits and may switch to it with one press (the owner's decision of 26.11: every program tells
// of its updates); without that press it takes over when every page of the app has been closed.
export function isAppPage(): boolean {
  return document.querySelector('link[rel="manifest"]') !== null && window.self === window.top;
}

/** Switches to the new version: the waiting worker takes over and the page loads anew. */
export type ApplyUpdate = () => void;

let waitingUpdate: ApplyUpdate | null = null;
let tell: (apply: ApplyUpdate) => void = () => undefined;

/** Calls `listener` when a new version has been fetched and waits — at once, if one waits already. */
export function onUpdateReady(listener: (apply: ApplyUpdate) => void): void {
  tell = listener;
  if (waitingUpdate) listener(waitingUpdate);
}

function watch(registration: ServiceWorkerRegistration): void {
  const offer = () => {
    const waiting = registration.waiting;
    // The very first worker replaces nothing: there is no update to tell of.
    if (!waiting || !navigator.serviceWorker.controller) return;
    waitingUpdate = () => {
      navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true });
      waiting.postMessage('take-over');
    };
    tell(waitingUpdate);
  };
  offer();
  registration.addEventListener('updatefound', () => {
    const coming = registration.installing;
    coming?.addEventListener('statechange', () => {
      if (coming.state === 'installed') offer();
    });
  });
  // An app left open for days: the browser looks for a new version only when a page is opened, so the app
  // asks again whenever the person comes back to it.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') registration.update().catch(() => undefined);
  });
}

export function keepOffline(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator) || !isAppPage()) return;
  window.addEventListener('load', () => {
    // Without the worker the app still works online, so a refusal needs no message.
    navigator.serviceWorker.register('./sw.js').then(watch).catch(() => undefined);
  });
}
