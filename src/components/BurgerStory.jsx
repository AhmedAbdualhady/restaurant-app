

import "../styles/BurgerStory.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
motion,
AnimatePresence,
backOut,
useScroll,
useTransform,
useMotionValueEvent,
useReducedMotion,
} from "framer-motion";

/* مراحلالشرح: at = نقطةبدايةالمرحلةمن 0 لـ 1 (تقدمالـscroll) */
const STAGES = [
  { at: 0, title: "Start scrolling", text: "Watch your burger come together, layer by layer." },
  { at: 0.04, title: "Toasted bun", text: "Every burger starts with the bottom bun." },
  { at: 0.16, title: "Juicy patty", text: "Next comes the patty." },
  { at: 0.28, title: "Melted cheese", text: "The cheese goes on while it's hot." },
  { at: 0.4, title: "Fresh veggies", text: "Crisp lettuce and ripe tomato." },
  { at: 0.52, title: "Top bun", text: "A sesame bun closes it up." },
  { at: 0.66, title: "Packed warm", text: "Boxed and sealed for the trip." },
  { at: 0.9, title: "On its way", text: "From our kitchen to your door." },
];

const SEEDS = [
  [150, 252, -20],
  [202, 238, 8],
  [250, 254, 28],
  [176, 274, -8],
  [228, 278, 18],
  [124, 288, -30],
  [276, 290, 26],
];

/* طبقةوحدةمنالبرجر: بتنزلمنفوقمعالـscrollوتنطنطةخفيفة */
function Layer({ progress, range, children }) {
const [start, end] = range;

const y = useTransform(progress, [start, end], [-420, 0], { ease: backOut });
const opacity = useTransform(
progress,
    [start, start + (end - start) * 0.3],
    [0, 1]
  );

return <motion.g style={{ y, opacity }}>{children}</motion.g>;
}

function Story() {
const navigate = useNavigate();
const ref = useRef(null);
const [stage, setStage] = useState(0);

const { scrollYProgress: p } = useScroll({
target: ref,
offset: ["start start", "end end"],
  });

  // نحدثالـstateبسلمنالمرحلةتتغير (مافيre-renderمعكلpixel)
useMotionValueEvent(p, "change", (value) => {
let current = 0;

STAGES.forEach((s, i) => {
if (value >= s.at) current = i;
    });

setStage(current);
  });

  // البرجريصغروينزلجوهالعلبة
const burgerScale = useTransform(p, [0.66, 0.8], [1, 0.55]);
const burgerY = useTransform(p, [0.66, 0.8], ["0%", "7.2%"]);

  // العلبةتطلعمنتحت
const boxY = useTransform(p, [0.64, 0.78], ["30%", "0%"], { ease: backOut });
const boxOpacity = useTransform(p, [0.64, 0.72], [0, 1]);

  // الغطاينزلويقفل
const lidY = useTransform(p, [0.8, 0.9], ["-45%", "0%"], { ease: backOut });
const lidOpacity = useTransform(p, [0.8, 0.84], [0, 1]);

const shadowOpacity = useTransform(p, [0, 0.06, 0.66, 0.8], [0, 1, 1, 0]);

  // حركةخفيفةفيالنهاية
const sceneScale = useTransform(p, [0.9, 1], [1, 1.05]);
const sceneY = useTransform(p, [0.9, 1], [0, -10]);

const showCta = stage === STAGES.length - 1;

return (
<section className="bs" ref={ref} aria-label="How your burger is made">
<div className="bs-sticky">
<div className="bs-text">
<h2 className="bs-heading">Your burger, built to order</h2>

<div className="bs-step">
<AnimatePresence mode="wait">
<motion.div
key={stage}
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -18 }}
transition={{ duration: 0.22 }}
>
<h3>{STAGES[stage].title}</h3>
<p>{STAGES[stage].text}</p>
</motion.div>
</AnimatePresence>
</div>

<div className="bs-progress">
<motion.i style={{ scaleX: p, originX: 0 }} />
</div>

<motion.button
type="button"
className="bs-cta"
disabled={!showCta}
animate={{ opacity: showCta ? 1 : 0, y: showCta ? 0 : 14 }}
whileHover={showCta ? { y: -4 } : {}}
whileTap={showCta ? { scale: 0.96 } : {}}
transition={{ duration: 0.3 }}
onClick={() => navigate("/menu?category=Burger")}
>
Order a burger
</motion.button>
</div>

<motion.div className="bs-scene" style={{ y: sceneY, scale: sceneScale }}>
          {/* ظلتحتالبرجر */}
<svg className="bs-svg" viewBox="0 0 400 460" aria-hidden="true">
<motion.ellipse
cx="200"
cy="402"
rx="150"
ry="12"
fill="#000"
fillOpacity="0.16"
style={{ opacity: shadowOpacity }}
            />
</svg>

          {/* خلفيةالعلبة */}
<motion.svg
className="bs-svg bs-z1"
viewBox="0 0 400 460"
aria-hidden="true"
style={{ y: boxY, opacity: boxOpacity }}
>
<path d="M55 336 H345 L336 374 H64 Z" fill="#B8256F" />
</motion.svg>

          {/* البرجر */}
<motion.div
className="bs-burger bs-z2"
style={{ y: burgerY, scale: burgerScale, originX: 0.5, originY: 0.852 }}
>
<svg className="bs-svg" viewBox="0 0 400 460" aria-hidden="true">
              {/* 1. الخبزالتحتاني */}
<Layer progress={p} range={[0.04, 0.16]}>
<path
d="M84 358 H316 Q316 392 282 392 H118 Q84 392 84 358 Z"
fill="#E39B3C"
                />
<path
d="M86 376 Q92 392 118 392 H282 Q308 392 314 376 Z"
fill="#C97F26"
opacity="0.55"
                />
</Layer>

              {/* 2. اللحمة */}
<Layer progress={p} range={[0.16, 0.28]}>
<rect x="72" y="332" width="256" height="28" rx="14" fill="#6B3420" />
<rect x="92" y="338" width="216" height="5" rx="2.5" fill="#8A4A2F" />
</Layer>

              {/* 3. الجبنة */}
<Layer progress={p} range={[0.28, 0.4]}>
<path
d="M70 322 H330 L322 336 H258 L240 358 L222 336 H78 Z"
fill="#FFC933"
                />
</Layer>

              {/* 4. الخسوالطماطم */}
<Layer progress={p} range={[0.4, 0.52]}>
<path
d="M66 322 Q80 302 100 316 Q120 300 140 316 Q160 300 180 316 Q200 300 220 316 Q240 300 260 316 Q280 300 300 316 Q320 302 334 322 Q320 334 300 328 Q280 338 260 328 Q240 338 220 328 Q200 338 180 328 Q160 338 140 328 Q120 338 100 328 Q80 334 66 322 Z"
fill="#5DBB63"
                />
<ellipse cx="150" cy="323" rx="44" ry="8" fill="#E5484D" />
<ellipse cx="256" cy="325" rx="38" ry="7" fill="#E5484D" />
</Layer>

              {/* 5. الخبزالفوقاني */}
<Layer progress={p} range={[0.52, 0.64]}>
<path
d="M72 306 Q72 214 200 214 Q328 214 328 306 Q328 316 316 316 H84 Q72 316 72 306 Z"
fill="#F0A94B"
                />
<path
d="M110 262 Q130 232 180 228"
stroke="#FFD08A"
strokeWidth="8"
strokeLinecap="round"
fill="none"
opacity="0.7"
                />
                {SEEDS.map(([x, y, r], i) => (
<ellipse
key={i}
cx={x}
cy={y}
rx="7"
ry="3.5"
fill="#FFF3D6"
transform={`rotate(${r} ${x} ${y})`}
                  />
                ))}
</Layer>
</svg>
</motion.div>

          {/* واجهةالعلبة */}
<motion.svg
className="bs-svg bs-z3"
viewBox="0 0 400 460"
aria-hidden="true"
style={{ y: boxY, opacity: boxOpacity }}
>
<defs>
<linearGradient id="bsFront" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stopColor="#ff6fb5" />
<stop offset="1" stopColor="#ff2f92" />
</linearGradient>
</defs>
<path d="M58 372 H342 L322 452 H78 Z" fill="url(#bsFront)" />
<path
d="M70 404 H330"
stroke="#fff"
strokeOpacity="0.35"
strokeWidth="6"
strokeLinecap="round"
            />
</motion.svg>

          {/* الغطا */}
<motion.svg
className="bs-svg bs-z4"
viewBox="0 0 400 460"
aria-hidden="true"
style={{ y: lidY, opacity: lidOpacity }}
>
<defs>
<linearGradient id="bsLid" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stopColor="#ff82c0" />
<stop offset="1" stopColor="#ff4fa3" />
</linearGradient>
</defs>
<rect x="44" y="318" width="312" height="58" rx="14" fill="url(#bsLid)" />
<rect x="44" y="340" width="312" height="8" fill="#fff" fillOpacity="0.3" />
<rect x="176" y="366" width="48" height="14" rx="7" fill="#d81b7a" />
</motion.svg>
</motion.div>
</div>
</section>
  );
}

/* لوالجهازمفعّل "تقليلالحركة" نعرضنسخةثابتة */
function Static() {
const navigate = useNavigate();

return (
<section className="bs-static" aria-label="Burger">
<h2 className="bs-heading">Your burger, built to order</h2>

<p>Stacked fresh, packed warm, delivered to your door.</p>

<button
type="button"
className="bs-cta show"
onClick={() => navigate("/menu?category=Burger")}
>
Order a burger
</button>
</section>
  );
}

function BurgerStory() {
const reduceMotion = useReducedMotion();

return reduceMotion ? <Static /> : <Story />;
}

export default BurgerStory;

