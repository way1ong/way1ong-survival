import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import en from '../i18n/en.json';
import hu from '../i18n/hu.json';
import uk from '../i18n/uk.json';
import { CARDS, cardNotices, cardProblems, cardText, isMedical, stepSourceOf, type Card } from './cards.ts';
import { SOURCES, sourceById, type Source } from './sources.ts';
import { verbatimIn } from './topics.ts';

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
  series: null,
});
const card: Card = { id: 'sample-card', section: 'water', source: 'sample-en' };
const words = (steps: Record<string, string>) => ({ cards: { 'sample-card': { title: 'T', steps, works: 'W', reliability: 'R', mistakes: 'M' } } });

describe('the cards of the app', () => {
  it('are all in order: a known section and source, every part of the words in every language', () => {
    expect(cardProblems(CARDS, SOURCES, { uk, hu, en })).toEqual([]);
    expect(CARDS.every((card) => !card.id.startsWith('sample-'))).toBe(true);
  });
});

describe('first aid, other health advice and CDC in the language of the source', () => {
  // The owner's rule of 26.11: first aid word for word after the official guidance — and so the other health
  // advice ("medical" cards). CDC's terms: "You may not change the substantive content of the materials". Every
  // step and every point of such a card, in the source's own language, is a passage of the kept text of the source.
  const dictionaries: Record<string, unknown> = { en, hu, uk };
  const checked = CARDS.filter((card) => (isMedical(card) || sourceById(card.source)?.note === 'cdc') && !card.id.startsWith('sample-'));
  it('there are first-aid, health and CDC cards to check', () => {
    expect(checked.filter((card) => card.section === 'firstAid').length).toBeGreaterThan(0);
    expect(checked.filter((card) => card.section !== 'firstAid').length).toBeGreaterThan(0);
  });
  for (const card of checked) {
    it(`${card.id}: every step and point is word for word in its source`, () => {
      // A step after another source than the card's (stepSources) is checked in that source's language.
      const own = cardText(dictionaries[(sourceById(card.source) as Source).lang], card.id);
      expect(typeof own, card.id).toBe('object');
      if (typeof own === 'string') return;
      own.steps.forEach((_, i) => {
        const source = sourceById(stepSourceOf(card, i + 1)) as Source;
        const kept = readFileSync(fileURLToPath(new URL(`../../docs/sources/${source.id}.txt`, import.meta.url)), 'utf8');
        const words = cardText(dictionaries[source.lang], card.id);
        expect(typeof words, `${card.id} (${source.lang})`).toBe('object');
        if (typeof words === 'string') return;
        const step = words.steps[i];
        if (!step) return;
        expect(verbatimIn(step.text, kept), step.text).toBe(true);
        for (const item of step.items) expect(verbatimIn(item, kept), item).toBe(true);
      });
    });
  }
});

describe('the words of a card', () => {
  it('are read with the steps in the order of their numbers', () => {
    expect(cardText(words({ '2': 'B', '1': 'A' }), 'sample-card')).toEqual({ title: 'T', steps: [{ text: 'A', items: [] }, { text: 'B', items: [] }], works: 'W', reliability: 'R', mistakes: 'M' });
  });

  it('are refused without "when it works", "how reliable" or "where people go wrong"', () => {
    for (const part of ['works', 'reliability', 'mistakes']) {
      const dictionary = words({ '1': 'A' });
      delete (dictionary.cards['sample-card'] as Record<string, unknown>)[part];
      expect(typeof cardText(dictionary, 'sample-card'), part).toBe('string');
    }
  });

  it('read the points under a step in the order of their numbers', () => {
    const dictionary = words({ '1': { text: 'Call', items: { '2': 'b', '1': 'a' } } } as unknown as Record<string, string>);
    expect((cardText(dictionary, 'sample-card') as { steps: unknown }).steps).toEqual([{ text: 'Call', items: ['a', 'b'] }]);
    expect(cardText(words({ '1': { text: 'Call', items: {} } } as unknown as Record<string, string>), 'sample-card')).toMatch(/no points/);
    expect(cardText(words({ '1': { text: 'Call', items: { '2': 'b' } } } as unknown as Record<string, string>), 'sample-card')).toMatch(/point 1/);
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
    const pointed = (n: number) => words({ '1': { text: 'A', items: Object.fromEntries(Array.from({ length: n }, (_, i) => [String(i + 1), 'x'])) } } as unknown as Record<string, string>);
    expect(cardProblems([card], sources, { en: pointed(2), uk: pointed(3) }).join()).toMatch(/steps or points/);
  });

  it('finds a note nobody knows', () => {
    expect(cardProblems([{ ...card, notes: ['other'] } as unknown as Card], sources, { en: words({ '1': 'A' }) }).join()).toMatch(/unknown note other/);
  });

  it('takes "medical" only as true', () => {
    expect(cardProblems([{ ...card, medical: true }], sources, { en: words({ '1': 'A' }) })).toEqual([]);
    expect(cardProblems([{ ...card, medical: false } as unknown as Card], sources, { en: words({ '1': 'A' }) }).join()).toMatch(/"medical" is true or left out/);
  });

  it('takes a step after another source only from a known source other than the card\'s, and only for a step there is', () => {
    const two = [source('en'), source('hu')];
    expect(cardProblems([{ ...card, stepSources: { '1': 'sample-hu' } }], two, { en: words({ '1': 'A' }) })).toEqual([]);
    expect(cardProblems([{ ...card, stepSources: { '1': 'none' } }], two, { en: words({ '1': 'A' }) }).join()).toMatch(/step 1: unknown source none/);
    expect(cardProblems([{ ...card, stepSources: { '1': 'sample-en' } }], two, { en: words({ '1': 'A' }) }).join()).toMatch(/step 1: its own source is the card's/);
    expect(cardProblems([{ ...card, stepSources: { '2': 'sample-hu' } }], two, { en: words({ '1': 'A' }) }).join()).toMatch(/step 2 has a source of its own but no words/);
    expect(cardProblems([{ ...card, stepSources: { '0': 'sample-hu' } }], two, { en: words({ '1': 'A' }) }).join()).toMatch(/step 0 has a source of its own but no words/);
  });

  it('finds texts of a card that does not exist', () => {
    expect(cardProblems([], sources, { en: words({ '1': 'A' }) }).join()).toMatch(/unknown card sample-card/);
  });
});

describe('the source of a step', () => {
  it('is the step\'s own, if it has one, else the card\'s', () => {
    const mixed: Card = { ...card, stepSources: { '2': 'sample-hu' } };
    expect([1, 2, 3].map((n) => stepSourceOf(mixed, n))).toEqual(['sample-en', 'sample-hu', 'sample-en']);
    expect(stepSourceOf(card, 2)).toBe('sample-en');
  });
});

describe('the notes over a card', () => {
  it('first aid: not a substitute for a doctor, then the emergency numbers', () => {
    expect(cardNotices({ ...card, section: 'firstAid', source: 'sample-uk' }, source('uk'), 'uk')).toEqual(['notDoctor', 'emergency']);
  });

  it('a card in another language than its source says it is a translation', () => {
    expect(cardNotices({ ...card, section: 'firstAid', source: 'sample-uk' }, source('uk'), 'hu')).toEqual(['notDoctor', 'emergency', 'translation']);
    expect(cardNotices(card, source('en'), 'en')).toEqual([]);
  });

  it('calling for help: the emergency numbers, and the card\'s own notes last', () => {
    expect(cardNotices({ ...card, section: 'help', notes: ['usNumber'] }, source('en'), 'en')).toEqual(['emergency', 'usNumber']);
    expect(cardNotices({ ...card, section: 'help', notes: ['usNumber'] }, source('en'), 'uk')).toEqual(['emergency', 'translation', 'usNumber']);
  });

  it('a card after a U.S. Army manual says so, in every language', () => {
    expect(cardNotices(card, source('en', 'usArmy'), 'en')).toEqual(['usArmy']);
    expect(cardNotices(card, source('en', 'usArmy'), 'uk')).toEqual(['translation', 'usArmy']);
  });

  it('health advice outside first aid: not a substitute for a doctor and the emergency numbers, as first aid', () => {
    expect(cardNotices({ ...card, section: 'dangers', medical: true }, source('en'), 'en')).toEqual(['notDoctor', 'emergency']);
    expect(cardNotices({ ...card, section: 'dangers' }, source('en'), 'en')).toEqual([]);
  });

  it('a card after CDC carries the words CDC\'s terms ask for, after "translation"', () => {
    expect(cardNotices({ ...card, section: 'dangers', medical: true }, source('en', 'cdc'), 'hu')).toEqual(['notDoctor', 'emergency', 'translation', 'cdc']);
    expect(cardNotices({ ...card, section: 'dangers' }, source('en', 'cdc'), 'en')).toEqual(['cdc']);
  });
});
