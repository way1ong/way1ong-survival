// Names and dates the language's way, from the browser's own data (no word of ours to translate).

/** The name of a country in a language: "Угорщина". */
export function countryName(lang: string, code: string): string {
  return new Intl.DisplayNames([lang], { type: 'region' }).of(code) ?? code;
}

/** "швидка, пожежна і поліція". */
export function listOf(lang: string, items: readonly string[]): string {
  return new Intl.ListFormat(lang, { style: 'long', type: 'conjunction' }).format(items);
}

/** A date written YYYY-MM-DD, the language's way: "27 листопада 2026 р.". */
export function dateOf(lang: string, iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(y ?? 0, (m ?? 1) - 1, d ?? 1)));
}
