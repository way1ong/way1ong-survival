# Вода — речення джерела

Як читати: `## <id картки>`; «Джерело:» — id із `src/data/sources.json`; рядки з `>` — речення джерела дослівно (тест `src/core/topics.test.ts` звіряє їх із `docs/sources/<id>.txt`). Тексти карток — у словниках (`cards.<id>`), українською й угорською — переклад.

Джерело — посібник армії США ATP 3-50.21 «Survival» (2018), розділ 3 «Water» (рішення 27.11 і 28.11); у кожній картці позначка «За посібником армії США». Англійською картки близькі до речень посібника: «isolated person» — «ви» чи «людина», «stagnate» — «stagnant». Числа посібника лишаються, а метри, літри й градуси Цельсія в дужках — наш перерахунок за NIST (`src/core/units.ts`, тест; позначка `notices.metric`). Числа в усіх трьох мовах однакові (тест `src/core/units.test.ts`).

Що не взято (рішення 28.11): вода з рослин (бамбук, ліани, банан, кокос, сонячні «мішки» на гілках) — для цього треба розпізнавати рослини; море, пляж і пустеля (таблиця 3-1, морський лід, «beach well») — не для першої версії; сонячний конденсатор у ямі — сам посібник каже, що він забирає багато часу й сил і «may not be worth the return»; краплі йоду й відбілювача на кварту води — лише кип'ятіння й таблетки за інструкцією виробника; комерційні фільтри докладно (п. 3-46, 3-47). Схеми 3-2, 3-11 і 3-12 — з посібника; під ними — переклад слів, написаних на схемі.

## water-safe
Джерело: atp-3-50-21
> Water is one of the isolated person's most urgent needs
> If you have to choose between running water and stagnate water, choose running water but make sure it is also appropriately treated.
> Do not eat snow. The body has to heat the water and melt the snow once you eat it and is a foolish expenditure of calories that are already in short supply.
> Do not drink saltwater, even a small amount.
> Do not drink water found in natural depressions. It is stagnate water and is often heavily contaminated with pesticides, garbage and other debris.
> Do not drink urine or alcoholic beverages.
> Consider all surface water to be contaminated with human and animal waste with the possible exception of very high mountain streams or springs found in uninhabited areas.
> At a temperature of 68° F with limited physical activity, personnel will normally require 2 to 3 quarts of water a day to maintain efficiency.
> Water loss increases with heat exposure.
> The time and effort required obtaining water and the decrease in the thirst response in cold weather favors the development of dehydration.
> Avoid water that has a foul odor or smell, and water potentially contaminated with toxins
> Springs are typically the safest open source to drink from, if the seepage is located, but should be purified whenever the means are available as a precaution.
> water from lakes, streams, ponds, swamps, and springs-especially any water near human settlements or in the tropics-will need to be purified.
> Do not eat without melting! Eating snow or ice can reduce body temperature and lead to more dehydration.
> Isolated persons drinking non-potable water may become ill from ingesting harmful organisms that can cause diarrhea and lead to death.
> When possible, all water should be purified by boiling, chemical disinfectants, or commercial filters that purify water through the filtration of extremely fine particulates.

## water-rain-snow-dew
Джерело: atp-3-50-21
> Almost any environment has water present to some degree.
> The first step to procuring water is obtaining a container that can temporarily hold water to enable purification and that can be sealed for long-term storage.
> Water containers can be constructed out of plastic bags,
> birch bark and pitch containers; as well as gourds, tarps, sheets of plastic and waterproof evasion charts.
> Fresh rainwater collected into containers does not require purification. However, rain that runs down leaves and other vegetation on its way to the container can contaminate the water and should be purified. If the isolated person allows rain to wash contaminants off overhead leaves for at least 15 min, it is safe to drink immediately.
> Collect rainwater by putting out improvised nonporous items to catch the rains as it falls from the sky.
> Use fresh, clean snow as a water source. Place containers filled with snow near a fire or between clothing layers to allow body heat to melt it. Adding water to snow will help it melt faster. Avoid directly eating snow as it lowers the body's core temperature and requires the body to use more energy reserves than if the snow is heated externally.
> Place snow on any porous material (such as cotton or parachute nylon), gathering up the edges, and suspending the "bag" of snow from any support structure near a fire. Radiant heat will melt the snow, and water will drip to the lowest part of the bag. Place a water container under the snow machine to collect the water. The isolated person only needs to fill the machine with snow as required and empty the container of water when full.
> Snow and ice are no purer than the water from which they come
> Melt and purify
> Ice provides a more concentrated source of water than snow and requires less heat to do so. Melt snow or ice with minimal effort by placing it on a dark piece of material in sunlight.
> Collect dew by tying fine grasses, a sponge, or cloth around the lower legs and ankles and walking through tall grass to soak up the dew water. Collect up to one quart of water or more by wringing it out into a container.
> Water containers in a cold weather environment should be stores upside down to enable its use when frozen. Since water freezes from top to bottom, any unfrozen water would be on the bottom where it is accessible.

## water-seepage
Джерело: atp-3-50-21
> A seepage well is a hole dug into the ground that will tap into the water polled or moving below the ground surface. If located, this water will pool in a seepage well and can be collected.
> This technique can be used in most environments. Outside bends of a dry riverbed, the foot of cliffs or rocks, low areas protected from the sun, or damp subsurface sand would be ideal locations for a seepage well.
> A sediment hole or seepage basin can be built by digging a hole alongside a water source allowing the ground to filter the water through the soil. The water will flow through the surrounding soil and pool in the hole, ready for purification.
> After water has been filtered to improve palatability, it still requires purification prior to consumption.

## water-purify
Джерело: atp-3-50-21
> If the water is muddy, stagnant, and foul-smelling, it can be cleaned by placing it in a container and letting it stand for several hours so the sediment settles to the bottom. The water can be aerated by pouring it between two containers. This will improve the taste.
> If time and materials are available, a water filter can be improvised by using material or a large container and building layers of material in the container. The filter system is made from natural materials like sand, crushed rock or gravel, and charcoal.
> The filter will remove large and small particles from the water, aerate it for taste, and allow the isolated person to filter larger amounts of water for consumption.
> Charcoal from a fire can also be used to improve water. When added to water, and allowed to set for 45 minutes, it helps remove odor and absorbs agricultural and industrial chemicals. After water has been filtered to improve palatability, it still requires purification prior to consumption.
> Boiling is the safest method for purifying water. Bringing water to a rolling boil for one minute at sea level will kill all waterborne pathogens. If above 8,000 feet, the boiling time should be extended to 3 minutes. These boiling times are different than the time required for sterilizing water for medical use.
> When using chemicals, isolated persons must remember to let the water set for the prescribed amount of time and then open the cap and let the purified water rinse any unpurified water from the threads of the container before touching it to their mouth.
> When using water purification tablets always follow the manufacturer's instructions for the recommended use of the product. Always verify that the tablets are within their specified stale date to ensure proper dosage.
> When adding drink mix to the water to improve taste, always ensure that the water has completed the purification process before adding the mixture to the water.
> Two prevalent pathogens found in most water sources throughout the world are
> The only effective means of neutralizing cryptosporidium is by boiling or by using a commercial micro filter or reverse-osmosis filtration system. Chemical disinfectants such as iodine tablets or bleach have not shown to be 100 percent effective in eliminating cryptosporidium.
> most filters do not remove viruses.
