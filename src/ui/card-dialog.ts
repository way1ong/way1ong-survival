// The window of a card: its title, the notes over it, the steps, when the method works, how reliable it is,
// where people go wrong — and its source, with the licence and the credit the licence asks for; a step written
// after another source names that source under it, and the source is shown under the card too.
import { cardNotices, cardText, EXTRA_WORDS, type Card, type CardText } from '../core/cards.ts';
import { figureById } from '../core/figures.ts';
import { sourceById, type Source } from '../core/sources.ts';
import { dialogCross } from './dialog-cross.ts';
import { h } from './dom.ts';
import { figureView } from './figure-view.ts';
import { dict, fmt, type Dict } from './i18n.ts';
import { dateOf } from './names.ts';

const link = (url: string, text: string) => h('a', { href: url, rel: 'noopener' }, text);

/** The language of a source by its name in the app's language: "англійська", "angol", "English". */
const languageName = (lang: string, of: string) => new Intl.DisplayNames([lang], { type: 'language' }).of(of) ?? of;

/** Where a source is, which version was read and when, its licence and the credit the licence asks for. */
function sourceParts(d: Dict, lang: string, source: Source): HTMLElement[] {
  return [
    h('p', {}, link(source.url, source.title), ` — ${source.publisher}`),
    h('p', {}, source.version),
    h('p', {}, fmt(d.card.read, { date: dateOf(lang, source.read) })),
    h('p', {}, `${d.card.licence}: `, link(source.licence.url, d.licences[source.licence.kind])),
    ...(source.attribution ? [h('p', {}, source.attribution)] : []),
  ];
}

type Tree = Record<string, unknown>;
const cardsIn = (value: unknown): Tree => (typeof value === 'object' && value !== null && 'cards' in value ? ((value as { cards: Tree }).cards ?? {}) : {});

/** The words of a card in a language: from the dictionary, or from the sample of the test build. */
export function wordsOf(lang: string, id: string): CardText | null {
  const words = cardText({ cards: { ...cardsIn(dict(lang)), ...cardsIn(EXTRA_WORDS[lang]) } }, id);
  return typeof words === 'string' ? null : words;
}

export function createCardDialog(): {
  el: HTMLDialogElement;
  /** `emergency` — the panel of emergency numbers for a first-aid card. */
  open(d: Dict, lang: string, card: Card, emergency: () => HTMLElement): void;
} {
  const el = h('dialog', { class: 'dialog dialog--card', 'aria-labelledby': 'card-title' });
  return {
    el,
    open(d, lang, card, emergency) {
      const words = wordsOf(lang, card.id);
      const source = sourceById(card.source);
      if (!words || !source) return;
      const notes = h('div', { class: 'notes' });
      for (const notice of cardNotices(card, source, lang)) {
        if (notice === 'emergency') notes.append(emergency());
        else if (notice === 'translation') notes.append(h('p', { class: 'note' }, fmt(d.notices.translation, { language: languageName(lang, source.lang) })));
        else notes.append(h('p', { class: notice === 'notDoctor' ? 'note note--strong' : 'note' }, d.notices[notice]));
      }
      // Steps after another source than the card's: step number → that source.
      const others = Object.entries(card.stepSources ?? {}).flatMap(([n, id]) => {
        const other = sourceById(id);
        return other ? [[n, other] as const] : [];
      });
      const steps = h('ol', { class: 'steps' });
      words.steps.forEach((step, i) => {
        const points = step.items.length ? h('ul', { class: 'points' }) : null;
        for (const item of step.items) points?.append(h('li', {}, item));
        const other = others.find(([n]) => n === String(i + 1))?.[1];
        const from = other
          ? h('p', { class: 'step-source' }, `${d.card.stepSource} `, link(other.url, other.title), ` — ${other.publisher}.`, other.lang !== lang ? ` ${fmt(d.notices.translation, { language: languageName(lang, other.lang) })}` : '')
          : null;
        steps.append(h('li', {}, step.text, points, from));
      });
      // The pictures of the source go under the steps they show.
      const figures = (card.figures ?? []).map((id) => figureById(id)).map((figure) => (figure ? figureView(d, lang, figure, source.lang) : null));
      const part = (title: string, text: string) => [h('h3', {}, title), h('p', {}, text)];
      const close = h('button', { class: 'btn', type: 'button' }, d.actions.close);
      close.addEventListener('click', () => el.close());
      const sample = card.id.startsWith('sample-') ? h('p', { class: 'badge' }, d.card.sample) : null;
      el.replaceChildren(
        dialogCross(el, d.actions.close),
        h(
          'div',
          { class: 'dialog__body' },
          h('h2', { id: 'card-title' }, words.title),
          sample,
          notes,
          h('h3', {}, d.card.steps),
          steps,
          ...figures,
          ...part(d.card.works, words.works),
          ...part(d.card.reliability, words.reliability),
          ...part(d.card.mistakes, words.mistakes),
          h(
            'section',
            { class: 'source', 'aria-labelledby': 'card-source' },
            h('h3', { id: 'card-source' }, d.card.source),
            ...sourceParts(d, lang, source),
            ...others.flatMap(([n, other]) => [h('h3', {}, fmt(d.card.stepSourceTitle, { step: n })), ...sourceParts(d, lang, other)]),
          ),
          h('div', { class: 'dialog__actions' }, close),
        ),
      );
      if (!el.open) el.showModal();
      el.scrollTop = 0;
      close.focus({ preventScroll: true });
    },
  };
}
