// The emergency numbers of the chosen country, with buttons that call them; without a country — the
// Commission's sentence about 112 in the EU and the choice of a country (decision of 27.11). Shown on the main
// screen and over every first-aid card.
import { numbersOf, sourcesOf, type EmergencyLine } from '../core/emergency.ts';
import { sourceById } from '../core/sources.ts';
import { h } from './dom.ts';
import { fmt, type Dict } from './i18n.ts';
import { countryName, listOf } from './names.ts';

const link = (url: string, text: string) => h('a', { href: url, rel: 'noopener' }, text);

function callLink(d: Dict, dial: string, from: 'mobile' | 'landline' | null): HTMLAnchorElement {
  const label = fmt(d.emergency.call, { number: dial }) + (from ? ` ${d.emergency.from[from]}` : '');
  return h('a', { class: 'call', href: `tel:${dial}`, 'aria-label': label }, h('span', { class: 'call__number' }, dial), from ? h('span', { class: 'call__from' }, d.emergency.from[from]) : null);
}

function lineItem(d: Dict, lang: string, line: EmergencyLine): HTMLLIElement {
  const calls = h('div', { class: 'sos__calls' });
  for (const number of line.numbers) calls.append(callLink(d, number.dial, number.from));
  // What the numbers are for comes first, the buttons under it: a label under a row of buttons reads as if it
  // were the next row's.
  return h('li', { class: 'sos__line' }, h('span', { class: 'sos__services' }, listOf(lang, line.services.map((service) => d.emergency.services[service]))), calls);
}

/** Where the numbers come from: a link to each source; "names translated" where the source has another language. */
function sourcesLine(d: Dict, lang: string, ids: readonly string[]): HTMLParagraphElement {
  const parts: (Node | string)[] = [`${d.emergency.sources}: `];
  ids.forEach((id, i) => {
    const source = sourceById(id);
    if (!source) return;
    if (i > 0) parts.push('; ');
    parts.push(link(source.url, source.title));
    if (source.lang !== lang) parts.push(` (${d.emergency.translated})`);
  });
  return h('p', { class: 'sos__source' }, ...parts);
}

export function emergencyPanel(d: Dict, lang: string, code: string | null, choose: () => void, level: 'h2' | 'h3'): HTMLElement {
  const country = numbersOf(code);
  const id = `sos-${level}`;
  const heading = h(level, { class: 'sos__title', id }, country ? fmt(d.emergency.titleIn, { country: countryName(lang, country.code) }) : d.emergency.title);
  const button = h('button', { class: 'btn btn--quiet', type: 'button' }, country ? d.emergency.change : d.emergency.choose);
  button.addEventListener('click', choose);
  const panel = h('section', { class: 'sos', 'aria-labelledby': id }, heading);
  if (country) {
    const lines = h('ul', { class: 'sos__lines' });
    for (const line of country.lines) lines.append(lineItem(d, lang, line));
    panel.append(lines, sourcesLine(d, lang, sourcesOf(country)));
  } else {
    // No country yet: what holds in the whole EU, by the Commission's page.
    const lines = h('ul', { class: 'sos__lines' }, h('li', { class: 'sos__line sos__line--eu' }, h('span', { class: 'sos__services' }, d.emergency.eu), h('div', { class: 'sos__calls' }, callLink(d, '112', null))));
    panel.append(lines, sourcesLine(d, lang, ['ec-112']));
  }
  panel.append(h('div', { class: 'sos__actions' }, button));
  return panel;
}
