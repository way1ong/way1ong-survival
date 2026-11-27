# Тексти словників, що кажуть про факти, — речення джерел

Як читати: заголовок — ключ тексту в словниках; «Джерело:» — id із `src/data/sources.json`; рядки з `>` — речення джерела дослівно. Тест `src/core/topics.test.ts` звіряє кожне з текстом джерела в `docs/sources/<id>.txt`. Перелік таких текстів — `src/core/notices.ts`.

Номери екстреної допомоги країн — не тут: кожен рядок разом із реченням джерела записано в `src/data/emergency.json` (робить `scripts/emergency/build.mjs`, звіряє `src/core/emergency.test.ts`).

## emergency.eu
Джерело: ec-112
> 112 is the European emergency phone number, available everywhere in the EU, free of charge.
> 112 functions alongside existing national emergency numbers.
