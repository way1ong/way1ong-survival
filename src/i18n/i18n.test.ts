// Dictionaries: the same keys and parameters in every language, a name for every section.
import { describe, expect, it } from 'vitest';
import { FACT_TEXTS } from '../core/notices.ts';
import { SECTION_IDS } from '../core/sections.ts';
import en from './en.json';
import hu from './hu.json';
import uk from './uk.json';

type Tree = { [key: string]: string | Tree };
const dictionaries: Record<string, Tree> = { en, hu, uk };

/** Key path → text. */
function texts(tree: Tree, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') out.set(path, value);
    else for (const [p, t] of texts(value, path)) out.set(p, t);
  }
  return out;
}
const params = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
const reference = texts(en);

describe.each(Object.entries(dictionaries))('dictionary %s', (_lang, dict) => {
  const own = texts(dict);
  it('has the same keys and parameters as English, and no empty text', () => {
    expect([...own.keys()].sort()).toEqual([...reference.keys()].sort());
    for (const [key, text] of own) {
      expect(params(text), key).toEqual(params(reference.get(key) ?? ''));
      expect(text.trim(), key).not.toBe('');
    }
  });

  it('names every section — and nothing else', () => {
    const sections = { ...(dict.sections as Tree) };
    delete sections.title;
    expect(Object.keys(sections).sort()).toEqual([...SECTION_IDS].sort());
  });
});

it('has the words of the notes over a card that are texts — and nothing else', () => {
  for (const dict of Object.values(dictionaries)) expect(Object.keys(dict.notices as Tree).sort()).toEqual(['notDoctor', 'translation', 'usArmy']);
});

it('has every text that states a fact (src/core/notices.ts)', () => {
  for (const [lang, dict] of Object.entries(dictionaries)) for (const key of Object.keys(FACT_TEXTS)) expect(texts(dict).has(key), `${lang} ${key}`).toBe(true);
});

it('Ukrainian texts use the typographic apostrophe', () => {
  for (const [key, text] of texts(uk)) expect(text.includes("'"), key).toBe(false);
});
