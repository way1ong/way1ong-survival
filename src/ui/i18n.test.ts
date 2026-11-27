import { expect, it } from 'vitest';
import { fmt, LANGS, pickLang } from './i18n.ts';

it('offers the three languages in the decided order', () => {
  expect(LANGS).toEqual(['uk', 'hu', 'en']);
});

it('keeps the saved language, else takes the browser\'s, else English', () => {
  expect(pickLang('hu', ['uk-UA'])).toBe('hu');
  expect(pickLang(null, ['de-DE', 'uk-UA'])).toBe('uk');
  expect(pickLang('xx', ['de-DE'])).toBe('en');
});

it('fills in parameters and leaves unknown ones', () => {
  expect(fmt('{a} and {b}', { a: 1 })).toBe('1 and {b}');
});
