# Укриття — речення джерела

Як читати: `## <id картки>`; «Джерело:» — id із `src/data/sources.json`; рядки з `>` — речення джерела дослівно (тест `src/core/topics.test.ts` звіряє їх із `docs/sources/<id>.txt`). Тексти карток — у словниках (`cards.<id>`), українською й угорською — переклад.

Джерело — посібник армії США ATP 3-50.21 «Survival» (2018), розділ 6 «Shelter and Clothing» (рішення 27.11 і 28.11); у кожній картці позначка «За посібником армії США». Англійською картки близькі до речень посібника («isolated person» — «ви»). Числа посібника лишаються, у дужках — метри й сантиметри за NIST (`src/core/units.ts`, тест). У збереженому тексті подекуди злито слова, які PDF переносив з рядка на рядок («fireto-shelter», «largediameter»): речення нижче наведено так, як у збереженому тексті.

Що не взято: сніжні укриття (сніжна печера, яма біля дерева) і пустеля, болото, піднятий настил — не для першої версії; укриття з парашута («A-frame» з парашутної тканини) і поради, як сховатися від противника (п. 6-16, крок 9; «concealment», «escape routes»); «poisonous plants» серед вимог до місця — їх треба розпізнавати (правило 3). Одяг (принцип «COLDER», п. 6-7) — поки не взято: у погодженому плані порції його немає.

## shelter-site
Джерело: atp-3-50-21
> A shelter can protect you from the sun, insects, wind, rain, snow, hot or cold temperatures, and enemy observation.
> In some areas, your need for shelter may take precedence over your need for food and possibly even your need for water. For example, prolonged exposure to cold can cause excessive fatigue and weakness.
> When isolated persons have prioritized shelter as a necessity, they must start looking for it as soon as possible. A good shelter site will contain enough materials to improvise the type of shelter needed as well as be large enough and level enough for the isolated person to lie down and protect their equipment.
> Provides elemental sun, wind, rain, and snow protection.
> Is free of dead trees that may fall.
> Is located in an area free from threat of avalanches, rockslides, mudslides, Flash-flood areas and high-water marks.
> Is free from insects, reptiles, and poisonous plants. Low-lying areas that may be a cold sump.
> Is suitable for signaling and recovery.
> How much time and effort will I need to build the shelter?
> Will the shelter adequately protect me from the elements?
> Do I have the tools and needed materials to complete the shelter or do I need to improvise?
> How long will I be at this site?
> Site preparation includes brushing away rocks and twigs from the sleeping area and cutting back overhanging vegetation. Look for loose rocks, dead limbs, coconuts, or other material that could fall on the shelter. Remember thick, brushy, low ground also harbors more insects. Inspect the site for venomous snakes, ticks, mites, scorpions, and stinging ants.
> Using what is already available prevents the need for the complete construction of a shelter from scratch, and will save, time, energy, and materials (see figure 6-1).
> Caves.
> Rocky crevices.
> Small depressions.
> Large rocks on leeward sides of hills.
> Clumps of bushes.
> Large trees and low-hanging limbs.
> Fallen trees with thick branches.
> Uprooted tree buttresses.
> A wall or existing manmade structure.
> A vehicle or aircraft.
> A tarp, poncho, piece of plastic, space blanket, or evasion chart (EVC).
> Any material that is found in the area that will provide top cover.
> Regardless of type, the shelter must provide whatever protection is needed
> These natural material shelters usually require the most time and energy to construct.
> It is unwise to build a fire in or near an aircraft or vehicle wreckage, especially if it is used as a shelter. The possibility of igniting spilled lubricants or fuels is great.

## shelter-tarp
Джерело: atp-3-50-21
> It takes only a short time and minimal equipment to build this lean-to. For the lean-to, required items are a poncho, 7 to 10 feet of rope or parachute suspension line, three stakes about 1 foot long, and two trees or two poles 7 to 10 feet apart. Before selecting the trees to be used or the location of the poles, check the wind direction. Ensure that the back of the lean-to will be into the wind
> Tie off the hood of the poncho. Pull the drawstring tight, roll the hood long ways, fold it into thirds, and tie it off with the drawstring.
> Cut the rope in half. On one long side of the poncho, tie half of the rope to the corner grommet. Tie the other half to the other corner grommet.
> Attach a drip stick (about a 4-inch stick) to each rope about 1 inch from the grommet. These drip sticks will keep rainwater from running down the ropes into the lean-to.
> Tie the ropes about waist high on the trees. Use a round turn and two half hitches with a quick-release knot.
> Spread the poncho and anchor it to the ground, putting sharpened sticks through the grommets and into the ground.
> If the lean-to will be used for more than one night or rain is expected, make a center support for the lean-to. Make this support with a line. Attach one end of the line to the poncho hood and the other end to an overhanging branch. Make sure there is no slack in the line. Alternatively, place a stick upright under the center of the lean-to. However, this method will restrict space and movements in the shelter.
> For additional protection from wind and rain, place some brush, a rucksack, or other equipment at the sides of the lean-to.
> To reduce heat loss to the ground, place some type of insulating material, such as leaves or pine needles, inside the lean-to.
> When at rest, isolated persons lose as much as 80 percent of their body heat to the ground.
> Porous materials will not shed moisture unless they are stretched tightly at an angle of sufficient pitch, which will encourage run-off instead of penetration. An angle of 40 to 60 degrees is recommended for the pitch of the shelter. The material stretched over the framework should be wrinkle-free and tight. Do not touch the material when water is running over it as this will break the surface tension at that point and allow water to drip into the shelter.
> If the material is not stretched tight, any moisture will pool in the wrinkles and leak into the shelter.
> However, if using a piece of plastic or parachute material, no grommets will be available. In those instances, grab a small amount of material such as dirt, pine duff, an acorn, or other similar available items about 1 inch in diameter. Grasp the piece of shelter material and place the small amount of button material on the backside of the shelter material. Gather the material around the button material making a protrusion or round bulge. Put a small staking line with a slip loop over the round bulge in the shelter material and secure the slip loop so that the line is now temporarily attached to the material. The shelter material can now be staked to the ground and any wrinkles can be pulled out of the material to create the proper pitch and tightness.
> To procure stakes, sharpen several sticks 1 inch in diameter by 12 inches in length to a point, so they can be easily driven into the ground at about a 45-degree angle to provide opposing force to the shelter cover.
> If the ground is rocky or frozen and the sharpened stake cannot be driven into the ground, place a largediameter branch or rock on top on the ground near the shelter covering and secure the material to the branch.
> If ground conditions are too soft, such as in loose sand or dirt, tie the shelter covering to a small piece of wood or a rock and bury it in a hole.
> Stakes should be slanted or inclined away from the direction of pull.

## shelter-debris-hut
Джерело: atp-3-50-21
> For warmth and ease of construction, the debris hut is one of the best (see figure 6-13 on page 6-15). When shelter is essential to survival, build this shelter.
> Make a tripod with two short stakes and a long ridgepole or by placing one end of a long ridgepole on top of a sturdy base.
> Secure the ridgepole (pole running the length of the shelter) using the tripod method or by anchoring it to a tree at about waist height.
> Prop large sticks along both sides of the ridgepole to create a wedge-shaped ribbing effect. Ensure that the ribbing is wide enough to accommodate the body and steep enough to shed moisture.
> Place finer sticks and brush crosswise on the ribbing. These form a latticework that will keep the insulating material (grass, pine needles, and leaves) from falling through the ribbing into the sleeping area.
> Add light, dry, soft debris over the ribbing until the insulating material is at least 3 feet thick—the thicker the better.
> Place a 2-foot layer of insulating material inside the shelter.
> At the entrance, pile insulating material that can be dragged to the entrance from inside the shelter to close the entrance or build a door.
> Finally, add shingling material or branches on top of the debris layer to prevent the insulating material from blowing away in a storm.
> A minimum of 6 to 12 inches of insulation above the isolated person is needed to retain heat.
> These natural material shelters usually require the most time and energy to construct. It is extremely important to select a site that can minimalize expenditure of effort
> All natural materials should be collected before beginning construction of the shelter. This will include the framework, covering, bedding, insulation, and materials including lashing and staking for the shelter.

## shelter-bedding
Джерело: atp-3-50-21
> Heat loss through conduction can be somewhat controlled by placing a layer of insulation between isolated persons and the cold ground. This can be achieved with a manmade sleeping pad made specifically for this purpose. Ground insulation can also be improvised by taking material from the environment like vehicle seat cushions, aircraft parts, and extra clothing. If these materials are limited, use natural materials from the environment such as ferns and grass. In a coniferous forest, boughs from a tree will work.
> When using natural material, make the insulation a minimum of 12 inches thick. This will allow sufficient insulation between isolated persons and the ground once the bed is compressed. The insulation should be fluffed in between uses and material added to maintain comfort.
> Pine boughs, moss, and grasses can be used to insulate the shelter.
> All openings except ventilation holes should be sealed to avoid heat loss. Leaving vent holes open is especially important if heat-producing devices are used (see figure 6-14, page 6-16). Candles, fuel gel, or small oil lamps produce carbon monoxide.
> If a fire is placed outside the shelter, the opening of the shelter should be placed 90 degrees to the prevailing wind. This reduces the chances of sparks and smoke being blown into the shelter if the wind reverses direction in the morning and evening, which frequently occurs in mountainous areas. The best fireto-shelter distance is about 3 feet.
> When at rest, isolated persons lose as much as 80 percent of their body heat to the ground.
