# Джерела й ліцензії

Правило: ліцензію читаємо на сторінці самого джерела; «лише некомерційне» не беремо. Підпис, якого вимагає ліцензія, стоїть у картці й у «Про програму». Розвідка — `docs/research/SOURCES.md`.

## Використано

Реєстр для програми — `src/data/sources.json` (тест перевіряє поля й ліцензію); збережені тексти — `docs/sources/<id>.txt`.

| id | Що | Джерело | Ліцензія (власні слова) | Прочитано | Де використано |
|---|---|---|---|---|---|
| `moz-441` | Наказ МОЗ України від 09.03.2022 № 441 «Про затвердження порядків надання домедичної допомоги особам при невідкладних станах» — чинний | https://zakon.rada.gov.ua/laws/show/z0356-22 | акт органу державної влади: Цивільний кодекс України, ст. 434 — «Не є об'єктами авторського права: 1) акти органів державної влади…» | 27.11.2026 | 112 для України на панелі екстреної допомоги; картки першої допомоги (8 карток порції 2), українською дослівно |
| `ec-112` | «112 - the EU's emergency phone number», Last update 23 November 2026 | https://digital-strategy.ec.europa.eu/en/policies/112 | CC BY 4.0: «content owned by the EU on this website is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence» — підпис у реєстрі | 27.11.2026 | речення про 112 у ЄС на панелі екстреної допомоги (`emergency.eu`; угорською й українською — наш переклад: угорська сторінка Єврокомісії — машинний переклад); рядок 112 для семи країн ЄС |
| `nhs-999` | NHS, «When to call 999»; Page last reviewed: 3 February 2023, next review due: 3 February 2026 (строк перегляду минув, сторінка та сама) | https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-call-999/ | OGL v3.0: «Copyright and database rights in NHS Website Content are released free-of-charge under the current version of the Open Government Licence» | 27.11.2026 | номер для Британії |
| `nps-emergency-plan-pdf` | «NPS Outdoor Emergency Plan», PDF від 21.06.2023 (дата файлу; у самому PDF дати немає) | https://www.nps.gov/subjects/healthandsafety/upload/NPS-Outdoor-Emergency-Plan-508c.pdf | твір уряду США; правила NPS, https://www.nps.gov/aboutus/disclaimer.htm: «material created by the National Park Service and presented on this website, unless otherwise indicated, is generally considered in the public domain»; для комерційного вжитку — примітка «No claim to original U.S. Government works.» (стоїть у підписі) | 27.11.2026 | картки «Якщо ви заблукали», «Сигнали для рятувальників» |
| `nps-emergency-plan` | «Outdoor Emergency Plan», Last updated: June 21, 2023 | https://www.nps.gov/articles/gtgemergencyplan.htm | те саме | 27.11.2026 | картка «Якщо заблукав хтось із групи» |
| `govuk-<країна>` (42 сторінки, серія `govuk-fta`) | GOV.UK Foreign travel advice, сторінка «Getting help» кожної країни; версія — «Updated» і «Still current at» з першої сторінки поради | https://www.gov.uk/foreign-travel-advice/<країна>/getting-help | OGL v3.0: «All content is available under the Open Government Licence v3.0, except where otherwise stated» | 27.11.2026 | номери екстреної допомоги країн |
| `eu-countries` | «EU countries» — перелік держав-членів ЄС | https://european-union.europa.eu/principles-countries-history/eu-countries_en | CC BY 4.0 (та сама правова сторінка ЄС) | 27.11.2026 | які країни отримують рядок Єврокомісії про 112 |
