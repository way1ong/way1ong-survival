// The sentences of the sources, under the id of what is written after them (docs/topics/<name>.md):
//
//   ## <card or notice id>
//   Джерело: <source id>
//   > a sentence copied from the source, word for word
//   > another one
//
// One entry may have several sources: each "Джерело:" line starts the sentences of its source. Everything
// else in the file is free text for people. A test checks every sentence against the kept text of its source.

export interface QuoteGroup {
  source: string;
  quotes: string[];
}

export interface TopicEntry {
  id: string;
  groups: QuoteGroup[];
}

export function parseTopic(markdown: string): TopicEntry[] {
  const entries: TopicEntry[] = [];
  let entry: TopicEntry | null = null;
  let group: QuoteGroup | null = null;
  for (const raw of markdown.split('\n')) {
    const line = raw.trim();
    const heading = /^## (.+)$/.exec(line);
    if (heading) {
      entry = { id: (heading[1] ?? '').trim(), groups: [] };
      group = null;
      entries.push(entry);
      continue;
    }
    if (/^#{1}\s/.test(line)) {
      entry = null;
      group = null;
      continue;
    }
    const source = /^Джерело:\s*(\S+)\s*$/.exec(line);
    if (source && entry) {
      group = { source: source[1] ?? '', quotes: [] };
      entry.groups.push(group);
      continue;
    }
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote && group && quote[1]?.trim()) group.quotes.push(quote[1].trim());
  }
  return entries;
}

/** One way of writing spaces: the kept texts break lines where the sources' pages did. */
export function normalize(text: string): string {
  return text.replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** The sentences that are not word for word in their source's text; `texts` — source id → its kept text. */
export function missingQuotes(entries: readonly TopicEntry[], texts: ReadonlyMap<string, string>): string[] {
  const out: string[] = [];
  const kept = new Map([...texts].map(([id, text]) => [id, normalize(text)]));
  for (const entry of entries) {
    if (!entry.groups.length) out.push(`${entry.id}: no source`);
    for (const group of entry.groups) {
      const text = kept.get(group.source);
      if (text === undefined) {
        out.push(`${entry.id}: no kept text of source ${group.source}`);
        continue;
      }
      if (!group.quotes.length) out.push(`${entry.id}: no sentences of ${group.source}`);
      for (const quote of group.quotes) if (!text.includes(normalize(quote))) out.push(`${entry.id}: not in ${group.source}: «${quote}»`);
    }
  }
  return out;
}
