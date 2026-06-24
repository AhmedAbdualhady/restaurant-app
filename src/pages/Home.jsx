import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";



function Home({ cartItems = [], setCartItems }) {
  
const navigate = useNavigate();
const [search, setSearch] = useState("");

return (
<div>

<h2 style={{padding:"20px"}}>
Cart: {cartItems.length}
</h2>

<section className="hero">
<div className="hero-text">
<h1>Fast Food Delivery</h1>
<p>
Delicious burgers, pizza and drinks delivered to your door.
</p>

<button className="order-btn" onClick={() => navigate("/menu")}>
Order Now
</button>

</div>

<div className="hero-image">
<img
src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
alt="Burger"
          />
</div>
</section>


<section className="search-section">

<input
type="text"
placeholder="Search food..."
value={search}
onChange={(e) =>setSearch(e.target.value)}
onKeyDown={(e) => {
if (e.key === "Enter") {
navigate(`/menu?search=${search}`);
    }
  }}
/>

</section>



<section className="categories">
<h2>Categories</h2>

<div className="category-list">

<div
className="category"
onClick={() => navigate("/menu?category=Burger")}
>
🍔Burger
</div>

<div
className="category"
onClick={() => navigate("/menu?category=Pizza")}
>
🍕Pizza
</div>

<div
className="category"
onClick={() => navigate("/menu?category=Drink")}
>
🥤Drinks
</div>

<div
className="category"
onClick={() => navigate("/menu?category=Dessert")}
>
🍰Desserts
</div>


</div>
</section>


<section className="discount">
<div className="discount-card">
<h2>🔥 30% OFF</h2>
<p>On all burgers this week</p>
</div>
</section>


<h2 className="popular-title">
Popular Foods
</h2>

<section className="foods">


<div
className="card"
onClick={() =>
navigate("/menu?category=Burger")
  }
>

<img
src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
alt="Burger"
    />

<div className="card-content">
<h3>Cheese Burger</h3>
<p>⭐⭐⭐⭐⭐</p>

<div className="price-row">
<span>$12</span>

<button

onClick={() =>
setCartItems([
    ...cartItems,
    { name: "Cheese Burger", price: 12 }
  ])
}


>
  +
</button>


</div>
</div>
</div>


<div
className="card"
onClick={() =>
navigate("/menu?category=Pizza")
  }
>

<img
src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
alt="Pizza"
    />

<div className="card-content">
<h3>Italian Pizza</h3>
<p>⭐⭐⭐⭐⭐</p>

<div className="price-row">
<span>$15</span>

<button

onClick={() =>
setCartItems([
    ...cartItems,
    { name: "Pizza", price: 15 }
  ])
}


>
  +
</button>

</div>
</div>
</div>

</section>

</div>
  );
}

export default Home;
