// "About": every source of the app with its licence and the credit the licence asks for. A series of pages (the
// travel advice of GOV.UK) is one line.
import { SERIES, SOURCES, type Source } from '../core/sources.ts';
import { h } from './dom.ts';
import { fmt, type Dict } from './i18n.ts';
import { dateOf } from './names.ts';

const link = (url: string, text: string) => h('a', { href: url, rel: 'noopener' }, text);

function licenceOf(d: Dict, source: Source): (Node | string)[] {
  return [' · ', link(source.licence.url, d.licences[source.licence.kind]), ...(source.attribution ? [` · ${source.attribution}`] : [])];
}

export function sourcesList(d: Dict, lang: string): HTMLUListElement {
  const list = h('ul', { class: 'sources' });
  const series = new Map<string, Source[]>();
  for (const source of SOURCES) {
    if (source.series) {
      series.set(source.series, [...(series.get(source.series) ?? []), source]);
      continue;
    }
    list.append(h('li', {}, link(source.url, source.title), ` — ${source.publisher}`, ...licenceOf(d, source)));
  }
  for (const [id, pages] of series) {
    const about = SERIES[id];
    const first = pages[0];
    if (!about || !first) continue;
    const read = pages.map((page) => page.read).sort().at(-1) ?? first.read;
    list.append(h('li', {}, link(about.url, about.title), ` — ${about.publisher}: ${fmt(d.about.series, { date: dateOf(lang, read) })}`, ...licenceOf(d, first)));
  }
  return list;
}
