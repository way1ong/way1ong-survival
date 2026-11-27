// The screen: the heading with the menu, the note of a new version, the emergency numbers of the chosen
// country, and the list of sections.
import { SURVIVAL } from '../config.ts';
import type { Card } from '../core/cards.ts';
import { numbersOf } from '../core/emergency.ts';
import { SECTION_IDS, type SectionId } from '../core/sections.ts';
import { createCardDialog } from './card-dialog.ts';
import { createCountryDialog } from './country-dialog.ts';
import { h } from './dom.ts';
import { emergencyPanel } from './emergency-panel.ts';
import { dict, pickLang, type Dict } from './i18n.ts';
import { createMenuDialog } from './menu-dialog.ts';
import { onUpdateReady, type ApplyUpdate } from './offline.ts';
import { createSectionDialog } from './section-dialog.ts';
import { keep, saved } from './storage.ts';

export function startApp(root: HTMLElement): void {
  let lang = pickLang(saved(SURVIVAL.langKey), navigator.languages);
  let d: Dict = dict(lang);
  // Only a country of the list counts: an old or broken value is forgotten.
  let country = numbersOf(saved(SURVIVAL.countryKey)) ? saved(SURVIVAL.countryKey) : null;
  let openSection: SectionId | null = null;
  let openCard: { card: Card; from: HTMLButtonElement } | null = null;

  const title = h('h1', { class: 'top__title' });
  const menuButton = h('button', { class: 'icon-btn', type: 'button' }, h('span', { class: 'icon-menu', 'aria-hidden': 'true' }));
  const top = h('header', { class: 'top' }, title, menuButton);

  // A new version waits: the person is told and decides — "Update" loads it at once, the cross leaves it for
  // the next opening (the owner's decision of 26.11 for every program).
  const updateWords = h('p', { class: 'update__words', role: 'status' });
  const updateButton = h('button', { class: 'btn', type: 'button' });
  const updateClose = h('button', { class: 'icon-btn', type: 'button' }, h('span', { class: 'icon-close', 'aria-hidden': 'true' }));
  const updateBox = h('div', { class: 'update', hidden: true }, h('div', { class: 'update__text' }, updateWords, updateButton), updateClose);
  let applyUpdate: ApplyUpdate | null = null;

  const sos = h('div', { class: 'sos-place' });
  const tagline = h('p', { class: 'tagline' });
  const sectionsTitle = h('h2', { class: 'sections__title', id: 'sections-title' });
  const list = h('ul', { class: 'sections', 'aria-labelledby': 'sections-title' });
  const buttons = new Map<SectionId, HTMLButtonElement>();
  for (const id of SECTION_IDS) {
    const button = h('button', { class: 'section', type: 'button', 'data-section': id });
    button.addEventListener('click', () => {
      openSection = id;
      showSection();
    });
    buttons.set(id, button);
    list.append(h('li', {}, button));
  }
  const main = h('main', { class: 'main' }, updateBox, sos, tagline, sectionsTitle, list);

  const menu = createMenuDialog();
  const sectionDialog = createSectionDialog();
  const cardDialog = createCardDialog();
  const countryDialog = createCountryDialog();

  const chooseCountry = () =>
    countryDialog.open(d, lang, country, (code) => {
      country = code;
      keep(SURVIVAL.countryKey, code);
      render();
    });
  const panel = (level: 'h2' | 'h3') => emergencyPanel(d, lang, country, chooseCountry, level);

  function showCard(card: Card, from: HTMLButtonElement): void {
    openCard = { card, from };
    cardDialog.open(d, lang, card, () => panel('h3'));
  }
  function showSection(): void {
    if (openSection) sectionDialog.open(d, lang, openSection, showCard);
  }

  sectionDialog.el.addEventListener('close', () => {
    if (openSection) buttons.get(openSection)?.focus();
    openSection = null;
  });
  cardDialog.el.addEventListener('close', () => {
    // The section's window may have been drawn anew meanwhile (another language): its own button for this card.
    const id = openCard?.card.id;
    const fresh = id ? sectionDialog.el.querySelector<HTMLButtonElement>(`[data-card="${id}"]`) : null;
    (fresh ?? openCard?.from)?.focus();
    openCard = null;
  });
  menu.el.addEventListener('close', () => menuButton.focus());

  const setLang = (code: string) => {
    lang = code;
    keep(SURVIVAL.langKey, code);
    render();
    menu.open(d, lang, setLang);
  };
  menuButton.addEventListener('click', () => menu.open(d, lang, setLang));

  function render(): void {
    d = dict(lang);
    document.documentElement.lang = lang;
    document.title = d.app.name;
    title.textContent = d.app.name;
    menuButton.setAttribute('aria-label', d.actions.menu);
    updateClose.setAttribute('aria-label', d.actions.close);
    updateButton.textContent = d.update.apply;
    updateWords.textContent = d.update.ready;
    tagline.textContent = d.app.tagline;
    sectionsTitle.textContent = d.sections.title;
    for (const [id, button] of buttons) button.textContent = d.sections[id];
    sos.replaceChildren(panel('h2'));
    // Windows that are open show the new language or country at once.
    if (sectionDialog.el.open) showSection();
    if (cardDialog.el.open && openCard) cardDialog.open(d, lang, openCard.card, () => panel('h3'));
  }

  onUpdateReady((apply) => {
    applyUpdate = apply;
    updateBox.hidden = false;
  });
  updateButton.addEventListener('click', () => {
    updateButton.disabled = true;
    applyUpdate?.();
  });
  updateClose.addEventListener('click', () => {
    updateBox.hidden = true;
  });

  render();
  root.replaceChildren(top, main, menu.el, sectionDialog.el, cardDialog.el, countryDialog.el);
}
