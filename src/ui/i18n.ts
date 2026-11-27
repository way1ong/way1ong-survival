// Texts of the screen: one dictionary per language (src/i18n/<lang>.json), same keys.
import type en from '../i18n/en.json';

export type Dict = typeof en;

const modules = import.meta.glob<Dict>('../i18n/*.json', { eager: true, import: 'default' });
const dictionaries = new Map<string, Dict>(Object.entries(modules).map(([path, d]) => [path.replace(/^.*\/([a-z]+)\.json$/, '$1'), d]));

/** Languages in the order the menu shows them (decision of 26.11: Ukrainian, Hungarian, English). */
export const LANGS = ['uk', 'hu', 'en'].filter((code) => dictionaries.has(code));
export const FALLBACK = 'en';

export function dict(lang: string): Dict {
  return dictionaries.get(lang) ?? (dictionaries.get(FALLBACK) as Dict);
}

/** The saved choice, else the first browser language we have, else English. */
export function pickLang(saved: string | null, browser: readonly string[]): string {
  if (saved && dictionaries.has(saved)) return saved;
  for (const tag of browser) {
    const code = tag.toLowerCase().split('-')[0] ?? '';
    if (dictionaries.has(code)) return code;
  }
  return FALLBACK;
}

/** "{name}" in a text → its value. */
export function fmt(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) => (key in params ? String(params[key]) : whole));
}

/** The name of a language in that language: "українська". */
export function langName(code: string): string {
  const name = new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
  return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
}
