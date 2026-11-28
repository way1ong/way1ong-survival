// A picture in a card: the figure of the source as it is, its title, and — in a language other than the
// source's — the words printed on it with their translation (decision of 28.11). The files are part of the
// build, so the service worker keeps them and the pictures open without internet.
import { figureText, type Figure } from '../core/figures.ts';
import { h } from './dom.ts';
import { dict, type Dict } from './i18n.ts';

const FILES = import.meta.glob<string>('../figures/**/*.png', { eager: true, query: '?url', import: 'default' });

export function figureView(d: Dict, lang: string, figure: Figure, sourceLang: string): HTMLElement | null {
  const url = FILES[`../figures/${figure.file}`];
  const words = figureText(dict(lang), figure);
  if (!url || typeof words === 'string') return null;
  const legend =
    lang === sourceLang
      ? null
      : h(
          'div',
          { class: 'figure__words' },
          h('p', {}, d.card.figureWords),
          h('ul', {}, ...figure.labels.map((label, i) => h('li', { lang: sourceLang }, label, h('span', { lang }, ` — ${words.labels[i] ?? ''}`)))),
        );
  return h(
    'figure',
    { class: 'figure' },
    h('img', { src: url, alt: words.alt, width: figure.width, height: figure.height, loading: 'lazy', decoding: 'async' }),
    h('figcaption', {}, h('p', { class: 'figure__title' }, words.title), legend),
  );
}
