import { expect, it } from 'vitest';
import { isSection, SECTION_IDS } from './sections.ts';

it('keeps the approved order of the sections: help first, makeshift tools last', () => {
  expect(SECTION_IDS).toEqual(['help', 'firstAid', 'dangers', 'water', 'fire', 'shelter', 'orientation', 'tools']);
  expect(new Set(SECTION_IDS).size).toBe(SECTION_IDS.length);
});

it('knows its own sections and nothing else', () => {
  expect(isSection('water')).toBe(true);
  expect(isSection('desert')).toBe(false);
});
