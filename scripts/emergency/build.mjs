// The emergency numbers of the countries of Europe (decision of 27.11), from GOV.UK Foreign travel advice —
// each country's "Getting help" page, under the Open Government Licence v3.0 — and from two other sources:
// GOV.UK guidance for people from Ukraine in the United Kingdom ("Get urgent help and report a crime: Homes for
// Ukraine") for the United Kingdom, the order of the Ministry of Health of Ukraine for 112 in Ukraine.
//
//   node scripts/emergency/build.mjs --fetch   download the pages again (into scripts/emergency/cache/, not kept in git)
//   node scripts/emergency/build.mjs           build from the downloaded pages
//
// Writes: docs/sources/govuk-<slug>.txt (the text of both pages of a country: "Getting help" and the guide's
// first page with its dates), the entries of these pages in src/data/sources.json, src/data/emergency.json
// (every line of the "Emergency services" block word for word, with its numbers and services), and
// docs/research/EMERGENCY.md (what was read and what was left out). A label the script does not know stops it:
// a person decides what it means. The checks of the result are in src/core/emergency.test.ts.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const here = join(root, 'scripts', 'emergency');
const cache = join(here, 'cache');
const { countries } = JSON.parse(readFileSync(join(here, 'countries.json'), 'utf8'));
const READ = new Date().toISOString().slice(0, 10);
const BASE = 'https://www.gov.uk/foreign-travel-advice';
// The member states of the EU: where the Commission's sentence about 112 holds.
const EU_LIST = 'https://european-union.europa.eu/principles-countries-history/eu-countries_en';

// ---- downloading ----
function fetchPage(url, file) {
  const status = execFileSync('curl', ['-s', '-L', '--compressed', '--max-time', '40', '-A', 'Mozilla/5.0 (X11; Linux x86_64)', '-o', file, '-w', '%{http_code}', url], { encoding: 'utf8' });
  if (status !== '200') throw new Error(`${url}: answer ${status}`);
}

if (process.argv.includes('--fetch')) {
  mkdirSync(cache, { recursive: true });
  for (const country of countries) {
    if (!country.govuk) continue;
    for (const [part, path] of [['main', ''], ['help', '/getting-help']]) {
      fetchPage(`${BASE}/${country.govuk}${path}`, join(cache, `${country.govuk}-${part}.html`));
      // One page a second: the site is not ours.
      execFileSync('sleep', ['1']);
    }
    console.log(`fetched ${country.govuk}`);
  }
  for (const [part, query] of [['eu-1', ''], ['eu-2', '?page=1']]) {
    fetchPage(`${EU_LIST}${query}`, join(cache, `${part}.html`));
    execFileSync('sleep', ['1']);
  }
  writeFileSync(join(cache, 'READ'), `${READ}\n`);
}
const read = existsSync(join(cache, 'READ')) ? readFileSync(join(cache, 'READ'), 'utf8').trim() : READ;

// ---- the text of a page ----
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '–', mdash: '—', hellip: '…', copy: '©' };
function pageText(html) {
  let text = html.replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, '');
  text = text.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|li|h[1-6]|div|dt|dd|tr|th|td|ul|ol|section|header|footer|nav|main|article|title|summary|details|figcaption|blockquote)>/gi, '\n');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, name) => {
    if (name[0] === '#') return String.fromCodePoint(name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10));
    return ENTITIES[name.toLowerCase()] ?? whole;
  });
  return text
    .split('\n')
    .map((line) => line.replace(/[\t ]+/g, ' ').trim())
    .filter(Boolean);
}
// The page's own title is the first one (a logo may carry another).
const titleOf = (html) => (/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').replace(/\s+/g, ' ').replace(/ - GOV\.UK$/, '').trim();

// ---- what a line of the block means ----
/** A label → the services it names; null — the services stand in brackets after the number (none: all of them). */
const LABELS = {
  Telephone: null,
  'All emergencies': ['all'],
  Ambulance: ['ambulance'],
  Fire: ['fire'],
  Police: ['police'],
  'Mountain rescue': ['mountainRescue'],
  'Ambulance or rescue': ['ambulance', 'rescue'],
  'European emergency number': ['european'],
  'Ambulance, fire and mountain rescue': ['ambulance', 'fire', 'mountainRescue'],
  'Deaf and hard of hearing emergency number (SMS, chat, video and fax)': ['deaf'],
};
/** Labels left out: not an emergency service, or an ordinary phone number. */
const LEFT_OUT = { 'Roadside assistance': 'not an emergency service', 'Riga Tourist Police': 'an ordinary phone number of one city' };
const NUMBER = /(\d+)(?:\s+(?:on|from)\s+a\s+(mobile|landline))?/g;
const SERVICES_IN_BRACKETS = /\(((?:ambulance|fire|police)(?:, (?:ambulance|fire|police))*)\)$/;

/** One line of the block → { label, numbers, services } or null (not a line of numbers). */
function readLine(line) {
  const labelled = /^(.+?)\s*:\s*(.+)$/.exec(line) ?? /^(Telephone)\s+(\d.+)$/.exec(line);
  if (!labelled) return null;
  const [, label, value] = labelled;
  if (!/\d/.test(value)) return null;
  let rest = value.trim().replace(/\.$/, '');
  // A number with a country code is an ordinary phone (an office, a helpline), not an emergency number.
  if (rest.startsWith('+')) return { label, ordinary: true };
  const named = LABELS[label];
  if (named === undefined) return { label, unknown: true };
  // Services in brackets after the number say exactly which: they win over the label.
  const brackets = SERVICES_IN_BRACKETS.exec(rest);
  if (brackets) rest = rest.slice(0, brackets.index).trim();
  const services = brackets ? brackets[1].split(', ') : (named ?? ['general']);
  const numbers = [...rest.matchAll(NUMBER)].map((m) => ({ dial: m[1], from: m[2] ?? null }));
  const leftover = rest.replace(NUMBER, '').replace(/[()]/g, '').replace(/\bor\b/g, '').trim();
  if (leftover) throw new Error(`"${line}": not understood — "${leftover}"`);
  return { label, numbers, services };
}

// ---- building ----
const problems = [];
const report = [];
const sources = [];
const emergency = [];
const OTHER = {
  // The United Kingdom has no page of its own in GOV.UK Foreign travel advice; GOV.UK's guidance for people from
  // Ukraine names its numbers (decision of 28.11: not the NHS, whose terms forbid naming it under a translation).
  'govuk-hfu-urgent-help': [
    { source: 'govuk-hfu-urgent-help', quote: '999 is the number to call in an emergency.', services: ['all'], numbers: [{ dial: '999', from: null }] },
    { source: 'govuk-hfu-urgent-help', quote: '112 is also a common emergency telephone number that is free to use from most mobile telephones, and in some countries, fixed telephones. It can be used instead of 999 and will connect you to the same services.', services: ['all'], numbers: [{ dial: '112', from: null }] },
  ],
};
// Ukraine: besides GOV.UK, the order of the Ministry of Health names the single number of the emergency system.
const ALSO = {
  UA: [{ source: 'moz-441', quote: 'здійснити виклик за єдиним телефонним номером системи екстреної допомоги населенню 112', services: ['general'], numbers: [{ dial: '112', from: null }] }],
};

// Which countries the EU's own list names as members: "<country>" followed by "EU Member State since …". The
// English name of each code comes from the browser's region names (Intl), the same in the test.
const euLines = ['eu-1', 'eu-2'].flatMap((part) => pageText(readFileSync(join(cache, `${part}.html`), 'utf8')));
const english = new Intl.DisplayNames(['en'], { type: 'region' });
const member = (code) => euLines.some((line, i) => line === english.of(code) && /^EU Member State since/.test(euLines[i + 1] ?? ''));
const memberCount = euLines.filter((line) => /^EU Member State since/.test(line)).length;
/** The Commission's sentence: 112 everywhere in the EU. */
const EU_112 = { source: 'ec-112', quote: '112 is the European emergency phone number, available everywhere in the EU, free of charge.', services: ['european'], numbers: [{ dial: '112', from: null }] };
/** A country's lines already give 112 for every emergency: the Commission's sentence would repeat them. */
const covers112 = (lines) => lines.some((line) => line.numbers.some((n) => n.dial === '112') && (['all', 'general', 'european'].some((s) => line.services.includes(s)) || ['ambulance', 'fire', 'police'].every((s) => line.services.includes(s))));
const members = [];

for (const country of countries) {
  if (country.skip) {
    report.push(`| ${country.code} | — | left out: ${country.skip} |`);
    continue;
  }
  if (country.other) {
    emergency.push({ code: country.code, lines: OTHER[country.other] });
    report.push(`| ${country.code} | \`${country.other}\` | ${OTHER[country.other].map((l) => l.quote).join(' / ')} |`);
    continue;
  }
  const slug = country.govuk;
  const id = `govuk-${slug}`;
  const help = readFileSync(join(cache, `${slug}-help.html`), 'utf8');
  const main = readFileSync(join(cache, `${slug}-main.html`), 'utf8');
  const helpLines = pageText(help);
  const mainLines = pageText(main);
  const after = (label) => mainLines[mainLines.indexOf(label) + 1] ?? '';
  const current = after('Still current at:');
  const updated = after('Updated:');
  if (!current || !updated) problems.push(`${slug}: no dates on the guide's first page`);
  if (!/travel advice$/.test(titleOf(help))) problems.push(`${slug}: unexpected title «${titleOf(help)}»`);
  const start = helpLines.findIndex((line) => /^Emergency services (in )?/.test(line));
  if (start < 0) {
    problems.push(`${slug}: no "Emergency services" block`);
    continue;
  }
  const lines = [];
  const left = [];
  for (const line of helpLines.slice(start + 1)) {
    if (/^Contact your travel provider/.test(line)) break;
    const meaning = readLine(line);
    if (!meaning) {
      left.push(line);
      continue;
    }
    if (meaning.ordinary) {
      left.push(`${line} (an ordinary phone number)`);
      continue;
    }
    if (meaning.unknown) {
      if (LEFT_OUT[meaning.label]) left.push(`${line} (${LEFT_OUT[meaning.label]})`);
      else problems.push(`${slug}: unknown label "${meaning.label}" in "${line}"`);
      continue;
    }
    lines.push({ source: id, quote: line, services: meaning.services, numbers: meaning.numbers });
  }
  if (!lines.length) problems.push(`${slug}: no numbers in the block`);
  const all = [...(ALSO[country.code] ?? []), ...lines];
  if (member(country.code)) {
    members.push(country.code);
    if (!covers112(all)) all.push(EU_112);
  }
  emergency.push({ code: country.code, lines: all });
  const url = `${BASE}/${slug}/getting-help`;
  sources.push({
    id,
    title: titleOf(help),
    publisher: 'Foreign, Commonwealth & Development Office (GOV.UK)',
    url,
    lang: 'en',
    version: `Updated: ${updated}; still current at: ${current}`,
    read,
    licence: { kind: 'ogl-3.0', url: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/', quote: 'All content is available under the Open Government Licence v3.0, except where otherwise stated' },
    attribution: 'Contains public sector information licensed under the Open Government Licence v3.0.',
    note: null,
    series: 'govuk-fta',
  });
  writeFileSync(
    join(root, 'docs', 'sources', `${id}.txt`),
    [`${url}`, `(read ${read})`, '', ...helpLines, '', '----', `${BASE}/${slug}`, '', ...mainLines].join('\n') + '\n',
  );
  report.push(`| ${country.code} | ${[...new Set(all.map((l) => `\`${l.source}\``))].join(', ')} | ${all.map((l) => l.quote).join(' / ')}${left.length ? ` — not taken: ${left.join(' / ')}` : ''} |`);
}

if (memberCount !== members.length) problems.push(`the EU's list names ${memberCount} member states, ${members.length} of them found among the countries`);
writeFileSync(join(root, 'docs', 'sources', 'eu-countries.txt'), [EU_LIST, `(read ${read})`, '', ...euLines].join('\n') + '\n');
sources.push({
  id: 'eu-countries',
  title: 'EU countries',
  publisher: 'European Union (Directorate-General for Communication)',
  url: EU_LIST,
  lang: 'en',
  version: `read ${read}`,
  read,
  licence: { kind: 'cc-by-4.0', url: 'https://creativecommons.org/licenses/by/4.0/', quote: 'Unless otherwise indicated (e.g. in individual copyright notices), content owned by the EU on this website is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence. This means that reuse is allowed, provided appropriate credit is given and changes are indicated.' },
  attribution: '© European Union, 1995-2026 (CC BY 4.0)',
  note: null,
  series: null,
});

if (problems.length) {
  console.error(`emergency: ${problems.length} problem(s)\n- ${problems.join('\n- ')}`);
  process.exit(1);
}

// The registry keeps its other sources; the pages of GOV.UK are replaced by this reading.
const registryFile = join(root, 'src', 'data', 'sources.json');
const registry = JSON.parse(readFileSync(registryFile, 'utf8'));
registry.sources = [...registry.sources.filter((source) => source.series !== 'govuk-fta' && source.id !== 'eu-countries'), ...sources];
writeFileSync(registryFile, `${JSON.stringify(registry, null, 2)}\n`);
writeFileSync(join(root, 'src', 'data', 'emergency.json'), `${JSON.stringify({ read, countries: emergency }, null, 2)}\n`);
writeFileSync(
  join(root, 'docs', 'research', 'EMERGENCY.md'),
  [
    '# Номери екстреної допомоги — що прочитано',
    '',
    `Зроблено \`scripts/emergency/build.mjs\`, сторінки прочитано ${read}. Країни — рішення Дмитра 27.11 («Список країн Європи»), перелік — \`scripts/emergency/countries.json\`.`,
    '',
    'Береться кожен рядок блоку «Emergency services» сторінки «Getting help» з номером і назвою служби, слово в слово; «not taken» — рядки цього блоку, які не взято (пояснення, застосунки, звичайні телефони, допомога на дорозі).',
    '',
    '| Країна | Джерело | Рядки |',
    '|---|---|---|',
    ...report,
    '',
  ].join('\n'),
);
console.log(`emergency: ${emergency.length} countries, ${sources.filter((s) => s.series === 'govuk-fta').length} pages of GOV.UK, ${members.length} member states of the EU`);
