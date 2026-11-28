// The sources the app's advice is written after: where each is, in which language it was written, which version
// was read and when, and the words of its licence (docs/SOURCES.md). The text of every source is kept in
// docs/sources/<id>.txt, so the sentences under each card can be checked against it.
import extra from '#extra';
import file from '../data/sources.json';
import { isLicenceKind, LICENCE_KINDS, type LicenceKind } from './licences.ts';

export const SOURCE_LANGS = ['uk', 'hu', 'en'] as const;
export type SourceLang = (typeof SOURCE_LANGS)[number];

/**
 * Notes a source asks every card after it to show: "usArmy" — after a U.S. Army manual; "cdc" — the words CDC's
 * terms ask for (https://www.cdc.gov/other/agencymaterials.html): the source is CDC, CDC does not endorse the
 * app, the material is free on CDC's website.
 */
export const SOURCE_NOTES = ['usArmy', 'cdc'] as const;
export type SourceNote = (typeof SOURCE_NOTES)[number];

export interface Source {
  id: string;
  /** The source's own title, in its own language. */
  title: string;
  publisher: string;
  url: string;
  /** The language it was written in: a card in any other language is a translation and says so. */
  lang: SourceLang;
  /** The version or date the source states for itself. */
  version: string;
  /** When the source and its licence were read (YYYY-MM-DD). */
  read: string;
  licence: { kind: LicenceKind; url: string; quote: string };
  /** The credit the licence asks for; null — none asked. */
  attribution: string | null;
  /** A note every card after this source shows (SOURCE_NOTES); null — none. */
  note: SourceNote | null;
  /** The series of pages it belongs to (shown once in "About"); null — none. */
  series: string | null;
}

/** A series of pages of one publisher, such as the travel advice of GOV.UK: one line in "About". */
export interface Series {
  title: string;
  publisher: string;
  url: string;
}

export const SERIES: Readonly<Record<string, Series>> = file.series;
export const SOURCES: readonly Source[] = [...(file.sources as Source[]), ...(extra.sources as Source[])];

export function sourceById(id: string): Source | undefined {
  return SOURCES.find((one) => one.id === id);
}

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** What is wrong with the list of sources; empty — nothing. */
export function sourceProblems(sources: readonly Source[], series: Readonly<Record<string, Series>> = SERIES): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const s of sources) {
    const at = `source ${s.id}`;
    if (!ID.test(s.id)) out.push(`${at}: the id is not lower-case words joined by "-"`);
    if (seen.has(s.id)) out.push(`${at}: twice`);
    seen.add(s.id);
    for (const field of ['title', 'publisher', 'version'] as const) if (!s[field]?.trim()) out.push(`${at}: no ${field}`);
    if (!s.url?.startsWith('https://')) out.push(`${at}: the address is not https`);
    if (!(SOURCE_LANGS as readonly string[]).includes(s.lang)) out.push(`${at}: unknown language ${s.lang}`);
    if (!DATE.test(s.read ?? '')) out.push(`${at}: the date it was read is not YYYY-MM-DD`);
    if (!s.licence || !isLicenceKind(s.licence.kind)) out.push(`${at}: a licence the app may not use (${s.licence?.kind})`);
    else {
      if (!s.licence.url?.startsWith('https://')) out.push(`${at}: the licence's address is not https`);
      if (!s.licence.quote?.trim()) out.push(`${at}: the licence's own words are missing`);
      if (LICENCE_KINDS[s.licence.kind].credit && !s.attribution?.trim()) out.push(`${at}: the licence asks for credit, and there is none`);
    }
    if (s.note !== null && !(SOURCE_NOTES as readonly string[]).includes(s.note)) out.push(`${at}: unknown note ${String(s.note)}`);
    if (s.series !== null && !Object.hasOwn(series, s.series)) out.push(`${at}: unknown series ${String(s.series)}`);
  }
  return out;
}
