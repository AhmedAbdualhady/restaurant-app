import "../styles/Cart.css";
 import { useNavigate } from "react-router-dom";

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


return (
<div className="cart-container">
<h1>Your Cart</h1>


<h2>Items in Cart: {cartItems.length}</h2>


{cartItems.map((item, index) => (
<div className="cart-item" key={index}>
<div>
<h3>{item.name}</h3>
<p>${Number(item.price).toFixed(2)}</p>
</div>

<button
className="remove-btn"
onClick={() =>removeItem(index)}
>
❌Remove
</button>
</div>
))}

<h2 className="total">
Total: ${total.toFixed(2)}
</h2>

<button className="checkout-btn" onClick={() => navigate("/checkout")}>
Checkout
</button>

</div>
  );
}

export default Cart;

