import "../styles/BurgerIntro.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* التوقيت (بالثواني / المليثانية) - غيّرهابراحتك */
const START = 0.5; // متىتبدأأولطبقة
const STEP = 0.55; // الفاصلبينكلطبقةوالتانية
const FLY_AT = 3700; // متىالبرجريطيرللزر
const FLY_MS = 900; // مدةالطيران

const FLAG = "burgerIntroPlayed";

const SEEDS = [
  [150, 252, -20],
  [202, 238, 8],
  [250, 254, 28],
  [176, 274, -8],
  [228, 278, 18],
  [124, 288, -30],
  [276, 290, 26],
];

/* الانيميشنيشتغلمرةوحدةفيالجلسة (ومايشتغللوالجهازمفعّلتقليلالحركة) */
function alreadyPlayed() {
try {
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
return true;
    }
return sessionStorage.getItem(FLAG) === "1";
  } catch {
return false;
  }
}

/* الزر "يتنفخ" نفخةصغيرةلمنالبرجريدخلفيهو */
function bumpButton() {
const btn = document.querySelector(".hero .order-btn");

if (!btn || !btn.animate) return;

btn.animate(
    [
      { transform: "scale(1)" },
      {
transform: "scale(1.2)",
boxShadow:
          "0 0 0 10pxrgba(255,79,163,.25), 0 18px 35px rgba(255,79,163,.55)",
      },
      { transform: "scale(.96)" },
      { transform: "scale(1)" },
    ],
    { duration: 600, easing: "ease-out" }
  );
}

/* طبقةوحدةبتنزلمنفوقوتنطنطةخفيفة */
function Layer({ index, children }) {
const delay = START + index * STEP;

return (
<motion.g
initial={{ y: -430, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{
y: { type: "spring", stiffness: 170, damping: 14, delay },
opacity: { duration: 0.15, delay },
      }}
>
      {children}
</motion.g>
  );
}

function BurgerIntro({ src, alt }) {
const sceneRef = useRef(null);

const [done, setDone] = useState(alreadyPlayed);
const [fly, setFly] = useState(null);

useEffect(() => {
if (done) return;

const timers = [];

    // 1) البرجريطيرلزر "اطلبالان"
timers.push(
setTimeout(() => {
const scene = sceneRef.current;
const btn = document.querySelector(".hero .order-btn");

if (scene &&btn) {
const s = scene.getBoundingClientRect();
const b = btn.getBoundingClientRect();

          // مركزالبرجرداخلالمشهد (حوالي 66% منالارتفاع)
const fromX = s.left + s.width / 2;
const fromY = s.top + s.height * 0.66;

setFly({
x: b.left + b.width / 2 - fromX,
y: b.top + b.height / 2 - fromY,
          });
        } else {
setFly({ x: 0, y: 0 });
        }
      }, FLY_AT)
    );

    // 2) يدخلفيالزر،الزرينفخ،وتظهرصورةالهيرو
timers.push(
setTimeout(() => {
bumpButton();
setDone(true);

try {
sessionStorage.setItem(FLAG, "1");
        } catch {
          /* مامشكلة */
        }
      }, FLY_AT + FLY_MS)
    );

return () =>timers.forEach(clearTimeout);
  }, [done]);

return (
<>
<motion.img
src={src}
alt={alt}
initial={{ opacity: done ? 1 : 0 }}
animate={{ opacity: done ? 1 : 0 }}
transition={{ duration: 0.8 }}
      />

      {!done&& (
<div className="bi-scene" ref={sceneRef} aria-hidden="true">
          {/* الظل */}
<motion.svg
className="bi-svg"
viewBox="0 0 400 460"
initial={{ opacity: 0 }}
animate={{ opacity: fly ? 0 : 1 }}
transition={fly ? { duration: 0.3 } : { duration: 0.5, delay: 0.3 }}
>
<ellipse
cx="200"
cy="402"
rx="150"
ry="12"
fill="#000"
fillOpacity="0.16"
            />
</motion.svg>

          {/* البرجر */}
<motion.div
className="bi-burger"
style={{ originX: 0.5, originY: 0.66 }}
initial={false}
animate={
fly
                ? { x: fly.x, y: fly.y, scale: 0.12, opacity: [1, 1, 0] }
                : { x: 0, y: 0, scale: 1, opacity: 1 }
            }
transition={{
duration: FLY_MS / 1000,
ease: [0.55, 0.05, 0.25, 1],
opacity: { duration: FLY_MS / 1000, times: [0, 0.8, 1] },
            }}
>
<svg className="bi-svg" viewBox="0 0 400 460">
              {/* 1. الخبزالتحتاني */}
<Layer index={0}>
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
<Layer index={1}>
<rect x="72" y="332" width="256" height="28" rx="14" fill="#6B3420" />
<rect x="92" y="338" width="216" height="5" rx="2.5" fill="#8A4A2F" />
</Layer>

              {/* 3. الجبنة */}
<Layer index={2}>
<path
d="M70 322 H330 L322 336 H258 L240 358 L222 336 H78 Z"
fill="#FFC933"
                />
</Layer>

              {/* 4. الخسوالطماطم */}
<Layer index={3}>
<path
d="M66 322 Q80 302 100 316 Q120 300 140 316 Q160 300 180 316 Q200 300 220 316 Q240 300 260 316 Q280 300 300 316 Q320 302 334 322 Q320 334 300 328 Q280 338 260 328 Q240 338 220 328 Q200 338 180 328 Q160 338 140 328 Q120 338 100 328 Q80 334 66 322 Z"
fill="#5DBB63"
                />
<ellipse cx="150" cy="323" rx="44" ry="8" fill="#E5484D" />
<ellipse cx="256" cy="325" rx="38" ry="7" fill="#E5484D" />
</Layer>

              {/* 5. الخبزالفوقاني */}
<Layer index={4}>
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
</div>
      )}
</>
  );
}

export default BurgerIntro;

