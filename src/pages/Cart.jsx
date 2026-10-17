import "../styles/cart.css";
import "../styles/CartQty.css";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";

const API = "https://restaurant-app-production-0924.up.railway.app";

const keyOf = (item) =>item.id ?? item.name;

function Cart({ cartItems, setCartItems }) {
const navigate = useNavigate();

  // نجمعالمنتجاتالمتكررة: [{ key, item, qty }]
const groups = [];
const position = {};

cartItems.forEach((item) => {
const k = keyOf(item);

if (position[k] === undefined) {
position[k] = groups.length;
groups.push({ key: k, item, qty: 1 });
    } else {
groups[position[k]].qty += 1;
    }
  });
	
const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  // +
const increase = (item) => {
setCartItems((prev) => [...prev, item]);
  };

  // -  (لوالكمية 1 المنتجيتشال)
const decrease = (key) => {
setCartItems((prev) => {
let done = false;

return prev.filter((i) => {
if (!done &&keyOf(i) === key) {
done = true;
return false;
        }
return true;
      });
    });
  };

  // شيلالمنتجكلو
const removeAll = (key) => {
setCartItems((prev) =>prev.filter((i) =>keyOf(i) !== key));
  };

if (cartItems.length === 0) {
return (
<motion.div
className="empty-cart"
initial={{ opacity: 0, x: 60 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -60 }}
transition={{ duration: 0.45 }}
>
<h1>🛒</h1>

<motion.h2
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.2, duration: 0.5 }}
>
Ready for your next meal ?
</motion.h2>

<motion.p
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.2, duration: 0.5 }}
>
Let's order something delicious😋
</motion.p>

<button className="browse-btn" onClick={() => navigate("/menu")}>
Browse Menu
</button>
</motion.div>
    );
  }

return (
<motion.div
className="cart-container"
initial={{ opacity: 0, x: 60 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -60 }}
transition={{ duration: 0.45 }}
>
<motion.h1
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.2, duration: 0.5 }}
>
Your Cart
</motion.h1>

<motion.h2
className="cart-count"
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.2, duration: 0.5 }}
>
Items in Cart: {cartItems.length}
</motion.h2>

<AnimatePresence>
        {groups.map(({ key, item, qty }) => (
<motion.div
layout
className="cart-item"
key={`cart-${key}`}
initial={{ opacity: 0, x: 60, scale: 0.95 }}
animate={{ opacity: 1, x: 0, scale: 1 }}
exit={{ opacity: 0, x: -120, scale: 0.75, rotate: -8 }}
transition={{ duration: 0.35, layout: { duration: 0.35 } }}
whileHover={window.innerWidth> 768 ? { y: -6, scale: 1.02 } : {}}
>
<img
className="cart-image"
src={`${API}/uploads/${item.image}`}
alt={item.name}
            />

<div className="cart-info">
<h3>{item.name}</h3>

<p className="cart-price">
                ${(Number(item.price) * qty).toFixed(2)}
</p>

              {qty> 1&& (
<span className="cart-unit">
                  ${Number(item.price).toFixed(2)} each
</span>
              )}
</div>

<div className="qty-box">
<button
type="button"
className={`qty-btn ${qty === 1 ? "danger" : ""}`}
onClick={() => decrease(key)}
aria-label="Decrease quantity"
>
                {qty === 1 ? <FaTrashAlt /> : <FaMinus />}
</button>

<motion.span
key={qty}
className="qty-value"
initial={{ scale: 1.5, opacity: 0.4 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.2 }}
>
                {qty}
</motion.span>

<button
type="button"
className="qty-btn"
onClick={() => increase(item)}
aria-label="Increase quantity"
>
<FaPlus />
</button>
</div>

<button className="remove-btn" onClick={() =>removeAll(key)}>
<FaTrashAlt />
Remove
</button>
</motion.div>
        ))}
</AnimatePresence>

<motion.div
className="total-card"
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2 }}
>
<h2>Total</h2>

<h1>${total.toFixed(2)}</h1>

<button className="checkout-btn" onClick={() => navigate("/checkout")}>
Checkout
</button>
</motion.div>
</motion.div>
  );
}

export default Cart;
