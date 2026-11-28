// U.S. units in the cards after the U.S. Army manual, and their metric conversion (decision of 28.11: the number
// of the source stays, the metric one follows in brackets). The factors are NIST's, Guide to the SI, Appendix B.8
// (docs/sources/nist-sp811-b8.txt): a test checks each against that text, and every conversion in the cards
// against these factors. Where the source itself gives the metric value ("3 feet (1 meter)"), the source's stays.

export interface Unit {
  /** How the English text names it. */
  words: RegExp;
  /** The metric unit the brackets give. */
  metric: string;
  /** The row of NIST's table the conversion follows, word for word as kept. */
  nist: string;
  convert: (value: number) => number;
}

export const UNITS: Readonly<Record<string, Unit>> = {
  foot: { words: /^(?:feet|foot|ft)$/, metric: 'm', nist: 'foot (ft) | meter (m) | 3.048 E-01 (exact)', convert: (value) => value * 0.3048 },
  inch: { words: /^(?:inches|inch)$/, metric: 'cm', nist: 'inch (in) | centimeter (cm) | 2.54 E+00 (exact)', convert: (value) => value * 2.54 },
  quart: { words: /^quarts?$/, metric: 'l', nist: 'quart (U.S. liquid) (liq qt) | liter (L) | 9.463 529 E-01', convert: (value) => value * 0.9463529 },
  fahrenheit: { words: /^°F$/, metric: '°C', nist: 'degree Fahrenheit (temperature) (°F) | degree Celsius (°C) | t/°C = (t/°F - 32)/1.8 (exact)', convert: (value) => (value - 32) / 1.8 },
};

const NUMBER = String.raw`\d+(?:,\d{3})*(?:\.\d+)?`;
/** A U.S. measure may be a fraction too: "3/4 inch". */
const US_NUMBER = String.raw`\d+\/\d+|${NUMBER}`;
const US = new RegExp(String.raw`(${US_NUMBER})(?:\s*(?:to|–|-)\s*(${US_NUMBER}))?\s*(feet|foot|ft|inches|inch|quarts?|°F)\b`, 'g');
const METRIC = new RegExp(String.raw`^\s*\((${NUMBER})(?:\s*[–-]\s*(${NUMBER}))?\s*(m|cm|l|°C)\)`);

const value = (text: string) => {
  const [top, bottom] = text.split('/');
  return bottom === undefined ? Number(text.replace(/,/g, '')) : Number(top) / Number(bottom);
};
const decimals = (text: string) => text.split('.')[1]?.length ?? 0;

/**
 * What is wrong with the conversions of an English text; empty — nothing. Every U.S. unit is followed by its
 * metric value in brackets, which is NIST's conversion rounded as it is written — or the source's own words,
 * found in `source` (its kept text, spaces made one).
 */
export function conversionProblems(text: string, source: string): string[] {
  const out: string[] = [];
  for (const match of text.matchAll(US)) {
    const [whole, from, to, word] = match;
    const unit = Object.values(UNITS).find((one) => one.words.test(word ?? ''));
    if (!unit || !from) continue;
    const rest = text.slice((match.index ?? 0) + whole.length);
    const metric = METRIC.exec(rest);
    if (!metric) {
      out.push(`«${whole}» has no metric value in brackets`);
      continue;
    }
    const [bracket, mFrom, mTo, mUnit] = metric;
    if (mUnit !== unit.metric) out.push(`«${whole}${bracket}»: ${unit.metric}, not ${mUnit}`);
    if (Boolean(to) !== Boolean(mTo)) out.push(`«${whole}${bracket}»: a range and a single value`);
    const pairs: [string, string | undefined][] = [[from, mFrom], ...(to ? [[to, mTo] as [string, string | undefined]] : [])];
    const right = pairs.every(([us, metricText]) => metricText !== undefined && Math.abs(unit.convert(value(us)) - value(metricText)) <= 0.5 * 10 ** -decimals(metricText));
    const phrase = `${whole}${bracket}`.replace(/\s+/g, ' ');
    if (!right && !source.includes(phrase)) out.push(`«${phrase}» is not NIST's conversion, nor the source's own words`);
  }
  return out;
}

/** The numbers of a text, as values: English writes "8,000" and "0.95"; Ukrainian and Hungarian "8000" and "0,95". */
export function numbersIn(text: string, lang: string): number[] {
  const found = lang === 'en' ? text.match(new RegExp(NUMBER, 'g')) ?? [] : text.match(/\d+(?:,\d+)?/g) ?? [];
  return found.map((one) => (lang === 'en' ? value(one) : Number(one.replace(',', '.')))).sort((a, b) => a - b);
}
