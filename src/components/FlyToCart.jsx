import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


function FlyToCart({

flyItem,

setFlyItem,

setCartShake

}) { 


const [animate, setAnimate] = useState(false);

useEffect(() => {
if (flyItem) {
requestAnimationFrame(() => {
setAnimate(true);
      });

const timer = setTimeout(() => {
setAnimate(false);

setCartShake(true);

setTimeout(()=>{

setCartShake(false);

},450);

setFlyItem(null);
      }, 900);

return () =>clearTimeout(timer);
    }
  }, [flyItem, setFlyItem, setCartShake]);

if (!flyItem) return null;

const start = flyItem.rect;

const cart = document.querySelector(".navbar-cart-badge");

if (!cart) return null;

const cartRect = cart.getBoundingClientRect();

const endX = cartRect.left + cartRect.width / 2;
const endY = cartRect.top + cartRect.height / 2;

return (
<AnimatePresence>



<motion.div
initial={{
opacity:.35,
scale:1
}}

animate={

animate
?{

left:endX,

top:endY-35,

scale:.15,

opacity:0

}

:{}

}

transition={{
duration:.8
}}

style={{

position:"fixed",

left:start.left,

top:start.top,

width:start.width,

height:start.height,

borderRadius:"50%",

background:"rgba(255,80,150,.35)",

filter:"blur(30px)",

zIndex:99998,

pointerEvents:"none"

}}
/>




<motion.img
src={flyItem.image}
alt=""
initial={{
position: "fixed",
left: start.left,
top: start.top,
width: start.width,
height: start.height,
borderRadius: 20,
zIndex: 99999
        }}
animate={
animate
            ? {
left: endX,
top: endY-35,
width: 22,
height: 22,
scale: .15,
rotate: 360,
opacity:.8
              }
            : {}
        }
transition={{
type:"spring",
stiffness:110,
damping:13,
duration:.9

        }}

style={{

pointerEvents:"none",

filter:"drop-shadow(0 0 20px #ff4fa3)"

}}

      />



{animate&& (

<motion.div

initial={{

opacity:0,

scale:.2,

left:endX,

top:endY

}}

animate={{

opacity:[0,1,0],

scale:[.2,2.2,3]

}}

transition={{

duration:.35,

delay:.72

}}


style={{

position:"fixed",

transform:"translate(-50%,-50%)",

width:15,

height:15,

borderRadius:"50%",

background:"#ffd700",

boxShadow:`
0 0 25px #ffd700,
0 0 45px #ff4fa3
`,

zIndex:99999,

pointerEvents:"none"

}}


/>

)}





</AnimatePresence>
  );
}

export default FlyToCart;

