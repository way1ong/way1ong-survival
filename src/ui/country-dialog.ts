// The choice of a country for the emergency numbers: the countries of the list, by their names in the app's
// language, in that language's alphabetical order.
import { EMERGENCY } from '../core/emergency.ts';
import { dialogCross } from './dialog-cross.ts';
import { h } from './dom.ts';
import type { Dict } from './i18n.ts';
import { countryName } from './names.ts';

export function createCountryDialog(): { el: HTMLDialogElement; open(d: Dict, lang: string, current: string | null, choose: (code: string) => void): void } {
  const el = h('dialog', { class: 'dialog', 'aria-labelledby': 'country-title' });
  return {
    el,
    open(d, lang, current, choose) {
      const collator = new Intl.Collator(lang);
      const countries = EMERGENCY.map((country) => ({ code: country.code, name: countryName(lang, country.code) })).sort((a, b) => collator.compare(a.name, b.name));
      const list = h('ul', { class: 'countries' });
      let pressed: HTMLButtonElement | null = null;
      for (const country of countries) {
        const button = h('button', { class: 'country', type: 'button', 'aria-pressed': String(country.code === current), 'data-country': country.code }, country.name);
        button.addEventListener('click', () => {
          el.close();
          choose(country.code);
        });
        if (country.code === current) pressed = button;
        list.append(h('li', {}, button));
      }
      el.replaceChildren(dialogCross(el, d.actions.close), h('div', { class: 'dialog__body' }, h('h2', { id: 'country-title' }, d.emergency.pickTitle), h('p', {}, d.emergency.pickText), list));
      if (!el.open) el.showModal();
      (pressed ?? (list.querySelector('button') as HTMLButtonElement | null))?.focus();
    },
  };
}
