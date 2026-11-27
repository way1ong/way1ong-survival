// The cards of the guide: in which section, after which source. Their words are texts of the dictionaries
// (`cards.<id>`): a title, the steps, when the method works, how reliable it is, where people go wrong — a
// card without the last three is no card (the owner's rules of 26.11). The sentences of the source each card
// is written after are in docs/topics/<section>.md.
import file from '../data/cards.json';
import { isSection, type SectionId } from './sections.ts';
import type { Source } from './sources.ts';

export interface Card {
  id: string;
  section: SectionId;
  /** The id of its source (src/data/sources.json). */
  source: string;
}

export const CARDS: readonly Card[] = file.cards as Card[];

export function cardsOf(section: SectionId): Card[] {
  return CARDS.filter((card) => card.section === section);
}

/** The words of a card in one language. */
export interface CardText {
  title: string;
  steps: string[];
  works: string;
  reliability: string;
  mistakes: string;
}

type Tree = { [key: string]: unknown };
const isTree = (value: unknown): value is Tree => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value : null);

/**
 * The words of card `id` in a dictionary, or why they cannot be read. The steps are keyed "1", "2", … with no
 * gap, so their order is the order of the numbers.
 */
export function cardText(dictionary: unknown, id: string): CardText | string {
  const cards = isTree(dictionary) ? dictionary.cards : undefined;
  const own = isTree(cards) ? cards[id] : undefined;
  if (!isTree(own)) return 'no texts';
  const steps = isTree(own.steps) ? own.steps : {};
  const keys = Object.keys(steps);
  const list: string[] = [];
  for (let n = 1; n <= keys.length; n++) {
    const step = text(steps[String(n)]);
    if (!step) return `step ${n} is missing or empty`;
    list.push(step);
  }
  if (!list.length) return 'no steps';
  const title = text(own.title);
  const works = text(own.works);
  const reliability = text(own.reliability);
  const mistakes = text(own.mistakes);
  if (!title) return 'no title';
  if (!works) return 'no "when it works"';
  if (!reliability) return 'no "how reliable"';
  if (!mistakes) return 'no "where people go wrong"';
  const extra = Object.keys(own).filter((key) => !['title', 'steps', 'works', 'reliability', 'mistakes'].includes(key));
  if (extra.length) return `unknown parts: ${extra.join(', ')}`;
  return { title, steps: list, works, reliability, mistakes };
}

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** What is wrong with the cards; empty — nothing. `dictionaries` — language → dictionary. */
export function cardProblems(cards: readonly Card[], sources: readonly Source[], dictionaries: Record<string, unknown>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const card of cards) {
    const at = `card ${card.id}`;
    if (!ID.test(card.id)) out.push(`${at}: the id is not lower-case words joined by "-"`);
    if (seen.has(card.id)) out.push(`${at}: twice`);
    seen.add(card.id);
    if (!isSection(card.section)) out.push(`${at}: unknown section ${card.section}`);
    if (!sources.some((s) => s.id === card.source)) out.push(`${at}: unknown source ${card.source}`);
    const counts = new Set<number>();
    for (const [lang, dictionary] of Object.entries(dictionaries)) {
      const words = cardText(dictionary, card.id);
      if (typeof words === 'string') out.push(`${at} (${lang}): ${words}`);
      else counts.add(words.steps.length);
    }
    if (counts.size > 1) out.push(`${at}: the languages have different numbers of steps`);
  }
  // Texts of cards that do not exist would never be shown, nor checked.
  for (const [lang, dictionary] of Object.entries(dictionaries)) {
    const texts = isTree(dictionary) && isTree(dictionary.cards) ? Object.keys(dictionary.cards) : [];
    for (const id of texts) if (!seen.has(id)) out.push(`texts of an unknown card ${id} (${lang})`);
  }
  return out;
}

export type NoticeKey = 'notDoctor' | 'call112' | 'translation' | 'usArmy';

/**
 * The notes a card shows above its words, in this order: first aid — "not a substitute for a doctor" and the
 * emergency number; a card in another language than its source — "translation"; a source that asks for a note
 * of its own — that note.
 */
export function cardNotices(card: Card, source: Source, lang: string): NoticeKey[] {
  const out: NoticeKey[] = [];
  if (card.section === 'firstAid') out.push('notDoctor', 'call112');
  if (source.lang !== lang) out.push('translation');
  if (source.note === 'usArmy') out.push('usArmy');
  return out;
}
