# Розвідка джерел — перший прохід (27.11.2026)

Мета: знайти офіційні джерела, чиї тексти можна брати в безкоштовну програму сайту, що продає послуги (отже «лише некомерційне» не годиться), і зрозуміти, які теми першої версії ними покрито. Ліцензію кожного джерела прочитано на його власній сторінці 27.11.2026; тексти сторінок збережено в `pages-2026-11-27.tgz` (текст без розмітки + адреса й код відповіді в `.meta`).

Вердикти: **так** — можна брати текст, і для комерційного сайту теж; **ні** — лише некомерційне, «всі права захищені» або потрібен дозвіл; **?** — не прочитано.

## Ліцензії

| Джерело | Що каже власна сторінка (дослівно) | Вердикт |
|---|---|---|
| **Наказ МОЗ України від 09.03.2022 № 441** «Про затвердження порядків надання домедичної допомоги особам при невідкладних станах», zakon.rada.gov.ua/laws/show/z0356-22 — «чинний», набрав чинності 08.04.2022 | Акт органу державної влади. Цивільний кодекс України (435-IV, редакція від 05.08.2026), ст. 434: «Не є об'єктами авторського права: 1) акти органів державної влади та органів місцевого самоврядування (закони, укази, постанови, рішення тощо), а також їх офіційні переклади» | **так** (українською) |
| Сайт МОЗ України, moz.gov.ua | «Всі матеріали на цьому сайті розміщені на умовах ліцензії Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International» | **ні** — лише некомерційне; беремо сам наказ із zakon.rada.gov.ua, а не сторінки сайту |
| **NHS website**, nhs.uk (Велика Британія) | «Copyright and database rights in NHS Website Content are released free-of-charge under the current version of the Open Government Licence» … «you can use NHS Website Content, except where specified, including copying it, adapting it, and using it for any purpose, including commercially» | **так** (англійською); підпис «Contains public sector information licensed under the Open Government Licence v3.0.»; без чужих картинок і без медичних «пристроїв» сайту |
| Open Government Licence v3.0, nationalarchives.gov.uk | «exploit the Information commercially and non-commercially for example, by … including it in your own product or application»; «adapt the Information» | основа для NHS |
| **ECDC** (Європейський центр контролю хвороб) | «licenced in accordance with the CC BY 4.0 licence … may be reproduced, adapted and/or distributed … for commercial or non-commercial purposes» за трьох умов: ECDC названо автором, посилання на CC BY 4.0, позначено зміни | **так** |
| **Європейська комісія**, commission.europa.eu | «content owned by the EU on this website is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence. This means that reuse is allowed, provided appropriate credit is given and changes are indicated.» | **так**; матеріали ЄС часто є всіма мовами ЄС, зокрема угорською |
| **National Weather Service** (США), weather.gov | «in the public domain, unless specifically noted otherwise, and may be used without charge for any lawful purpose so long as you do not: 1) claim it is your own …, 2) use it in a manner that implies an endorsement …, 3) modify its content and then present it as official government material» | **так** (англійською); не видавати змінений текст за офіційний |
| EPA (США), epa.gov | «may be freely distributed and used for non-commercial, scientific and educational purposes. Commercial use of the documents available from the EPA websites may be protected» | **ні** — для комерційного вжитку не гарантовано |
| European Resuscitation Council, книжка «Resuscitation for Everyone» 2025 (erc.edu) | «© European Resuscitation Council 2025. All rights reserved. No part of this publication may be reproduced … without the prior written permission» | **ні** |
| ICAR (міжнародна комісія гірського порятунку), alpine-rescue.org | «may only be used for strictly non-commercial purposes … commercial use is solely permitted with prior consent» | **ні** |
| Mountain Rescue England and Wales | «you use the material for information purposes and for your non-commercial, personal use only» | **ні** |
| Червоний Хрест України, redcross.org.ua | «Всі права захищені. При використанні контенту звертайтеся до нашого веб-сайту.» | **ні** |
| Katasztrófavédelem (Угорщина), katasztrofavedelem.hu | «A honlap eredeti tartalma … csak a tartalomszolgáltató előzetes írásbeli engedélyével használható fel» | **ні** |
| Országos Mentőszolgálat (Угорщина), mentok.hu | на «Impresszum» і «Nyilatkozatok» відкритої ліцензії немає; є лише розділи про повторне використання публічних даних за договором | **ні** (без відкритої ліцензії) |
| IFRC, ДСНС, British Red Cross, CDC | сайти відповіли відмовою 403 (захист від автоматичних запитів) — не обходили | **?** |
| Magyar Vöröskereszt, njt.hu (угорські закони) | сайт перенаправляє на адресу без `www`, якої немає в дозволених / сервер не відповів | **?** |

## Що з цього покривають придатні джерела

| Розділ | Українською | Англійською | Угорською |
|---|---|---|---|
| Перша допомога | наказ МОЗ № 441: 29 порядків, серед них раптова зупинка кровообігу (дорослі, діти), масивна кровотеча, переломи кінцівок, травма голови й хребта, шок, термічні опіки, **переохолодження та відмороження**, тепловий удар, **ураження струмом або блискавкою**, утоплення, анафілаксія, гіпоглікемія | NHS: переохолодження, відмороження, тепловий удар, зневоднення, укуси змій, комах, хвороба Лайма, розтягнення, перелом ноги | **немає** — лише переклад |
| Що небезпечне | наказ МОЗ (блискавка, холод, спека) | NHS (змії, кліщі, комахи), ECDC (кліщі; сторінку ще не прочитано — 429), NWS (блискавка, порада «Lightning Safety Outdoors») | **немає** — можливо, матеріали ЄС угорською |
| Сигнал про допомогу і 112 | **немає** | Єврокомісія (сторінку про 112 ще не прочитано) | можливо, Єврокомісія угорською |
| Вода, вогонь, укриття, орієнтування без приладів, саморобні засоби | **немає** | **немає** (EPA — ні) | **немає** |

## Висновки

1. **Перша допомога є, але кожною мовою — інше джерело.** Українською можна дослівно за наказом МОЗ; англійською — за NHS; угорською придатного оригіналу не знайдено. Настанови двох країн можуть розходитися, тоді поради різнилися б залежно від мови. Варіанти — на вибір Дмитра (нижче).
2. **NHS пише для Британії**: «call 999», «Go to A&E». Ліцензія дозволяє змінювати текст, але номер 112 у картці має спиратися на окреме джерело (Єврокомісія), а зміну треба позначити.
3. **Гірський сигнал лиха** (ICAR, гірські рятувальники Англії й Уельсу) — лише некомерційне. Потрібне інше джерело, або теми не буде.
4. **Вода, вогонь, укриття, орієнтування, саморобні засоби** — у першому проході не знайшлося жодного придатного джерела. Кандидати на другий прохід: армійський посібник США з виживання FM 21-76 і його наступник (державні документи США; умову поширення треба прочитати в самому документі), Служба національних парків США, Лісова служба США, CDC (знезараження води), Met Office і GOV.UK (OGL). Можливо, ці розділи доведеться будувати на американських державних джерелах — тоді чесно сказати, що це посібники США.

## Відкрите: другий прохід

Адреси, яких бракує в мережі середовища: `voroskereszt.hu`, `archive.org` і `armypubs.army.mil` (FM 21-76), `www.nps.gov`, `www.fs.usda.gov`, `www.metoffice.gov.uk`, `www.gov.uk`, `digital-strategy.ec.europa.eu` (112), сторінка журналу настанов ERC (щоб прочитати ліцензію самих настанов 2025 року). Повторити: ECDC (429 — забагато запитів), njt.hu.
