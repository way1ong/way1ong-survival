import { describe, expect, it } from 'vitest';
import en from '../i18n/en.json';
import hu from '../i18n/hu.json';
import uk from '../i18n/uk.json';
import { CARDS, cardNotices, cardProblems, cardText, type Card } from './cards.ts';
import { SOURCES, type Source } from './sources.ts';

// Made-up cards and sources for the checks below — no advice, not real.
const source = (lang: Source['lang'], note: Source['note'] = null): Source => ({
  id: `sample-${lang}`,
  title: 'Sample',
  publisher: 'Nobody',
  url: 'https://example.org/',
  lang,
  version: '1',
  read: '2026-11-27',
  licence: { kind: 'us-government-work', url: 'https://example.org/licence', quote: 'Sample.' },
  attribution: null,
  note,
});
const card: Card = { id: 'sample-card', section: 'water', source: 'sample-en' };
const words = (steps: Record<string, string>) => ({ cards: { 'sample-card': { title: 'T', steps, works: 'W', reliability: 'R', mistakes: 'M' } } });

describe('the cards of the app', () => {
  it('are all in order: a known section and source, every part of the words in every language', () => {
    expect(cardProblems(CARDS, SOURCES, { uk, hu, en })).toEqual([]);
  });
});

describe('the words of a card', () => {
  it('are read with the steps in the order of their numbers', () => {
    expect(cardText(words({ '2': 'B', '1': 'A' }), 'sample-card')).toEqual({ title: 'T', steps: ['A', 'B'], works: 'W', reliability: 'R', mistakes: 'M' });
  });

  it('are refused without "when it works", "how reliable" or "where people go wrong"', () => {
    for (const part of ['works', 'reliability', 'mistakes']) {
      const dictionary = words({ '1': 'A' });
      delete (dictionary.cards['sample-card'] as Record<string, unknown>)[part];
      expect(typeof cardText(dictionary, 'sample-card'), part).toBe('string');
    }
  });

  it('are refused with no steps, a gap in the steps, an empty step or a part nobody knows', () => {
    expect(cardText(words({}), 'sample-card')).toBe('no steps');
    expect(cardText(words({ '1': 'A', '3': 'C' }), 'sample-card')).toMatch(/step 2/);
    expect(cardText(words({ '1': ' ' }), 'sample-card')).toMatch(/step 1/);
    const extra = words({ '1': 'A' });
    (extra.cards['sample-card'] as Record<string, unknown>).tip = 'x';
    expect(cardText(extra, 'sample-card')).toMatch(/unknown parts: tip/);
  });
});

describe('the check of cards', () => {
  const sources = [source('en')];
  it('passes a card in order', () => {
    expect(cardProblems([card], sources, { en: words({ '1': 'A' }), uk: words({ '1': 'Б' }) })).toEqual([]);
  });

  it('finds an unknown section or source, a missing language and different numbers of steps', () => {
    expect(cardProblems([{ ...card, section: 'desert' } as unknown as Card], sources, { en: words({ '1': 'A' }) }).join()).toMatch(/unknown section/);
    expect(cardProblems([{ ...card, source: 'none' }], sources, { en: words({ '1': 'A' }) }).join()).toMatch(/unknown source/);
    expect(cardProblems([card], sources, { en: words({ '1': 'A' }), hu: {} }).join()).toMatch(/\(hu\): no texts/);
    expect(cardProblems([card], sources, { en: words({ '1': 'A' }), uk: words({ '1': 'A', '2': 'B' }) }).join()).toMatch(/different numbers of steps/);
  });

  it('finds texts of a card that does not exist', () => {
    expect(cardProblems([], sources, { en: words({ '1': 'A' }) }).join()).toMatch(/unknown card sample-card/);
  });
});

describe('the notes over a card', () => {
  it('first aid: not a substitute for a doctor, then the emergency number', () => {
    expect(cardNotices({ ...card, section: 'firstAid', source: 'sample-uk' }, source('uk'), 'uk')).toEqual(['notDoctor', 'call112']);
  });

  it('a card in another language than its source says it is a translation', () => {
    expect(cardNotices({ ...card, section: 'firstAid', source: 'sample-uk' }, source('uk'), 'hu')).toEqual(['notDoctor', 'call112', 'translation']);
    expect(cardNotices(card, source('en'), 'en')).toEqual([]);
  });

  it('a card after a U.S. Army manual says so, in every language', () => {
    expect(cardNotices(card, source('en', 'usArmy'), 'en')).toEqual(['usArmy']);
    expect(cardNotices(card, source('en', 'usArmy'), 'uk')).toEqual(['translation', 'usArmy']);
  });
});
