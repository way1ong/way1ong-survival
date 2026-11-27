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

## Другий прохід (27.11.2026)

| Джерело | Що каже власна сторінка (дослівно) | Вердикт |
|---|---|---|
| **ATP 3-50.21 «Survival»**, армія США, 2018 — у переліку Army Publishing Directorate «ACTIVE», дата 09/18/2018; armypubs.army.mil (сторінка PUB_ID=1005316 і PDF) | на обкладинці й титулі: «DISTRIBUTION RESTRICTION: Approved for public release; distribution is unlimited.» Позначок чужих авторських прав (copyright, courtesy, reprinted) у тексті не знайдено. Документ уряду США; що такі документи не охороняються авторським правом у США, сказано на сторінці NPS нижче | **так** (англійською) — за умови, що в картці чесно сказано: «посібник армії США» |
| National Park Service (США), nps.gov/aboutus/disclaimer.htm | «material created by the National Park Service and presented on this website, unless otherwise indicated, is generally considered in the public domain» … для комерційного вжитку — примітка «No claim to original U.S. Government works» | **так** (англійською) |
| Єврокомісія, сторінка «112 — the EU's emergency phone number», digital-strategy.ec.europa.eu/en/policies/112 і **угорською** …/hu/policies/112 | правова сторінка того ж сайту: «content owned by the EU on this website is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence» | **так**, але оригінал лише англійською: угорська версія сторінки — машинний переклад («eTranslation szolgáltatása által készített gépi fordítás»), тож угорською пишемо свій переклад з позначкою; українською сторінки немає |
| GOV.UK | «Crown copyright protection and is published under the Open Government Licence» | **так** |
| Met Office | «Website terms of use contain licence provisions under the terms of the UK Open Government Licence … v3.0» | **так** (крім даних за окремими ліцензіями) |
| Magyar Vöröskereszt, voroskereszt.hu | «© 2026 Magyar Vöröskereszt - Minden jog fenntartva!» | **ні** |
| Лісова служба США, fs.usda.gov | сторінку правил за вгаданою адресою не знайдено (404) | **?** |

### Що дає ATP 3-50.21

Розділи (зміст посібника): 2 — Survival medicine; 3 — Water (Water Sources and Indicators); 5 — Fire (Building a Fire, Fire Starting Techniques); 6 — Shelter and Clothing (Construction Methods); 7 — Movement and Navigation (Decision to Stay or Move, Water Crossings, **Determine Cardinal Direction**, Navigation Methods); 8 — Survival Equipment (Cordage and Lashing); додаток A — вузли й мотузки.

Не беремо за правилами обережності: розділ 4 Food у частинах про рослини («Plants», «Most common global plants to procure») — це «їстівне чи ні»; «Poisonous Plants» — лише як попередження, без розпізнавання; «Killing Devices», «Field-Expedient Weapons», «Butchering Mammals» — поза задумом програми. Посібник написано для військових; де порада стосується лише бою чи ухилення від противника — не беремо.

### Покриття після двох проходів

| Розділ | Українською | Англійською | Угорською |
|---|---|---|---|
| Сигнал про допомогу і 112 | **немає** (можливо, закон України про систему 112 на zakon.rada.gov.ua — не прочитано) | Єврокомісія | Єврокомісія |
| Гірський сигнал лиха | **немає** | **немає** | **немає** |
| Перша допомога | наказ МОЗ № 441 | NHS; ATP 3-50.21 розд. 2 | переклад |
| Що небезпечне | наказ МОЗ (блискавка, холод, спека) | NHS, ECDC, NWS, ATP | переклад |
| Вода, вогонь, укриття, сторони світу, мотузки й вузли | переклад | ATP 3-50.21, NPS | переклад |

## Відкрите

- ECDC: сторінку про захист від кліщів не прочитано (429 — забагато запитів); повторити пізніше.
- Закон України про систему екстреної допомоги за номером 112 (zakon.rada.gov.ua) — для картки 112 українською.
- Гірський сигнал лиха: придатного джерела не знайдено (ICAR і гірські рятувальники Англії й Уельсу — лише некомерційне).
- IFRC, ДСНС, British Red Cross, CDC відмовили автоматичним запитам (403) — не обходили.

## Третій прохід: перша допомога англійською й угорською (27.11.2026)

Питання Дмитра: чому англійською й угорською — переклад наказу МОЗ, а не власні джерела. Сторінки — `pages-2026-11-27-c.tgz`.

| Джерело | Що каже власна сторінка (дослівно) | Вердикт |
|---|---|---|
| Огляд настанов ERC 2025 з першої допомоги й базової реанімації дорослих з угорськими поправками: Betlehem J., Bánfai-Csonka H., Kovács E., Bánfai B. (Magyar Resuscitatiós Társaság; Betlehem J. — ще й Magyar Vöröskereszt), Orvosi Hetilap 2026, 167(33): 1294–1308, doi 10.1556/650.2026.33623; PDF у сховищі real.mtak.hu/246229 | у самому PDF: «A cikk a Creative Commons Attribution 4.0 International License (https://creativecommons.org/licenses/by/4.0/) feltételei szerint publikált Open Access közlemény»; але й: «az összefoglalónak nem célja a hivatkozott irányelvek szó szerinti fordítása és közlése, mint ahogy az egyes kórképekre vonatkozó teljes ellátási elvek részletekbe menő ismertetése sem» | ліцензія **так**; але це науковий огляд, а не офіційна настанова, і сам каже, що не дає повного опису допомоги при кожному стані |
| Настанови European Resuscitation Council 2025 (First Aid, Executive Summary), журнал Resuscitation | у PubMed Central їх немає (пошук 27.11); ліцензію на сторінці журналу не прочитано; книжка ERC для всіх — «All rights reserved» (перший прохід) | **?** — не брати |
| Закон Угорщини про авторське право, 1999. évi LXXVI., 1. § (4), njt.jog.gov.hu | «Nem tartoznak e törvény védelme alá a jogszabályok, közjogi szervezetszabályozó eszközök, a bírósági vagy hatósági határozatok, a hatósági vagy más hivatalos közlemények és ügyiratok, valamint más hasonló rendelkezések.» | угорські закони й офіційні акти брати можна — але угорського акта з кроками першої допомоги для всіх не знайдено: 5/2006. EüM — про службу порятунку, 58/2024. BM — тактична медицина поліції |
| NHS, загальні сторінки першої допомоги (`/tests-and-treatments/first-aid/`, `…/cpr/`, `…/recovery-position/`) | переадресовують на St John Ambulance (sja.org.uk) — сайт благодійної організації; адреса з середовища недоступна, ліцензію не прочитано | **?**; на NHS лишилися окремі стани (переохолодження, відмороження, тепловий удар, укуси змій…) і «How to resuscitate a child» |

Висновок: повного офіційного джерела першої допомоги з придатною ліцензією ні англійською, ні угорською не знайдено; угорською є відкритий науковий огляд, що сам себе не вважає повним описом допомоги. Рішення — за Дмитром.
