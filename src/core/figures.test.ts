import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import en from '../i18n/en.json';
import hu from '../i18n/hu.json';
import uk from '../i18n/uk.json';
import { CARDS, type Card } from './cards.ts';
import { FIGURES, figureProblems, figureText, type Figure } from './figures.ts';
import { SOURCES, type Source } from './sources.ts';
import { normalize } from './topics.ts';

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/** Width and height of a PNG, from its header. */
function pngSize(path: string): [number, number] {
  const bytes = readFileSync(path);
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

describe('the figures of the app', () => {
  it('are all in order: a source, a card that shows them, their words in every language', () => {
    expect(figureProblems(FIGURES, CARDS, SOURCES, { uk, hu, en })).toEqual([]);
  });

  for (const figure of FIGURES) {
    it(`${figure.id}: its file is there, of its size, and its caption is in the kept text of its source`, () => {
      const file = here(`../figures/${figure.file}`);
      expect(existsSync(file)).toBe(true);
      expect(pngSize(file)).toEqual([figure.width, figure.height]);
      expect(normalize(readFileSync(here(`../../docs/sources/${figure.source}.txt`), 'utf8'))).toContain(normalize(figure.caption));
    });
  }

  it('English, the language of the figures, names each word as the figure does', () => {
    for (const figure of FIGURES) expect((figureText(en, figure) as { labels: string[] }).labels).toEqual(figure.labels);
  });
});

// Made-up figures, cards and sources for the checks below — not real.
const source: Source = { id: 'sample-src', title: 'S', publisher: 'P', url: 'https://example.org', lang: 'en', version: '1', read: '2026-11-28', licence: { kind: 'us-government-work', url: 'https://example.org/l', quote: 'Q' }, attribution: null, note: null, series: null };
const figure: Figure = { id: 'sample-figure', source: 'sample-src', file: 'sample/figure-1.png', caption: 'Figure 1. Sample', labels: ['North', 'Peg'], width: 10, height: 5 };
const card: Card = { id: 'sample-card', section: 'water', source: 'sample-src', figures: ['sample-figure'] };
const words = (labels: Record<string, string>) => ({ figures: { 'sample-figure': { title: 'T', alt: 'A', labels } } });

describe('the check of figures', () => {
  it('passes a figure in order', () => {
    expect(figureProblems([figure], [card], [source], { uk: words({ '1': 'Північ', '2': 'Кілочок' }) })).toEqual([]);
  });

  it('finds a figure no card shows, an unknown figure of a card, and a card of another source', () => {
    expect(figureProblems([figure], [{ ...card, figures: [] }], [source], {}).join()).toMatch(/no card shows it/);
    expect(figureProblems([], [card], [source], {}).join()).toMatch(/unknown figure sample-figure/);
    expect(figureProblems([figure], [{ ...card, source: 'other' }], [source], {}).join()).toMatch(/another source/);
  });

  it('finds missing or extra words, and texts of a figure that does not exist', () => {
    expect(figureProblems([figure], [card], [source], { uk: words({ '1': 'Північ' }) }).join()).toMatch(/1 words, the figure has 2/);
    expect(figureProblems([figure], [card], [source], { uk: { figures: { 'sample-figure': { title: 'T', labels: {} } } } }).join()).toMatch(/no description/);
    expect(figureProblems([], [], [source], { uk: words({}) }).join()).toMatch(/unknown figure sample-figure/);
  });

  it('refuses a file that is not a PNG in a folder, and a word twice', () => {
    expect(figureProblems([{ ...figure, file: 'figure.jpg' }], [card], [source], {}).join()).toMatch(/<folder>\/<name>\.png/);
    expect(figureProblems([{ ...figure, labels: ['Peg', 'Peg'] }], [card], [source], {}).join()).toMatch(/a word twice/);
  });
});
