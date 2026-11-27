// The window of a section. Until its cards are ready (stage 4) it says only that the section is being
// prepared: no advice without a checked source.
import type { SectionId } from '../core/sections.ts';
import { dialogCross } from './dialog-cross.ts';
import { h } from './dom.ts';
import type { Dict } from './i18n.ts';

export function createSectionDialog(): { el: HTMLDialogElement; open(d: Dict, id: SectionId): void } {
  const el = h('dialog', { class: 'dialog', 'aria-labelledby': 'section-title' });
  return {
    el,
    open(d, id) {
      const close = h('button', { class: 'btn', type: 'button' }, d.actions.close);
      close.addEventListener('click', () => el.close());
      el.replaceChildren(
        dialogCross(el, d.actions.close),
        h('div', { class: 'dialog__body' }, h('h2', { id: 'section-title' }, d.sections[id]), h('p', {}, d.section.soon), h('div', { class: 'dialog__actions' }, close)),
      );
      if (!el.open) el.showModal();
      close.focus();
    },
  };
}
