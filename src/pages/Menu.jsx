
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Menu.css";

function Menu({ cartItems, setCartItems }) {
const location = useLocation();
const params = new URLSearchParams(location.search);
const searchFromHome = params.get("search") || "";
const selectedCategory = params.get("category") || "All";

const [search, setSearch] = useState(searchFromHome);
const [category, setCategory] = useState(selectedCategory);
const [foods, setFoods] = useState([]);
const [showMessage, setShowMessage] = useState(false);
const [loading, setLoading] = useState(true);

  // جلبالبياناتمنالـAPI
useEffect(() => {
fetch("http://localhost:5000/api/foods")
      .then((res) =>res.json())
      .then((data) => {
setFoods(data);
setLoading(false);
      })
      .catch((err) => {
console.log("Error:", err);
setLoading(false);
      });
  }, []);

  // فلترةالأكلاتحسبالبحثوالتصنيف
const filteredFoods = foods.filter((food) => {
const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());
const matchesCategory = category === "All" || food.category === category;
return matchesSearch&&matchesCategory;
  });

  // إضافةللعربة
const addToCart = (food) => {
setCartItems([...cartItems, food]);
setShowMessage(true);
setTimeout(() =>setShowMessage(false), 2000);
  };

if (loading) {
return <div className="loading">Loading...</div>;
  }

return (
<>
      {/* رسالةنجاحالإضافة */}
      {showMessage&& (
<div className="success-message">✅ Added To Cart</div>
      )}

<div className="menu-container">
<h1>Our Menu</h1>

        {/* شريطالبحث */}
<div className="search-container">
<input
className="search-bar"
type="text"
placeholder="Search food..."
value={search}
onChange={(e) =>setSearch(e.target.value)}
          />
          {search&& (
<button
className="clear-search"
onClick={() =>setSearch("")}
>
✕
</button>
          )}
</div>

        {/* أزرارالتصنيفات */}
<div className="menu-categories">
<button
className={category === "All" ? "active-category" : ""}
onClick={() =>setCategory("All")}
>
All ({foods.length})
</button>

<button
className={category === "Burger" ? "active-category" : ""}
onClick={() =>setCategory("Burger")}
>
Burger ({foods.filter((food) =>food.category === "Burger").length})
</button>

<button
className={category === "Pizza" ? "active-category" : ""}
onClick={() =>setCategory("Pizza")}
>
Pizza ({foods.filter((food) =>food.category === "Pizza").length})
</button>

<button
className={category === "Drink" ? "active-category" : ""}
onClick={() =>setCategory("Drink")}
>
Drinks ({foods.filter((food) =>food.category === "Drink").length})
</button>

<button
className={category === "Dessert" ? "active-category" : ""}
onClick={() =>setCategory("Dessert")}
>
Desserts ({foods.filter((food) =>food.category === "Dessert").length})
</button>
</div>

        {/* عرضالأكلات */}
<div className="food-grid">
          {filteredFoods.length === 0 ? (
<h2 className="no-food">No Food Found</h2>
          ) : (
filteredFoods.map((food, index) => (
<div className="food-card" key={index}>
<img
src={food.image}
alt={food.name}
className="food-image"
                />
<h3>{food.name}</h3>
<p>⭐ {food.rating}</p>
                {food.oldPrice&& (
<p className="old-price">${food.oldPrice}</p>
                )}
<p className="price">${food.price}</p>
<span className="category-tag">{food.category}</span>
<button
className="add-to-cart-btn"
onClick={() =>addToCart(food)}
>
Add to Cart
</button>
</div>
            ))
          )}
</div>
</div>
</>
  );
}

export default Menu;

