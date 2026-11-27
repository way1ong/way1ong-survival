// The notes over a card (src/core/cards.ts, cardNotices) and what each stands on. "Not a substitute for a
// doctor" is the owner's rule of 26.11, "translation" and "after a U.S. Army manual" say where the words come
// from; only the emergency number is a fact, and it is written after a source in every language — its sentences
// are in docs/topics/notices.md.
import type { NoticeKey } from './cards.ts';

export const NOTICE_SOURCES: Readonly<Record<NoticeKey, Readonly<Record<string, string>> | null>> = {
  notDoctor: null,
  call112: { uk: 'moz-441', hu: 'ec-112', en: 'ec-112' },
  translation: null,
  usArmy: null,
};
