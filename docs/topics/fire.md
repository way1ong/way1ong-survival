# Вогонь — речення джерела

Як читати: `## <id картки>`; «Джерело:» — id із `src/data/sources.json`; рядки з `>` — речення джерела дослівно (тест `src/core/topics.test.ts` звіряє їх із `docs/sources/<id>.txt`). Тексти карток — у словниках (`cards.<id>`), українською й угорською — переклад.

Джерело — посібник армії США ATP 3-50.21 «Survival» (2018), розділ 5 «Fire» (рішення 27.11 і 28.11); у кожній картці позначка «За посібником армії США». Англійською картки близькі до речень посібника («isolated person» — «ви»). Числа посібника лишаються, у дужках — сантиметри й метри за NIST (`src/core/units.ts`, тест); «3 feet (1 meter)» посібник перераховує сам.

Що не взято: пальне з нафтопродуктів, шини й «blubber» (п. 5-22), військові засоби (гексамін, порох), спосіб розколоти дрова ножем (п. 5-18), «log cabin», «long fire» і «star fire» (на схемі 5-5 їх немає), «fire plow» і «flashlight reflector», «Security risks that a fire may cause» (військове). «Wood used as fuel must be free of poisonous plants such as poison ivy or poison oak» — рослини Північної Америки, і їх треба розпізнавати (правило 3), тож не взято. Посібник не говорить ні про правила розведення вогню в країнах Європи, ні про небезпеку лісових пожеж — картка «Де й як безпечно розкласти вогнище» так і каже й відсилає до картки «Якщо ви заблукали» (Служба національних парків США: «Do not build a fire if there is a high fire risk…»).

## fire-site
Джерело: atp-3-50-21
> Provides a sustained source of heat that reduces energy required for the body to maintain its temperature.
> Enables the most effective method of water purification, boiling.
> Dries wet clothing and prevents cold injuries such as immersion foot, frostbite, and hypothermia.
> Provides several ways to signal recovery forces with light and smoke
> Fire is used with caution to prevent damage and injury to isolated persons and their surroundings.
> Flat, dry area to construct fire and accomplish fire-related activities.
> Protected from the wind.
> Located near isolated person’s shelter or living area.
> Near a fuel supply to maintain the fire.
> Away from snow laden trees.
> Clear the ground of fallen leaves, vegetation, and duff; expose 3 feet (1 meter) in diameter of soil at a minimum to prevent the fire from spreading along the ground.
> Porous rock is removed from the fire site, which is at risk of exploding from the heat of the fire.
> Level the area that the fire is to be constructed upon, if sloped, to prevent fuel from sliding off the fire.
> In deep snow where the soil cannot be reached, green logs are used as a base to build the fire on to prevent the coals from melting a hole through the snow pack and away from isolated persons.
> Pieces are stacked in two layers, the top being perpendicular to the bottom to a size that contains the entirety of the intended fire.
> Construct a fire reflector if desired; this task is more easily accomplished during the preparation phase before the fire becomes hot.
> Fire reflectors are used to maximize the heat produced from the fire by directing in a desired direction and protecting the heat from being displaced by the wind. Reflectors can be constructed of nonporous rock or stack of logs most effectively made of green wood (see figure 5-2). When located at the opening of a shelter, the heat is directed into the enclosure to elevate the temperature of the living area.
> When completed with a fire it is extinguished using materials such as water, entrenching tools, dirt or sand, and sturdy sticks that are prepared in advance.
> Fires with nonpetroleum-based fuel can be extinguished with an adequate amount of water. Large pieces of burning wood can be separated and the coals can be raked off with a tree branch. Some burning fuel can be broken apart and scattered over bare soils.
> When leaving an area after having a fire, ensure that the ground under where the fire was built is cool to the touch.
> Highly flammable liquids should not be poured on an existing fire. Even a smoldering fire can cause liquids to explode and cause serious burns.

## fire-build
Джерело: atp-3-50-21
> The first step is to procure a base and a brace (see figure 5-3 on page 5-4) which are used to initially establish and control the fire. The base is a flat piece of material, usually wood or a nonporous rock (porous rocks contain water and, when heated, can explode). The base is used to keep moisture susceptible tinder and kindling off the wet ground and provides a clear area to skillfully ignite tinder. The brace is employed across the base to help control oxygen into either the tinder, kindling, or fuel being worked. It is about the size of a person’s forearm.
> Fire building occurs across 3 phases. If one phase is skipped even in ideal circumstances, it is likely that the fire will fail due to not having the appropriate mix of oxygen, heat, and fuel. The 3 phases are tinder, kindling, and fuel, each representing an increase in fuel size appropriate for heat and oxygen available to support it.
> A dry material can be ignited by a small spark, coal, or flame.
> Isolated persons can procure natural tinder, when damp, and store it between layers of clothing to use heat radiated by the body to dry it prior to use. When using fibrous tinder to start a single fire, isolated persons collect enough to fill their hand with fingers cupped.
> Birch bark
> Fine wood scrapings or shavings (heartwood preferred).
> Dead dry grass, ferns, moss, lichen, and fungi.
> Dry powdered sap from the pine tree family also known as pitch.
> Seed down (milkweed, cattail, thistle).
> Feather sticks (wood shavings cut into and still connected to a piece of wood).
> Cotton balls (most effective when coated with a petroleum-based paste).
> Lint.
> Paper.
> Candle.
> When laid on the base it rests up against the brace in a mound. The tinder is lighted from its bottom edge away from the brace. The initial flame is small and is most easily able to spread in an upward sloping direction
> Kindling is added once the tinder is burning strong and mostly engulfed by flame. It is laid by the handful on, and perpendicular to, the top of the brace and over the burning tinder. It should be laid over the tinder fire so that some spaces are left in the kindling for the tinder fire to burn through. If the kindling is laid over the tinder like a blanket, the fire will likely not receive enough oxygen to continue burning, will not be able to ignite the kindling, and will die out. The second handful of kindling is laid perpendicular or diagonal to the first laid kindling
> Dead, dry, small twigs and plant stalks; isolated persons should consider that during the winter months live deciduous vegetation that is dormant may appear dead. A quick check of the cambium layer—just under the bark—will indicate whether it is alive or dead.
> Dead coniferous needles.
> Small branches low to the ground on the underside of coniferous trees that are dead from lack of sun
> Preparing kindling in several different sizes that range from pencil lead, to pencil, and then to thumb size will make fire-building easy when laid over the tinder in that order.
> The inner wood of dead branches and small diameter trees is the driest because it is not exposed to the weather. Wood that is split to expose the inner wood grains burns faster and hotter than wood pieces that are covered by bark
> Wood used as fuel should be the diameter of the forearm at a minimum.
> Effective fuel sources include dry, standing, dead wood and dry, dead branches (those that snap when broken).
> In contrast, rotten wood, most of which is found lying directly on the ground, is of little use since it smolders and is very difficult to ignite. It produces a large amount of smoke
> The three sides of the triangle represent heat, oxygen, and fuel. If any of these are removed, the fire will go out.
> Tepee fires are made by arranging the tinder and a few sticks of kindling in the shape of a tepee or cone.
> This type of fire burns well even with wet wood.
> Lean-to fires are constructed by pushing a green stick into the ground at a 30-degree angle. The end of the stick is pointed in the direction of the wind. Tinder is placed deep under the lean-to stick. Kindling is then placed against the lean-to stick.
> Cross-ditch fires are constructed by digging an “X” about 12 inches in diameter, and 3 inches deep into the ground. Tinder is placed in the middle of the cross. A kindling pyramid is built above the tinder. The shallow ditch allows air to sweep under the tinder to provide a draft.
> A pyramid fire is built by placing two small logs or branches parallel on the ground. A solid layer of small logs are then set across the parallel logs to make a platform. Three or four more layers of logs are added, each layer smaller than the last and perpendicular to the layer below it. A starter fire is then built on top of the pyramid. As the starter fire burns, it will ignite the logs below it. This creates a fire that burns downward, requiring no attention during the night.

## fire-light
Джерело: atp-3-50-21
> Fires are started from the upwind side to protect the fragile fire-starting heat source.
> Modern methods are the quickest and easiest method to start a fire, but they can only start a certain number of fires until the resource is exhausted. However, some modern methods, such as a metal match, can be used hundreds to thousands of times over depending upon the skill of the user.
> Modern methods are often easier for injured isolated persons to utilize when their movement is limited.
> Ensure that these matches are waterproof, stored in a waterproof container, and have a striker pad.
> Each match that fizzles out or is blown out by wind represents one fewer fire that the isolated person can start in the future. Matches can quickly become damp due to their size and exposed wood grain. When damp, their effectiveness is reduced causing them to burn weaker or not at all.
> To light a match the head is raked, with evenly applied pressure through the strike, over a rough surface compatible with the match type. Once the match head is ignited, it is held with the match head pointing down at an angle so the flame can begin to climb the matchstick and gain strength. It is critical that the flame is protected from the wind during this step. Once the initial flame gains strength, the match is held near the bottom edge of tinder to ignite it. Caution is used to avoid snuffing out the small match flame by placing it into or tightly against the tinder and smothering it. Lighters are used to ignite tinder similarly to matches.
> Under extreme cold temperatures, lighter fuel can freeze up and not function. In such situations, body heat can be used to warm the lighter. If the fuel runs out of a liquid-lighter, the sparking mechanism can be used similar to a metal match.
> However, quality varies between metal matches and affects how easily they spark, and how hot and long the sparks burn. Personnel should conduct operational tests of metal matches they purchase or are issued to ensure they are effective. Metal matches are reliable and not effected by wet or dry conditionals, cold or hot weather, evaporation or age, and do not malfunction.
> but the back of a fixed-blade knife, tang end of a folding knife blade, or other similar tool can also accomplish the task just as well.
> Grasping the stick at the top, place the bottom end of the stick firmly on or near the edge of tinder setting on a secure base.
> Hold the edge of the striker at a 90-degree angle to the top of the stick.
> Drive the striker downward with evenly applied pressure through the strike to near the bottom of the stick.
> Terminate the downward strike prior to the striker disturbing the tinder or recently thrown sparks to avoid snuffing them out.
> Use this method only on bright, sunny days. The lens can come from binoculars, a camera, telescopic sights, or magnifying glasses. Angle the lens to concentrate the sun's rays on the tinder. (See Figure 5-7 on page 5-12). Hold the lens over the same spot until the tinder begins to smolder. Gently blow or fan the tinder into a flame.
> Two insulated wires are required in addition to the battery to utilize this method.
> The two ends are touched to a third piece of uninsulated wire. (See figure 5-6). A short in the wire will result and cause a spark or a superheated piece of metal to ignite the tinder. Similarly, fine-grade steel wool can be stretched between the two posts of the battery causing the steel wool to heat up and produce a coal.
> Isolated persons need to be careful to keep any open flame away from the battery. Certain batteries produce explosive hydrogen gases that could result in injury.

## fire-primitive
Джерело: atp-3-50-21
> They can be time consuming to construct and require greater energy, patience, and skill to learn in comparison to modern firestarters.
> Personnel that practice these skills before isolation are much more likely to be successful in constructing and using primitive fire-starters.
> The type of rock most commonly used in fire starting is flint or any type of rock in the flint family such as quartz, chert, obsidian, agate, or jasper.
> The direct-spark method is the easiest primitive method to use. Strike a flint or other hard, sharp-edged rock with a piece of carbon steel. Stainless steel does not produce a good spark.
> When the tinder catches a spark, blow on it.
> Charred cloth is the preferred tinder for this method.
> Place a nail-sized hole in the container lid.
> Put cotton material loosely in layers inside the container and put the lid on.
> Set the container near the edge of the fire on top of hot embers.
> Once the smoke stops, the container is removed from the fire and allowed to cool.
> After it has cooled, the container is opened away from any exposed flame and stored in a water resistant container.
> The bow and drill method is simple in concept but requires significant preparation initially.
> A socket is an easily grasped stone or piece of hardwood with a slight depression in one side.
> The drill should be a straight, seasoned hardwood stick about 3/4 inch in diameter and 10 to 12 inches in length. The top end is rounded so it fits into the depression of the socket. The lower end is blunt so it will produce greater friction.
> The fireboard should be a seasoned soft wood board.
> The fireboard should be about 1 inch thick and 4 inches wide. Cut a depression about 1/2 to 3/4 inches from the edge on one side of the board. On the underside of the fireboard, make a V-shaped cut from the edge of the board to the depression. The isolated person should avoid any resinous woods as they will glaze over and hinder the process.
> The fire pan can be thin bark, leather, or a flat plank of wood placed under the fireboard to catch the wood dust and coals produced from the drill.
> The bow should be a strong, green stick about 3/4 inch in diameter with a length of about three feet that should extend long enough to go from the isolated persons finger tips to their shoulder.
> The cordage is tied from one end of the bow to the other, without any slack.
> Tinder used for a bow and drill fire must be very dry, fine fibrous material made into the shape of a birds nest.
> A large amount of completely dry tinder should be collected and prepared on a dry base near the fire site
> If right-handed, the isolated person the left foot on the fireboard to secure it in place and the right knee on the ground.
> One turn of the bowstring is made over the center of the drill.
> The bottom of the drill is placed in the fireboard notch and the tip is placed in the socket held by the left hand.
> The isolated person applies pressure on the drill from the socket and makes long, smooth strokes of the bow at a steady moderate speed
> Once a coal is produced in the mound of black wood dust on the fire pan, it begins to lightly smoke, at which time the fireboard is removed and the bird nest shaped tinder is place over the coal.
> The fire pan and bird nest are then both flipped so the bird nest is on the bottom and fire pan is on top, and the fire pan is then removed.
> The bird nest is then lightly closed around the coal and lightly waved through the air or lightly blown on with long steady breaths to heat the coal and surrounding tinder.
> A hand drill is a simpler method than the bow and drill in that it requires less preparation. However, its operation is more difficult for some.
> Embers carried in a well-built fire bundle can last for several days. For example a fire bundle built from birch bark can be constructed by laying out a large piece of bark flat, adding a layer of wet material, then rotten wood. The coals are placed in the rotten wood and the bundle is rolled shut.
> The bundle should be checked occasionally to maintain the coals and ensure enough oxygen reaches them to prevent them from being extinguished.
