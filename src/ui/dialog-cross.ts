// The cross in the top corner of a window: it stays there while the window is scrolled, so a long window is
// closed without scrolling to the button at its end (the owner's request of 26.11, for phones first of all).
import { h } from './dom.ts';

export function dialogCross(el: HTMLDialogElement, label: string): HTMLElement {
  const cross = h('button', { class: 'icon-btn dialog__cross', type: 'button', 'aria-label': label }, h('span', { class: 'icon-close', 'aria-hidden': 'true' }));
  cross.addEventListener('click', () => el.close());
  return h('div', { class: 'dialog__top' }, cross);
}
