// The menu: the language, installing the app, and what the app is — with its sources once there are any.
import { SURVIVAL } from '../config.ts';
import { dialogCross } from './dialog-cross.ts';
import { h } from './dom.ts';
import { install, installWay } from './install.ts';
import { LANGS, langName, type Dict } from './i18n.ts';

const link = (url: string, text: string) => h('a', { href: url, rel: 'noopener' }, text);

export function createMenuDialog(): { el: HTMLDialogElement; open(d: Dict, lang: string, setLang: (code: string) => void): void } {
  const el = h('dialog', { class: 'dialog', 'aria-labelledby': 'menu-title' });
  return {
    el,
    open(d, lang, setLang) {
      const langs = h('ul', { class: 'langs', 'aria-labelledby': 'lang-label' });
      let current: HTMLButtonElement | null = null;
      for (const code of LANGS) {
        const button = h('button', { class: 'chip', type: 'button', lang: code, 'aria-pressed': String(code === lang) }, langName(code));
        button.addEventListener('click', () => setLang(code));
        if (code === lang) current = button;
        langs.append(h('li', {}, button));
      }
      // Installing: the browser's own window where it has one, a short instruction on iPhone and iPad.
      const way = installWay();
      const installButton = h('button', { class: 'btn', type: 'button' }, d.install.button);
      installButton.addEventListener('click', () => {
        installButton.hidden = true;
        void install();
      });
      const installing =
        way === null ? null : h('section', { class: 'part', 'aria-labelledby': 'install-title' }, h('h3', { id: 'install-title' }, d.install.title), h('p', {}, way === 'ios' ? d.install.ios : d.install.text), way === 'prompt' ? installButton : null);
      const close = h('button', { class: 'btn', type: 'button' }, d.actions.close);
      close.addEventListener('click', () => el.close());
      const made = SURVIVAL.links.site ? link(SURVIVAL.links.site, d.about.madeBy) : d.about.madeBy;
      el.replaceChildren(
        dialogCross(el, d.actions.close),
        h(
          'div',
          { class: 'dialog__body' },
          h('h2', { id: 'menu-title' }, d.menu.title),
          h('div', { class: 'part' }, h('p', { id: 'lang-label' }, d.menu.language), langs),
          installing,
          h('h2', {}, d.about.title),
          h('p', {}, d.about.text),
          h('p', {}, d.about.rule),
          h('h3', {}, d.about.sources),
          h('p', {}, d.about.noSources),
          h('p', {}, made),
          h('div', { class: 'dialog__actions' }, close),
        ),
      );
      if (!el.open) el.showModal();
      (current ?? close).focus();
    },
  };
}
