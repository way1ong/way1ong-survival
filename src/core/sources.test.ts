import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { sourceProblems, SOURCES, type Source } from './sources.ts';

const kept = (id: string) => fileURLToPath(new URL(`../../docs/sources/${id}.txt`, import.meta.url));

/** A made-up source for the checks below — not a real one. */
const sample: Source = {
  id: 'sample-source',
  title: 'Sample',
  publisher: 'Nobody',
  url: 'https://example.org/sample',
  lang: 'en',
  version: '1',
  read: '2026-11-27',
  licence: { kind: 'cc-by-4.0', url: 'https://creativecommons.org/licenses/by/4.0/', quote: 'Sample words of a licence.' },
  attribution: 'Sample credit',
  note: null,
  series: null,
};

describe('the sources of the app', () => {
  it('are all in order: an address, a language, a version, a date, a licence the app may use', () => {
    expect(sourceProblems(SOURCES)).toEqual([]);
  });

  it('each has its text kept in docs/sources/', () => {
    for (const source of SOURCES) {
      expect(existsSync(kept(source.id)), source.id).toBe(true);
      expect(readFileSync(kept(source.id), 'utf8').trim().length, source.id).toBeGreaterThan(0);
    }
  });
});

describe('the check of sources', () => {
  it('passes a source in order', () => {
    expect(sourceProblems([sample])).toEqual([]);
  });

  it('refuses a licence that is not on the list — "non-commercial only" among them', () => {
    const bad = { ...sample, licence: { ...sample.licence, kind: 'cc-by-nc-4.0' } } as unknown as Source;
    expect(sourceProblems([bad]).join()).toMatch(/a licence the app may not use/);
  });

  it('asks for the credit a licence wants, and for the licence\'s own words', () => {
    expect(sourceProblems([{ ...sample, attribution: null }]).join()).toMatch(/asks for credit/);
    expect(sourceProblems([{ ...sample, licence: { ...sample.licence, quote: ' ' } }]).join()).toMatch(/own words/);
  });

  it('knows the notes a source may ask for', () => {
    expect(sourceProblems([{ ...sample, note: 'cdc' }])).toEqual([]);
    expect(sourceProblems([{ ...sample, note: 'usArmy' }])).toEqual([]);
    expect(sourceProblems([{ ...sample, note: 'other' } as unknown as Source]).join()).toMatch(/unknown note other/);
  });

  it('knows the series a source belongs to', () => {
    expect(sourceProblems([{ ...sample, series: 'none' }], {}).join()).toMatch(/unknown series/);
    expect(sourceProblems([{ ...sample, series: 'one' }], { one: { title: 'T', publisher: 'P', url: 'https://example.org' } })).toEqual([]);
  });

  it('refuses a source without https, with an unknown language or a bad date, or twice', () => {
    expect(sourceProblems([{ ...sample, url: 'http://example.org' }]).join()).toMatch(/https/);
    expect(sourceProblems([{ ...sample, lang: 'de' } as unknown as Source]).join()).toMatch(/unknown language/);
    expect(sourceProblems([{ ...sample, read: '27.11.2026' }]).join()).toMatch(/YYYY-MM-DD/);
    expect(sourceProblems([sample, sample]).join()).toMatch(/twice/);
  });
});
