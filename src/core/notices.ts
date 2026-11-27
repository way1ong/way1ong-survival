// Texts of the dictionaries that state a fact, and the sources each stands on (the owner's rule of 26.11: no
// fact without a source). Their sentences are in docs/topics/notices.md under the same key. The other notes over
// a card — "not a substitute for a doctor", "translation", "after a U.S. Army manual" — say where the words come
// from and state no fact; the emergency numbers carry their own sources (src/data/emergency.json).

export const FACT_TEXTS: Readonly<Record<string, readonly string[]>> = {
  /** 112 in the EU: the Commission's page; in Hungarian and Ukrainian a translation of it. */
  'emergency.eu': ['ec-112'],
};
