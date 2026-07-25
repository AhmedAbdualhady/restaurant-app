import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";



function Cart({ cartItems, setCartItems }) {
const navigate = useNavigate();
  
const total = cartItems.reduce(
(sum, item) => sum + Number(item.price),
  0
);

const removeItem = (indexToRemove) => {
setCartItems(
cartItems.filter(
(_, index) => index !== indexToRemove
    )
  );
};



if (cartItems.length === 0) {
return (

<motion.div

className="empty-cart"

initial={{
opacity:0,
x:60
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x:-60
}}

transition={{
duration:.45
}}

>


<h1>🛒</h1>

<motion.h2
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>

Ready for your next meal ?

</motion.h2>

<motion.p
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>

Let's order something delicious 😋

</motion.p>


<button
className="browse-btn"
onClick={() => navigate("/menu")}
>

Browse Menu

</button>

</motion.div>

);
}



return (

<motion.div


className="cart-container"


initial={{
opacity:0,
x:60
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x:-60
}}

transition={{
duration:.45
}}


>


<motion.h1

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>

Your Cart

</motion.h1>


<motion.h2
className="cart-count"

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>
Items in Cart: {cartItems.length}
</motion.h2>



<AnimatePresence>

{cartItems.map((item, index) => (

<motion.div

layout

className="cart-item"

key={`${item.name}-${item.price}-${index}`}


initial={{
opacity:0,
x:60,
scale:.95
}}

animate={{
opacity:1,
x:0,
scale:1
}}

exit={{
opacity:0,
x:-120,
scale:.75,
rotate:-8
}}


transition={{
duration:.35,
layout:{
duration:.35
}
}}



whileHover={
window.innerWidth> 768
?{
y:-6,
scale:1.02
}
:{}
}


whileTap={{
scale:.97
}}


>


<img
className="cart-image"
src={`http://localhost:5000/uploads/${item.image}`}
alt={item.name}
/>

<div className="cart-info">

<h3>{item.name}</h3>

<p className="cart-price">

${Number(item.price).toFixed(2)}

</p>

</div>

<button
className="remove-btn"
onClick={() =>removeItem(index)}
>

<FaTrashAlt />

Remove

</button>


</motion.div>


))}

</AnimatePresence>


<motion.div

className="total-card"

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:.2
}}
>

<h2>Total</h2>

<h1>${total.toFixed(2)}</h1>

<button
className="checkout-btn"
onClick={() => navigate("/checkout")}
>

Checkout

</button>

</motion.div>



</motion.div>

  );
}

export default Cart;

