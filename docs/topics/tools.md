# Саморобні засоби — речення джерела

Як читати: `## <id картки>`; «Джерело:» — id із `src/data/sources.json`; рядки з `>` — речення джерела дослівно (тест `src/core/topics.test.ts` звіряє їх із `docs/sources/<id>.txt`). Тексти карток — у словниках (`cards.<id>`), українською й угорською — переклад.

Джерело — посібник армії США ATP 3-50.21 «Survival» (2018): розділ 8, частина «Cordage and Lashing», і додаток A «Survival Knots and Rope» (рішення 27.11 і 28.11); у кожній картці позначка «За посібником армії США». Числа посібника лишаються, у дужках — сантиметри за NIST (`src/core/units.ts`, тест).

На схемі A-18 пряме в'язання закінчують вибленочним вузлом на горизонтальній жердині, а в тексті (п. A-28) — «around the same piece that the lashing was started on», тобто на тій, з якої почали. Картка називає обидва варіанти, а не вибирає з пам'яті. Слова на схемах 8-8 і A-18 перекладено як є, з друкарською помилкою «verical» на схемі A-18.

Що не взято: зброя (розділ 8, «Field-Expedient Weapons»), посуд, наплічники; сухожилля й сира шкіра здобичі (п. 8-40, 8-41) — здобич лише в особистому путівнику власника (рішення 27.11); вузли для рятувальних пристроїв і мостів («French bowline», «Speir knot», «Prussic», «sheepshank»); таблиця міцності волокон у фунтах (п. A-37) — у картці лише правило «завжди розраховувати на найменшу»; широка коса й обмотування кінця мотузки (п. A-44–A-47).

## cordage-fibres
Джерело: atp-3-50-21
> For example, you can make a cotton web belt much more useful by unraveling it.
> Isolated persons can also use several strands of parachute cord and twist or braid them together to make a rope (see figure 8-8 on page 8-10). Sheets are used in the same fashion. The parachute cord can be broken down into its components of the outer cover and the inner core strands
> Before making cordage, conduct a few simple tests to determine the material's suitability. First, pull on a length of the material to test for strength. Next, twist it between your fingers and roll the fibers together. If it withstands this handling and does not snap apart, then tie an overhand knot with the fibers and gently tighten. If the knot does not break, it will work.
> Another lashing material can be fibers from the inner bark of some trees, such as the linden, elm, hickory, white oak, mulberry, chestnut, and red and white cedar, to make cord. Isolated persons should test the cord to be sure it is strong enough for their purpose. These materials can be made stronger by braiding several strands together.
> Use any material with long strong threads or fibers which have been previously tested for strength and pliability. Gather the fibers into loosely held strands of even thickness. Each of these strands is twisted clockwise.
> As a general rule, there should be about 15 to 30 fibers to a strand. Two, three, or four of these strands are later twisted together or "layered" with a counterclockwise twist, while at the same time, the separate strands which have not yet been laid up are twisted clockwise. Each strand must be of equal twist and thickness
> They twist the material by running the flat of the hand along the thigh, with the fibrous material between hand and thigh; with the free hand, they feed in fiber for the next "spin."
> This method of making cord or rope with the fingers is slow if any considerable length of cord is required.
> If there is no help available to spin materials, it is necessary to find reasonably long material.
> Pass the right-hand strand over the strand to the left.
> Pass the left-hand strand over the strand to the right.
> Repeat this process alternately from left to right.
> Almost any natural fibrous material can be spun into good serviceable rope or cord, and many materials which have a length of 12 to 24 inches or more can be braided.
> For safety's sake, the lowest figure should always be regarded as the tensile strength.
> Natural ropes are resistant to friction-generated heat but can be destroyed if the fibers are cut with a sharp rock or knife.
> If not cared for and kept clean, natural fiber ropes can begin to break down and lose tensile strength.
> In "laying," care must be taken to ensure that each of the strands is evenly "laid up;" that is; one strand does not twist around the other.

## knot-square
Джерело: atp-3-50-21
> Bight. A bight is a bend or U-shaped curve in a rope.
> Running end. The running end is the free or working end of a rope.
> Standing end. The standing end is the balance of the rope, excluding the running end.
> The square knot is used for tying two ropes of equal diameter together to prevent slippage (see figure A-5). To tie a square knot, lay the running end of each rope together but pointing in opposite directions. The running end of one rope can be passed under the standing part of the other rope. Bring the two running ends up away from the point where they cross and cross them again. Once each running end is parallel to its own standing part, the two ends can be pulled tight. If each running end does not come parallel to the standing part of its own rope, the knot is called a "granny knot." Because it will slip under the strain, a granny knot should not be used.
> If the procedure is reversed, the resulting knot will have a running end parallel to each standing part but the two running ends will not be opposite each other. This knot is called a "thief" knot. It will slip under the strain and is difficult to untie. A true square knot will draw tighter under strain. A square knot can be untied easily by grasping the bends of the two bights and pulling the knot apart.
> A loosely tied knot can easily deform under strain and change, becoming a slipknot or worse, untying.

## knot-sheet-bend
Джерело: atp-3-50-21
> The use of a single sheet bend, sometimes called a weaver's knot, is limited to tying together two dry ropes of unequal size. To tie the single sheet bend, the running end of the smaller rope should pass through a bight in the larger rope. The running end should continue around both parts of the larger rope and back under the smaller rope. The running end can then be pulled tight. This knot will draw tight under light loads but may loosen or slip when the tension is released
> The double sheet bend works better than the single sheet bend for joining ropes of equal or unequal diameter, joining wet ropes, or tying a rope to an eye. It will not slip or draw tight under heavy loads. To tie a double sheet bend, a single sheet bend is tied first. However, the running end is not pulled tight. One extra turn is taken around both sides of the bight in the larger rope with the running end for the smaller rope. Then tighten the knot

## knot-bowline
Джерело: atp-3-50-21
> The bowline is a useful knot for forming a loop in the end of a rope. It is also easy to untie. To tie a bowline knot, the running end of the rope passes through the object to be affixed to the bowline and forms a loop in the standing part of the rope. The running end is then passed through the loop from underneath and around the standing part of the rope, and back through the loop from the top. The running end passes down through the loop parallel to the rope coming up through the loop. The knot is then pulled tight
> It is sometimes desirable to form a loop at some point in a rope other than at the end. The bowline on a bight can be used for this purpose. It is easily untied and will not slip. The same knot can be tied at the end of a rope by doubling the rope for a short section. A doubled portion of the rope is used to form a loop as in the case of the bowline. The bight end of the doubled portion is passed up through the loop, back down up around the entire knot, and tightened
> Dressing the knot is the orientation of all knot parts so that they are properly aligned, straightened, or bundled. Neglecting this can result in a 50 percent reduction in knot strength. This term is sometimes used for setting the knot, which involves tightening all parts of the knot so they bind on one another and make the knot operational.

## knot-clove-hitch
Джерело: atp-3-50-21
> A clove hitch is used to fasten a rope to a timber, pipe, or post. It can be tied at any point in a rope. To tie a clove hitch in the center of the rope, two turns are made in the rope close together. They are twisted so that the two loops lay back-to-back. These two loops are slipped over the timber or pipe to form the knot. To tie the clove hitch at the end of a rope, the rope is passed around the timber in two turns so that the first turn crosses the standing part and the running end comes up under itself on the second turn
> Lashings begin and end with clove hitches.
> A hitch is any of various knots used to form a temporary noose in a rope or to secure a rope around a timber, pipe, or post so that it will hold temporarily but can be readily undone.
> When tying off with a clove hitch, the line should pass in front of the stake first and then pass under itself

## knot-half-hitches
Джерело: atp-3-50-21
> The round turn and two half hitches (seen in figure A-3) is the main anchor knot for one-rope bridges and other applications when a good anchor knot is required and where high loads would make other knots jam and difficult to untie. It is most used to anchor rope to a pole or tree.
> Round turn. The same as a turn, with the running end leaving the circle in the same general direction as the standing part.
> The half hitch is used to tie a rope to a timber or to another larger rope. It is not a very secure knot or hitch and is used for temporarily securing the free end of a rope. To tie a half hitch, the rope is passed around the timber, bringing the running end around the standing part, and back under itself
> A quick method for tying a rope to a timber or pole is to use two half hitches. The running end of the rope is passed around the pole or timber, and a turn is taken around the standing part and under the running end. This is a one half hitch. The running end is passed around the standing part of the rope and back under itself again
> Because ithad a tendency to undo itself without load, it has since been replaced by the overhand.

## lashing-square
Джерело: atp-3-50-21
> Numerous items require lashings for construction; for example, shelters, equipment racks, and smoke generators.
> Square lashing is started with a clove hitch around the log, immediately under the place where the crosspiece is to be located. In laying the turns, the rope goes on the outside of the previous turn around the crosspiece, and on the inside of the previous turn around the log. The rope should be kept tight. Three or four turns are necessary. Two or three "frapping" turns are made between the crosspieces. The rope is pulled tight; this will bind the crosspiece tightly together. It is finished with a clove hitch around the same piece that the lashing was started on. The square lash is used to secure one pole at right angles to another pole.
> Diagonal lashing is started with a clove hitch around the two poles at the point of crossing. Three turns are taken around the two poles. The turns lie beside each other, not on top of each other. Three more turns are made around the two poles, this time crosswise over the previous turns. The turns are pulled tight. A couple of frapping turns are made between the two poles, around the lashing turns, making sure they are tight. The lashing is finished with a clove hitch around the same pole the lash was started on
> Shear lashing is used for lashing two or more poles in a series. The desired numbers of poles are placed parallel to each other and the lash is started with a clove hitch on an outer pole. The poles, laid loosely beside each other, are often lashed together using seven or eight turns of the rope. Make frapping turns between each pole. The lashing is finished with a clove hitch on the pole opposite that on which the lash was started
> Wraps begin and end with clove hitches and get tighter with fraps.
