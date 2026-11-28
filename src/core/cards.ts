// The cards of the guide: in which section, after which source. Their words are texts of the dictionaries
// (`cards.<id>`): a title, the steps, when the method works, how reliable it is, where people go wrong — a
// card without the last three is no card (the owner's rules of 26.11). The sentences of the source each card
// is written after are in docs/topics/<section>.md.
import extra from '#extra';
import file from '../data/cards.json';
import { isSection, type SectionId } from './sections.ts';
import type { Source, SourceNote } from './sources.ts';

export interface Card {
  id: string;
  section: SectionId;
  /** The id of its source (src/data/sources.json). */
  source: string;
  /** Notes of its own over the card: where its words differ from the source (CARD_NOTES). */
  notes?: CardNote[];
  /**
   * Health advice outside the first-aid section (a tick, a bite, a sting): like first aid, it says it is not a
   * substitute for a doctor, shows the emergency numbers, and its steps are word for word in its source's language.
   */
  medical?: true;
  /** Pictures of its source shown under its steps (src/data/figures.json). */
  figures?: string[];
}

/**
 * "usNumber": the source gives the U.S. emergency number (911); the card refers to the numbers of the person's
 * country. "metric": the source gives U.S. units; the metric ones in brackets are our conversion after NIST
 * (decision of 28.11; src/core/units.ts).
 */
export const CARD_NOTES = ['usNumber', 'metric'] as const;
export type CardNote = (typeof CARD_NOTES)[number];

export const CARDS: readonly Card[] = [...(file.cards as Card[]), ...(extra.cards as Card[])];

/**
 * Words of cards that are not in the dictionaries: only the sample card of the test build (src/data/extra-sample.json,
 * npm run audit) has any; the app's own build has none.
 */
export const EXTRA_WORDS: Readonly<Record<string, unknown>> = extra.words;

export function cardsOf(section: SectionId): Card[] {
  return CARDS.filter((card) => card.section === section);
}

/** One step of a card: its words, and the points under it, if it has any (what to tell the dispatcher…). */
export interface CardStep {
  text: string;
  items: string[];
}

/** The words of a card in one language. */
export interface CardText {
  title: string;
  steps: CardStep[];
  works: string;
  reliability: string;
  mistakes: string;
}

type Tree = { [key: string]: unknown };
const isTree = (value: unknown): value is Tree => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value : null);

/** Texts keyed "1", "2", … with no gap, in the order of the numbers; a string — what is wrong. */
function numbered(tree: Tree, what: string): string[] | string {
  const list: string[] = [];
  for (let n = 1; n <= Object.keys(tree).length; n++) {
    const one = text(tree[String(n)]);
    if (!one) return `${what} ${n} is missing or empty`;
    list.push(one);
  }
  return list;
}

/**
 * The words of card `id` in a dictionary, or why they cannot be read. The steps are keyed "1", "2", … with no
 * gap, so their order is the order of the numbers. A step is a text, or { text, items } where items are keyed
 * the same way.
 */
export function cardText(dictionary: unknown, id: string): CardText | string {
  const cards = isTree(dictionary) ? dictionary.cards : undefined;
  const own = isTree(cards) ? cards[id] : undefined;
  if (!isTree(own)) return 'no texts';
  const steps = isTree(own.steps) ? own.steps : {};
  const list: CardStep[] = [];
  for (let n = 1; n <= Object.keys(steps).length; n++) {
    const step = steps[String(n)];
    if (isTree(step)) {
      const words = text(step.text);
      const items = isTree(step.items) ? numbered(step.items, `step ${n}, point`) : [];
      if (!words) return `step ${n} is missing or empty`;
      if (typeof items === 'string') return items;
      if (!items.length) return `step ${n} has no points`;
      const extra = Object.keys(step).filter((key) => key !== 'text' && key !== 'items');
      if (extra.length) return `step ${n}: unknown parts: ${extra.join(', ')}`;
      list.push({ text: words, items });
      continue;
    }
    const words = text(step);
    if (!words) return `step ${n} is missing or empty`;
    list.push({ text: words, items: [] });
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
    for (const note of card.notes ?? []) if (!(CARD_NOTES as readonly string[]).includes(note)) out.push(`${at}: unknown note ${note}`);
    if (card.medical !== undefined && card.medical !== true) out.push(`${at}: "medical" is true or left out`);
    const shapes = new Set<string>();
    for (const [lang, dictionary] of Object.entries(dictionaries)) {
      const words = cardText(dictionary, card.id);
      if (typeof words === 'string') out.push(`${at} (${lang}): ${words}`);
      else shapes.add(words.steps.map((step) => step.items.length).join(','));
    }
    if (shapes.size > 1) out.push(`${at}: the languages have different numbers of steps or points`);
  }
  // Texts of cards that do not exist would never be shown, nor checked.
  for (const [lang, dictionary] of Object.entries(dictionaries)) {
    const texts = isTree(dictionary) && isTree(dictionary.cards) ? Object.keys(dictionary.cards) : [];
    for (const id of texts) if (!seen.has(id)) out.push(`texts of an unknown card ${id} (${lang})`);
  }
  return out;
}

export type NoticeKey = 'notDoctor' | 'emergency' | 'translation' | SourceNote | CardNote;

/** First aid, and health advice in other sections: the cards the owner's rule on first aid holds for. */
export const isMedical = (card: Card): boolean => card.section === 'firstAid' || card.medical === true;

/**
 * The notes a card shows above its words, in this order: first aid and other health advice — "not a substitute
 * for a doctor"; these and calling for help — the emergency numbers of the person's country; a card in another
 * language than its source — "translation"; a source that asks for a note of its own — that note; then the
 * card's own notes.
 */
export function cardNotices(card: Card, source: Source, lang: string): NoticeKey[] {
  const out: NoticeKey[] = [];
  if (isMedical(card)) out.push('notDoctor');
  if (isMedical(card) || card.section === 'help') out.push('emergency');
  if (source.lang !== lang) out.push('translation');
  if (source.note) out.push(source.note);
  out.push(...(card.notes ?? []));
  return out;
}
