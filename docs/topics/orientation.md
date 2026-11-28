# Де я і куди йти — речення джерела

Як читати: `## <id картки>`; «Джерело:» — id із `src/data/sources.json`; рядки з `>` — речення джерела дослівно (тест `src/core/topics.test.ts` звіряє їх із `docs/sources/<id>.txt`). Тексти карток — у словниках (`cards.<id>`), українською й угорською — переклад.

Джерело — посібник армії США ATP 3-50.21 «Survival» (2018), розділ 7 «Movement and Navigation», частина «Determine Cardinal Direction» (рішення 27.11 і 28.11); у кожній картці позначка «За посібником армії США». Числа посібника лишаються, у дужках — сантиметри за NIST (`src/core/units.ts`, тест).

У посібнику (і в самому PDF) межа для способу кінчика тіні надрукована як «66'/2°». Картка не «виправляє» цього числа з пам'яті, а каже «понад приблизно 66°»; для полуденного способу посібник дає рівне «66°». Зі схеми 7-8 узято лише частину A (напрямок): частина B — «годинник із тіні», якого в картках немає, а світлину людини не взято. Схема 7-13 (плаваюча голка на карті з магнітним схиленням) — про карту й компас, тож не взята.

Що не взято: переправи через річки й плоти, GPS, рахування кроків, карта й азимут (у першій версії — без приладів, рішення 26.11); «годинник із тіні» і спосіб «24-hour clock»; південне небо (Південний Хрест); складніший саморобний компас із вістрям ручки (п. 7-42); «Decision to Stay or Move» — військове (картка «Якщо ви заблукали» вже каже лишатися на місці).

## direction-shadow
Джерело: atp-3-50-21
> The sun always rises in the east and sets in the west, but not exactly due east or due west. There is also some seasonal variation. Shadows will move in the opposite direction of the sun. In the Northern Hemisphere, they will move from west to east, and will point north at noon.
> The shadow-tip method is ineffective for use beyond 66'/2° latitude in either hemisphere due to the position of the sun above the horizon.
> Place a stick or branch into the ground at a level spot where a distinct shadow will be cast. Mark the shadow tip with a stone, twig, or other means. This first shadow mark is always the West direction.
> Wait 10 to 15 minutes until the shadow tip moves a few inches. Mark the new position of the shadow tip in the same way as the first.
> Draw a straight line through the two marks to obtain an approximate east-west line.
> Standing with the first mark (west) to your left, the other directions are simple; north is to the front, east is to the right, and south is to the rear.
> the first shadow-tip mark is always in the west direction, and the second mark in the east direction, any place on earth.
> Inclining the stick to obtain a more convenient shadow does not impair the accuracy of the shadow-tip method.
> A flat spot, the size of the hand, is all that is necessary for shadow-tip markings
> any stationary object (the end of a tree limb or the notch where branches are jointed) serves just as well as an implanted stick because only the shadow tip is marked.
> It is more accurate and may be used at all latitudes less than 66° at all times of the year.
> Place a stick or branch into the ground vertically at a level spot where a shadow at least 12 inches long will be cast. Mark the shadow tip with a stone, twig, or other means. This must be done 5 to 10 minutes before noon (when the sun is at its highest point [zenith]).
> Trace an arc using the shadow as the radius and the base of the stick as the center. A piece of string, shoelace, or a second stick may be used to do this.
> As noon approaches, the shadow becomes shorter. After noon, the shadow lengthens until it crosses the arc. Mark the spot as soon as the shadow tip touches the arc a second time.
> Draw a straight line through the two marks to obtain an east-west line.

## direction-watch
Джерело: atp-3-50-21
> This method requires the use of a common analog watch—one that has hands. Use of this type of watch will enable the isolated person to determine the approximate true north and true south
> In the North Temperate Zone only, the hour hand is pointed toward the sun. A south line can be found midway between the hour hand and 1200 hours, standard time.
> If on daylight savings time, the northsouth line is found between the hour hand and 1300 hours.
> If there is any doubt as to which end of the line is north, remember that the sun is in the east before noon and in the west after noon.
> The watch may also be used to determine direction in the South Temperate Zone. However, the method is different. The 1200-hour dial is pointed toward the sun
> The watch method can be inaccurate, especially in the lower latitudes, and may cause circling.
> If you only have a digital watch, draw a clock face on a circle of paper with the correct time on it and use it to determine your direction at that time. You may also choose to draw a clock face on the ground

## direction-stars
Джерело: atp-3-50-21
> Use them to locate Polaris, also known as the polestar or the North Star. Polaris is considered to remain stationary, as it rotates only 1.08 degrees around the northern celestial pole. The North Star is the last star of the Little Dipper's handle and can be confused with the Big Dipper. However, the Little Dipper is made up of seven rather dim stars and is not easily seen unless far away from any town or city lights. Confusion can be prevented by using both the Big Dipper and Cassiopeia together. The Big Dipper and Cassiopeia are generally opposite each other and rotate counterclockwise around Polaris, with Polaris in the center. The Big Dipper is a seven-star constellation in the shape of a dipper.
> Forming the outer lip of this dipper are the "pointer stars" because they point to the North Star. Mentally draw a line from the outer bottom star to the outer top star of the Big Dipper's bucket. Extend this line about five times the distance between the pointer stars. The North Star will be located along this line.
> Cassiopeia or the Lazy W has five stars that form a shape like a "W." One side of the "W" appears flattened or "lazy."
> The North Star can be found by bisecting the angle formed on the lazy side. Extend this line about five times the distance between the bottom of the "W" and the top. The North Star is located between Cassiopeia and Ursa Major (the Big Dipper). After locating the North Star, locate the North Pole or true north by drawing an imaginary line directly to the earth
> If the moon rises before the sun has set, the illuminated side will be the west. If the moon rises after midnight, the illuminated side will be the east. This obvious discovery provides a rough east-west reference during the night.
> The location of the isolated person in the Northern or Southern Hemisphere determines which constellation is used to determine north or south direction.

## direction-compass
Джерело: atp-3-50-21
> Improvised compasses can be constructed using a piece of ferrous metal, either needle-shaped or a flat double-edged razor blade, and a piece of thread or long hair from which to suspend it. Magnetize or polarize the metal by slowly stroking it in one direction on a piece of silk or carefully through your hair using deliberate strokes. You can also polarize the metal by stroking it repeatedly at one end with a magnet. Always stroke in one direction only. Suspend the needle or blade with the hair. The needle will gradually align itself in the north-south direction.
> If you have a battery and some electric wire, you can polarize the metal electrically. The wire should be insulated. If it is not insulated, wrap the metal object in a single, thin strip of paper or a leaf to prevent contact. The battery must be a minimum of 2 volts. Form a coil with the electric wire and touch its ends to the battery's terminals. Repeatedly insert one end of the metal object in and out of the coil. The needle will become an electromagnet. When suspended from a piece of nonmetallic string or floated on a small piece of wood, cork, or a leaf in water, it will align itself with a north-south line.
> Oil the needle by passing it through your hair. Place the needle gently on the water surface.
> The needle will gradually align itself in the north-south direction. As an alternative, the magnetized needle is placed on a small piece of cork, leaf, duct tape, etc.

## direction-signs
Джерело: atp-3-50-21
> Moss growing on a tree cannot be relied on to indicate north because moss grows completely around some trees. Actually, growth is lusher on the south-facing side of trees in the northern hemisphere and on the north-facing side of trees in the southern hemisphere. If there are several felled trees around for comparison, look at the stumps. Growth is more vigorous on the side toward the equator, and the tree growth rings will be more widely spaced. Conversely, the tree growth rings will be closer together on the side toward the poles.
> Wind direction may be helpful in some instances where there are prevailing directions and the isolated persons know what they are.
> Recognizing the differences between vegetation and moisture patterns on north- and south-facing slopes can aid in determining direction. In the northern hemisphere, north-facing slopes receive less sun than south-facing slopes and are therefore cooler and damper.
> north-facing slopes retain patches of snow.
> trees and open areas on south-facing slopes and the southern side of boulders and large rocks are the first to lose their snow.
