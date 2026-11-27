import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { CARDS } from './cards.ts';
import { NOTICE_SOURCES } from './notices.ts';
import { SOURCES } from './sources.ts';
import { missingQuotes, normalize, parseTopic } from './topics.ts';

const docs = (path: string) => fileURLToPath(new URL(`../../docs/${path}`, import.meta.url));
const topicFiles = readdirSync(docs('topics')).filter((name) => name.endsWith('.md') && name !== 'README.md');
const topics = new Map(topicFiles.map((name) => [name.replace(/\.md$/, ''), parseTopic(readFileSync(docs(`topics/${name}`), 'utf8'))]));
const texts = new Map(SOURCES.map((source) => [source.id, readFileSync(docs(`sources/${source.id}.txt`), 'utf8')]));

describe('the sentences of the sources (docs/topics/)', () => {
  it('are all word for word in the kept texts of their sources', () => {
    for (const [name, entries] of topics) expect(missingQuotes(entries, texts), name).toEqual([]);
  });

  it('every card has its entry, with sentences of its own source', () => {
    for (const card of CARDS) {
      const entry = topics.get(card.section)?.find((one) => one.id === card.id);
      expect(entry, card.id).toBeDefined();
      expect(entry?.groups.some((group) => group.source === card.source && group.quotes.length > 0), card.id).toBe(true);
    }
  });

  it('every note that states a fact has sentences of each source it stands on', () => {
    const notices = topics.get('notices') ?? [];
    for (const [key, byLang] of Object.entries(NOTICE_SOURCES)) {
      if (!byLang) continue;
      const entry = notices.find((one) => one.id === key);
      for (const source of new Set(Object.values(byLang))) expect(entry?.groups.some((group) => group.source === source && group.quotes.length > 0), `${key}: ${source}`).toBe(true);
    }
  });
});

describe('reading the sentences', () => {
  const sample = ['# Title', 'free text', '## one', 'Джерело: a', '> First line', '> Second line', 'Джерело: b', '> Third', '## two', '> no source yet'].join('\n');

  it('takes each entry with its sources and their sentences', () => {
    expect(parseTopic(sample)).toEqual([
      { id: 'one', groups: [{ source: 'a', quotes: ['First line', 'Second line'] }, { source: 'b', quotes: ['Third'] }] },
      { id: 'two', groups: [] },
    ]);
  });

  it('finds a sentence that is not in its source, a source without a text, and an entry without a source', () => {
    const found = missingQuotes(parseTopic(sample), new Map([['a', 'First   line and\nSecond line.']]));
    expect(found).toEqual(['one: no kept text of source b', 'two: no source']);
    expect(missingQuotes(parseTopic('## x\nДжерело: a\n> Missing words'), new Map([['a', 'Other words']]))).toEqual(['x: not in a: «Missing words»']);
  });

  it('treats every kind of space and line break alike', () => {
    expect(normalize(' a b\n\n c ')).toBe('a b c');
  });
});
