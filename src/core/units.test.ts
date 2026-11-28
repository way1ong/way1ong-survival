import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import en from '../i18n/en.json';
import hu from '../i18n/hu.json';
import uk from '../i18n/uk.json';
import { CARDS, cardText, type CardText } from './cards.ts';
import { sourceById } from './sources.ts';
import { normalize } from './topics.ts';
import { conversionProblems, numbersIn, UNITS } from './units.ts';

const kept = (id: string) => readFileSync(fileURLToPath(new URL(`../../docs/sources/${id}.txt`, import.meta.url)), 'utf8');
const all = (words: CardText) => [words.title, ...words.steps.flatMap((step) => [step.text, ...step.items]), words.works, words.reliability, words.mistakes].join('\n');

describe('the conversion factors', () => {
  const nist = kept('nist-sp811-b8').split('\n');
  for (const [name, unit] of Object.entries(UNITS)) {
    it(`${name}: is NIST's row, with NIST's number`, () => {
      expect(nist).toContain(unit.nist);
      const factor = /\| ([\d. ]+) E([+-]\d+)/.exec(unit.nist);
      if (factor) expect(unit.convert(1)).toBeCloseTo(Number(factor[1]?.replace(/ /g, '')) * 10 ** Number(factor[2]), 9);
      else {
        // The one formula of the table: t/°C = (t/°F - 32)/1.8.
        expect(unit.nist).toContain('t/°C = (t/°F - 32)/1.8');
        expect(unit.convert(212)).toBeCloseTo(100, 9);
        expect(unit.convert(32)).toBeCloseTo(0, 9);
      }
    });
  }
});

describe('the cards after the U.S. Army manual', () => {
  // Their numbers are written in digits in every language, and the metric values are NIST's conversions.
  const army = CARDS.filter((card) => sourceById(card.source)?.note === 'usArmy' && !card.id.startsWith('sample-'));
  it('there are such cards', () => {
    expect(army.length).toBeGreaterThan(0);
  });
  for (const card of army) {
    it(`${card.id}: every U.S. unit has its metric value, and the note says where it comes from`, () => {
      const words = cardText(en, card.id) as CardText;
      const text = all(words);
      expect(conversionProblems(text, normalize(kept(card.source)))).toEqual([]);
      const converts = /\d\s*(?:feet|foot|ft|inches|inch|quarts?|°F)\b/.test(text);
      expect(card.notes?.includes('metric') ?? false, 'the note "metric"').toBe(converts);
    });
    it(`${card.id}: the same numbers in every language`, () => {
      const numbers = Object.entries({ en, uk, hu }).map(([lang, dictionary]) => numbersIn(all(cardText(dictionary, card.id) as CardText), lang));
      expect(numbers[1]).toEqual(numbers[0]);
      expect(numbers[2]).toEqual(numbers[0]);
    });
  }
});

describe('the check of conversions', () => {
  it('passes NIST\'s conversion, rounded as written, and a range', () => {
    expect(conversionProblems('above 8,000 feet (2,438 m)', '')).toEqual([]);
    expect(conversionProblems('2 to 3 quarts (1.9–2.8 l) a day at 68 °F (20 °C)', '')).toEqual([]);
  });

  it('finds a missing or wrong metric value, and takes the source\'s own words', () => {
    expect(conversionProblems('above 8,000 feet', '')).toEqual(['«8,000 feet» has no metric value in brackets']);
    expect(conversionProblems('above 8,000 feet (2,500 m)', '').join()).toMatch(/not NIST's conversion/);
    expect(conversionProblems('1 quart (1 m)', '').join()).toMatch(/l, not m/);
    expect(conversionProblems('3 feet (1 meter)', '')).toEqual(['«3 feet» has no metric value in brackets']);
    expect(conversionProblems('24 inches (60 cm)', '')).not.toEqual([]);
    expect(conversionProblems('24 inches (60 cm)', 'dig 24 inches (60 cm) deep')).toEqual([]);
  });

  it('reads the numbers of each language', () => {
    expect(numbersIn('8,000 feet (2,438 m), 0.95 l, 2 to 3', 'en')).toEqual([0.95, 2, 3, 2438, 8000]);
    expect(numbersIn('8000 футів (2438 м), 0,95 л, від 2 до 3', 'uk')).toEqual([0.95, 2, 3, 2438, 8000]);
  });
});
