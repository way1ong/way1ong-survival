// The app's icon: a tent before a mountain, under the sun. Our own picture; the colours are the app's tokens.
export const TOKENS = { ground: '--accent', tent: '--on-accent', sun: '--sun' };

/** The picture on a square of `size`; `full` — the ground fills the square (maskable, Apple), else rounded. */
export function picture(size, { full, share }, C) {
  const c = size / 2;
  const r = (size * share) / 2;
  const base = c + r * 0.7;
  const mountain = `M ${c - r} ${base} L ${c - r * 0.35} ${c - r * 0.55} L ${c + r * 0.1} ${c - r * 0.05} L ${c + r * 0.45} ${c - r * 0.4} L ${c + r} ${base} Z`;
  const tent = `M ${c - r * 0.62} ${base} L ${c} ${c - r * 0.3} L ${c + r * 0.62} ${base} Z`;
  const door = `M ${c - r * 0.2} ${base} L ${c} ${c + r * 0.12} L ${c + r * 0.2} ${base} Z`;
  const sun = `<circle cx="${c + r * 0.62}" cy="${c - r * 0.72}" r="${r * 0.2}" fill="${C.sun}"/>`;
  const ground = full ? `<rect width="${size}" height="${size}" fill="${C.ground}"/>` : `<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${C.ground}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${ground}${sun}<path d="${mountain}" fill="${C.tent}" opacity="0.35"/><path d="${tent}" fill="${C.tent}"/><path d="${door}" fill="${C.ground}"/></svg>`;
}

/** How much of the square the picture takes: browser tab and launcher, maskable (the middle 80 % stays), Apple. */
export const SHARE = { plain: 0.7, maskable: 0.54, apple: 0.62 };
