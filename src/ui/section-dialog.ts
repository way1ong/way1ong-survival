// The window of a section: its cards, or — until there are any — that the section is being prepared: no advice
// without a checked source.
import { cardsOf, type Card } from '../core/cards.ts';
import type { SectionId } from '../core/sections.ts';
import { wordsOf } from './card-dialog.ts';
import { dialogCross } from './dialog-cross.ts';
import { h } from './dom.ts';
import type { Dict } from './i18n.ts';

export function createSectionDialog(): { el: HTMLDialogElement; open(d: Dict, lang: string, id: SectionId, openCard: (card: Card, from: HTMLButtonElement) => void): void } {
  const el = h('dialog', { class: 'dialog', 'aria-labelledby': 'section-title' });
  return {
    el,
    open(d, lang, id, openCard) {
      const close = h('button', { class: 'btn', type: 'button' }, d.actions.close);
      close.addEventListener('click', () => el.close());
      const cards = cardsOf(id).filter((card) => wordsOf(lang, card.id));
      let content: HTMLElement;
      let first: HTMLButtonElement | null = null;
      if (cards.length) {
        content = h('ul', { class: 'cards', 'aria-label': d.section.cards });
        for (const card of cards) {
          const button = h('button', { class: 'section', type: 'button', 'data-card': card.id }, wordsOf(lang, card.id)?.title ?? card.id);
          button.addEventListener('click', () => openCard(card, button));
          first ??= button;
          content.append(h('li', {}, button));
        }
      } else {
        content = h('p', {}, d.section.soon);
      }
      el.replaceChildren(dialogCross(el, d.actions.close), h('div', { class: 'dialog__body' }, h('h2', { id: 'section-title' }, d.sections[id]), content, h('div', { class: 'dialog__actions' }, close)));
      if (!el.open) el.showModal();
      (first ?? close).focus();
    },
  };
}
