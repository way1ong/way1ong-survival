// The window of a card: its title, the notes over it, the steps, when the method works, how reliable it is,
// where people go wrong — and its source, with the licence and the credit the licence asks for.
import { cardNotices, cardText, EXTRA_WORDS, type Card, type CardText } from '../core/cards.ts';
import { sourceById } from '../core/sources.ts';
import { dialogCross } from './dialog-cross.ts';
import { h } from './dom.ts';
import { dict, fmt, langName, type Dict } from './i18n.ts';
import { dateOf } from './names.ts';

const link = (url: string, text: string) => h('a', { href: url, rel: 'noopener' }, text);

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
        else if (notice === 'translation') notes.append(h('p', { class: 'note' }, fmt(d.notices.translation, { language: langName(source.lang) })));
        else notes.append(h('p', { class: notice === 'notDoctor' ? 'note note--strong' : 'note' }, d.notices[notice]));
      }
      const steps = h('ol', { class: 'steps' });
      for (const step of words.steps) steps.append(h('li', {}, step));
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
          ...part(d.card.works, words.works),
          ...part(d.card.reliability, words.reliability),
          ...part(d.card.mistakes, words.mistakes),
          h(
            'section',
            { class: 'source', 'aria-labelledby': 'card-source' },
            h('h3', { id: 'card-source' }, d.card.source),
            h('p', {}, link(source.url, source.title), ` — ${source.publisher}`),
            h('p', {}, source.version),
            h('p', {}, fmt(d.card.read, { date: dateOf(lang, source.read) })),
            h('p', {}, `${d.card.licence}: `, link(source.licence.url, d.licences[source.licence.kind])),
            source.attribution ? h('p', {}, source.attribution) : null,
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
