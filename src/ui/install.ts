// Installing the app on the home screen or as a computer app: the browser's own window where it has one
// (Chrome, Edge, Samsung Internet), a short instruction on iPhone and iPad, nothing when the app is already
// installed or is not on its own page (a test page, another site's frame). The browser never shows its
// banner by itself: the reader chooses in the menu.
import { isAppPage } from './offline.ts';

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export type InstallWay = 'prompt' | 'ios' | null;

let offer: InstallPrompt | null = null;

export function watchInstall(): void {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    offer = event as InstallPrompt;
  });
  window.addEventListener('appinstalled', () => {
    offer = null;
  });
}

function installed(): boolean {
  const standalone = (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return standalone || window.matchMedia('(display-mode: standalone)').matches;
}

function apple(): boolean {
  // iPadOS presents itself as a Mac with a touch screen.
  return /iPhone|iPad|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
}

export function installWay(): InstallWay {
  if (!isAppPage() || installed()) return null;
  if (offer) return 'prompt';
  return apple() ? 'ios' : null;
}

/** Shows the browser's install window; the offer can be used once. */
export async function install(): Promise<void> {
  const current = offer;
  offer = null;
  if (!current) return;
  await current.prompt();
  await current.userChoice.catch(() => undefined);
}
