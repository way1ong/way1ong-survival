// The only things the app keeps, and only on the device: the chosen language and country. Storage may be closed
// (private windows): then nothing is kept and nothing breaks.
export function saved(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function keep(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // nothing kept
  }
}
