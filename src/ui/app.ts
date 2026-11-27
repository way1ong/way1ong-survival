// The screen: the heading with the menu, the note of a new version, and the list of sections.
import { SURVIVAL } from '../config.ts';
import { SECTION_IDS, type SectionId } from '../core/sections.ts';
import { h } from './dom.ts';
import { dict, pickLang, type Dict } from './i18n.ts';
import { createMenuDialog } from './menu-dialog.ts';
import { onUpdateReady, type ApplyUpdate } from './offline.ts';
import { createSectionDialog } from './section-dialog.ts';

/** The saved language; storage may be closed (private windows), then nothing is kept. */
function savedLang(): string | null {
  try {
    return localStorage.getItem(SURVIVAL.langKey);
  } catch {
    return null;
  }
}

function saveLang(code: string): void {
  try {
    localStorage.setItem(SURVIVAL.langKey, code);
  } catch {
    // nothing kept: the browser's language is taken next time
  }
}

export function startApp(root: HTMLElement): void {
  let lang = pickLang(savedLang(), navigator.languages);
  let d: Dict = dict(lang);
  let openSection: SectionId | null = null;

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

  const tagline = h('p', { class: 'tagline' });
  const sectionsTitle = h('h2', { class: 'sections__title', id: 'sections-title' });
  const list = h('ul', { class: 'sections', 'aria-labelledby': 'sections-title' });
  const buttons = new Map<SectionId, HTMLButtonElement>();
  for (const id of SECTION_IDS) {
    const button = h('button', { class: 'section', type: 'button', 'data-section': id });
    button.addEventListener('click', () => {
      openSection = id;
      sectionDialog.open(d, id);
    });
    buttons.set(id, button);
    list.append(h('li', {}, button));
  }
  const main = h('main', { class: 'main' }, updateBox, tagline, sectionsTitle, list);

  const menu = createMenuDialog();
  const sectionDialog = createSectionDialog();
  sectionDialog.el.addEventListener('close', () => {
    if (openSection) buttons.get(openSection)?.focus();
    openSection = null;
  });
  menu.el.addEventListener('close', () => menuButton.focus());

  const setLang = (code: string) => {
    lang = code;
    saveLang(code);
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
  root.replaceChildren(top, main, menu.el, sectionDialog.el);
}
