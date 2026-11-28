// Pictures of the sources (decision of 28.11): a figure of the source as it is, with its own words printed on it,
// and under it, in any language but the source's, the translation of those words. A figure is a file of
// src/figures/, the source it comes from, its caption there (a test finds it in the kept text of the source), the
// words printed on it and its size. Its title, a description for those who cannot see it and the translation
// of its words are texts of the dictionaries (`figures.<id>`).
import file from '../data/figures.json';
import type { Card } from './cards.ts';
import type { Source } from './sources.ts';

export interface Figure {
  id: string;
  /** The id of the source it is taken from (src/data/sources.json). */
  source: string;
  /** Its file under src/figures/. */
  file: string;
  /** Its caption in the source, word for word. */
  caption: string;
  /** The words printed on it, each once, in the source's language. */
  labels: string[];
  /** Its size in pixels, so the card does not jump while it loads. */
  width: number;
  height: number;
}

export const FIGURES: readonly Figure[] = file.figures;

export function figureById(id: string): Figure | undefined {
  return FIGURES.find((one) => one.id === id);
}

/** The words of a figure in one language. */
export interface FigureText {
  title: string;
  /** What it shows, for those who cannot see it. */
  alt: string;
  /** The translation of each of its words, in the order of `labels`. */
  labels: string[];
}

type Tree = { [key: string]: unknown };
const isTree = (value: unknown): value is Tree => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value : null);

/** The words of `figure` in a dictionary, or why they cannot be read. */
export function figureText(dictionary: unknown, figure: Figure): FigureText | string {
  const figures = isTree(dictionary) ? dictionary.figures : undefined;
  const own = isTree(figures) ? figures[figure.id] : undefined;
  if (!isTree(own)) return 'no texts';
  const title = text(own.title);
  const alt = text(own.alt);
  if (!title) return 'no title';
  if (!alt) return 'no description';
  const labels = isTree(own.labels) ? own.labels : {};
  if (Object.keys(labels).length !== figure.labels.length) return `${Object.keys(labels).length} words, the figure has ${figure.labels.length}`;
  const list: string[] = [];
  for (let n = 1; n <= figure.labels.length; n++) {
    const one = text(labels[String(n)]);
    if (!one) return `word ${n} is missing or empty`;
    list.push(one);
  }
  const extra = Object.keys(own).filter((key) => !['title', 'alt', 'labels'].includes(key));
  if (extra.length) return `unknown parts: ${extra.join(', ')}`;
  return { title, alt, labels: list };
}

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const FILE = /^[a-z0-9-]+\/[a-z0-9-]+\.png$/;

/** What is wrong with the figures; empty — nothing. `dictionaries` — language → dictionary. */
export function figureProblems(figures: readonly Figure[], cards: readonly Card[], sources: readonly Source[], dictionaries: Record<string, unknown>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const figure of figures) {
    const at = `figure ${figure.id}`;
    if (!ID.test(figure.id)) out.push(`${at}: the id is not lower-case words joined by "-"`);
    if (seen.has(figure.id)) out.push(`${at}: twice`);
    seen.add(figure.id);
    if (!sources.some((source) => source.id === figure.source)) out.push(`${at}: unknown source ${figure.source}`);
    if (!FILE.test(figure.file)) out.push(`${at}: the file is not "<folder>/<name>.png"`);
    if (!figure.caption?.trim()) out.push(`${at}: no caption`);
    if (!figure.labels.length || figure.labels.some((label) => !label.trim())) out.push(`${at}: no words, or an empty one`);
    if (new Set(figure.labels).size !== figure.labels.length) out.push(`${at}: a word twice`);
    if (!Number.isInteger(figure.width) || !Number.isInteger(figure.height) || figure.width <= 0 || figure.height <= 0) out.push(`${at}: no size`);
    // A figure is shown with a card of its own source, and every figure is shown somewhere.
    const users = cards.filter((card) => card.figures?.includes(figure.id));
    if (!users.length) out.push(`${at}: no card shows it`);
    for (const card of users) if (card.source !== figure.source) out.push(`${at}: card ${card.id} has another source`);
    for (const [lang, dictionary] of Object.entries(dictionaries)) {
      const words = figureText(dictionary, figure);
      if (typeof words === 'string') out.push(`${at} (${lang}): ${words}`);
    }
  }
  for (const card of cards) for (const id of card.figures ?? []) if (!seen.has(id)) out.push(`card ${card.id}: unknown figure ${id}`);
  for (const [lang, dictionary] of Object.entries(dictionaries)) {
    const texts = isTree(dictionary) && isTree(dictionary.figures) ? Object.keys(dictionary.figures) : [];
    for (const id of texts) if (!seen.has(id)) out.push(`texts of an unknown figure ${id} (${lang})`);
  }
  return out;
}
