// Emergency numbers by country (decision of 27.11: the countries of Europe, the person chooses one). Every line
// is a sentence of its source word for word, with the numbers and services read from it
// (scripts/emergency/build.mjs); src/core/emergency.test.ts checks each against the kept text of its source.
import file from '../data/emergency.json';
import type { Source } from './sources.ts';

export const SERVICES = ['all', 'general', 'european', 'ambulance', 'fire', 'police', 'mountainRescue', 'rescue', 'deaf'] as const;
export type Service = (typeof SERVICES)[number];

export interface EmergencyNumber {
  /** What to dial: digits only. */
  dial: string;
  /** Only from this kind of phone; null — from any. */
  from: 'mobile' | 'landline' | null;
}

export interface EmergencyLine {
  source: string;
  /** The sentence of the source, word for word. */
  quote: string;
  services: Service[];
  numbers: EmergencyNumber[];
}

export interface CountryNumbers {
  /** ISO 3166-1 alpha-2 (XK — Kosovo, as the browsers' region names have it). */
  code: string;
  lines: EmergencyLine[];
}

export const EMERGENCY: readonly CountryNumbers[] = file.countries as CountryNumbers[];

export function numbersOf(code: string | null): CountryNumbers | undefined {
  return code === null ? undefined : EMERGENCY.find((country) => country.code === code);
}

/** The sources of a country's lines, each once, in the order of the lines. */
export function sourcesOf(country: CountryNumbers): string[] {
  return [...new Set(country.lines.map((line) => line.source))];
}

/** What is wrong with the numbers; empty — nothing. */
export function emergencyProblems(countries: readonly CountryNumbers[], sources: readonly Source[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const country of countries) {
    const at = `country ${country.code}`;
    if (!/^[A-Z]{2}$/.test(country.code)) out.push(`${at}: not a two-letter code`);
    if (seen.has(country.code)) out.push(`${at}: twice`);
    seen.add(country.code);
    if (!country.lines.length) out.push(`${at}: no numbers`);
    for (const line of country.lines) {
      if (!sources.some((source) => source.id === line.source)) out.push(`${at}: unknown source ${line.source}`);
      if (!line.services.length) out.push(`${at}: «${line.quote}» names no service`);
      for (const service of line.services) if (!(SERVICES as readonly string[]).includes(service)) out.push(`${at}: unknown service ${service}`);
      if (!line.numbers.length) out.push(`${at}: «${line.quote}» has no number`);
      for (const number of line.numbers) {
        if (!/^\d{2,4}$/.test(number.dial)) out.push(`${at}: «${number.dial}» is not a short emergency number`);
        if (number.from !== null && number.from !== 'mobile' && number.from !== 'landline') out.push(`${at}: unknown kind of phone ${String(number.from)}`);
        // The number is written in the sentence itself, as a number of its own.
        if (!new RegExp(`(^|\\D)${number.dial}(\\D|$)`).test(line.quote)) out.push(`${at}: ${number.dial} is not in «${line.quote}»`);
      }
    }
  }
  return out;
}
