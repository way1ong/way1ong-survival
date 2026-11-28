# Картка на порталі way1ong.eu

Матеріали для сесії сайту («Головний way1ong.eu», репозиторій `way1ong/public`). Картку додає сесія сайту, коли програма відповідатиме на своїй адресі (рішення 27.11): у каталозі — лише те, що можна відкрити.

## Дані для `site.config.ts`

- розділ — «Навчання» (`learning`, рішення 27.11);
- адреса — `https://survival.way1ong.eu/` (та сама, що в `src/config.ts`);
- мови самої програми — українська, угорська, англійська (у меню програми — саме в такому порядку);
- встановлюється з браузера (маніфест, без інтернету) — так;
- демо на сайті — немає;
- обкладинка — `docs/portal/survival.webp`: справжній знімок програми, 360×480 (телефон), англійською, як у Sky й ігор (програма для Європи); на ній — заголовок і перелік розділів, жодних особистих даних.

## Тексти картки

Без чисел (правило сайту: числа — лише з конфігу).

**Українською**
- Позначка: Вебзастосунок
- Назва: Довідник із виживання в лісі й горах
- Опис: Як покликати допомогу — з номерами екстреної допомоги вашої країни; перша допомога; кліщі, змії, ужалення й гроза; вода, вогонь, укриття, сторони світу без приладів, вузли. Кожна картка — з офіційного джерела і чесно каже, коли спосіб працює, наскільки він надійний і де помиляються. Без реклами й акаунтів, працює без інтернету.

**Угорською**
- Позначка: Webalkalmazás
- Назва: Túlélési kézikönyv erdőre és hegyekre
- Опис: Segélyhívás az Ön országának segélyhívószámaival; elsősegély; kullancsok, kígyók, csípések és zivatar; víz, tűz, menedék, tájékozódás eszközök nélkül, csomók. Minden kártya hivatalos forrásból származik, és őszintén megmondja, mikor működik a módszer, mennyire megbízható, és hol szoktak hibázni. Reklám és fiók nélkül, internet nélkül is működik.

**Англійською**
- Позначка: Web app
- Назва: A survival guide for forests and mountains
- Опис: Calling for help, with the emergency numbers of your country; first aid; ticks, snakes, stings and thunderstorms; water, fire, shelter, finding your way without instruments, knots. Every card comes from an official source and says honestly when the method works, how reliable it is and where people go wrong. No ads or accounts, works offline.

## Як зроблено обкладинку

Збірка програми (`npm run build`), перегляд у Chromium: вікно 360×480, світла тема, англійська, сторінку прокручено до переліку розділів (заголовок програми лишається вгорі); знімок у PNG перетворено на WebP. Перезняти — після змін у розділах.
