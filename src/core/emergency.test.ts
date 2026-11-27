import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { EMERGENCY, emergencyProblems, numbersOf, sourcesOf, type CountryNumbers } from './emergency.ts';
import { SOURCES } from './sources.ts';
import { normalize } from './topics.ts';

const root = (path: string) => fileURLToPath(new URL(`../../${path}`, import.meta.url));
const decided = JSON.parse(readFileSync(root('scripts/emergency/countries.json'), 'utf8')) as { countries: { code: string; skip?: string }[] };
const kept = (id: string) => normalize(readFileSync(root(`docs/sources/${id}.txt`), 'utf8'));

describe('the emergency numbers of the app', () => {
  it('are in order: known sources and services, short numbers, each written in its own sentence', () => {
    expect(emergencyProblems(EMERGENCY, SOURCES)).toEqual([]);
  });

  it('every sentence is word for word in the kept text of its source', () => {
    for (const country of EMERGENCY) for (const line of country.lines) expect(kept(line.source).includes(normalize(line.quote)), `${country.code}: «${line.quote}»`).toBe(true);
  });

  it('cover exactly the countries decided on 27.11, except those without a source', () => {
    const wanted = decided.countries.filter((c) => !c.skip).map((c) => c.code).sort();
    expect(EMERGENCY.map((c) => c.code).sort()).toEqual(wanted);
  });

  it('give the Commission\'s 112 only to the member states that the EU\'s own list names', () => {
    const list = readFileSync(root('docs/sources/eu-countries.txt'), 'utf8').split('\n');
    const english = new Intl.DisplayNames(['en'], { type: 'region' });
    const member = (code: string) => list.some((line, i) => line === english.of(code) && /^EU Member State since/.test(list[i + 1] ?? ''));
    for (const country of EMERGENCY) if (country.lines.some((line) => line.source === 'ec-112')) expect(member(country.code), country.code).toBe(true);
    expect(list.filter((line) => /^EU Member State since/.test(line))).toHaveLength(EMERGENCY.filter((c) => member(c.code)).length);
  });

  it('every country has its name in each language of the app', () => {
    for (const lang of ['uk', 'hu', 'en']) {
      const names = new Intl.DisplayNames([lang], { type: 'region' });
      for (const country of EMERGENCY) expect(names.of(country.code), `${lang} ${country.code}`).not.toBe(country.code);
    }
  });

  it('Ukraine: the order of the Ministry of Health with 112 first, then the numbers of GOV.UK', () => {
    expect(sourcesOf(numbersOf('UA') as CountryNumbers)).toEqual(['moz-441', 'govuk-ukraine']);
  });
});

describe('the check of numbers', () => {
  const sample: CountryNumbers = { code: 'AA', lines: [{ source: 'ec-112', quote: 'Telephone: 112 (ambulance)', services: ['ambulance'], numbers: [{ dial: '112', from: null }] }] };
  const sources = SOURCES.filter((s) => s.id === 'ec-112');

  it('passes a country in order', () => {
    expect(emergencyProblems([sample], sources)).toEqual([]);
  });

  it('finds a number that its sentence does not have, an unknown source and a country twice', () => {
    const line = sample.lines[0]!;
    expect(emergencyProblems([{ ...sample, lines: [{ ...line, numbers: [{ dial: '11', from: null }] }] }], sources).join()).toMatch(/11 is not in/);
    expect(emergencyProblems([{ ...sample, lines: [{ ...line, source: 'none' }] }], sources).join()).toMatch(/unknown source/);
    expect(emergencyProblems([sample, sample], sources).join()).toMatch(/twice/);
  });

  it('refuses a line with no service or no number', () => {
    const line = sample.lines[0]!;
    expect(emergencyProblems([{ ...sample, lines: [{ ...line, services: [] }] }], sources).join()).toMatch(/names no service/);
    expect(emergencyProblems([{ ...sample, lines: [{ ...line, numbers: [] }] }], sources).join()).toMatch(/has no number/);
  });
});
