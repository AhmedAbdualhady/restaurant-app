import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Menu.css";
import { FaStar } from "react-icons/fa";
import StarRating from "../components/StarRating";

import { motion } from "framer-motion";





function Menu({

cartItems,

setCartItems,

setFlyItem

}) {


const location = useLocation();
const params = new URLSearchParams(location.search);
const searchFromHome = params.get("search") || "";
const selectedCategory = params.get("category") || "All";

const [search, setSearch] = useState(searchFromHome);
const [category, setCategory] = useState(selectedCategory);
const [foods, setFoods] = useState([]);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(true);

  // جلبالبياناتمنالـAPI
useEffect(() => {

window.scrollTo({
  top:0,
  behavior:"auto"
});

fetch("https://restaurant-app-production-0924.up.railway.app/api/foods")
      .then((res) =>res.json())
      .then((data) => {
setFoods(data);

      })
      .catch((err) => {
console.log("Error:", err);

      })


.finally(() => {

setTimeout(() => {

setLoading(false);

},400);

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


const addToCart = (food,e) => {

const img =

e.currentTarget

.closest(".food-card")

.querySelector("img");

const rect =

img.getBoundingClientRect();

setFlyItem({

image:`https://restaurant-app-production-0924.up.railway.app/uploads/${food.image}`,

rect

});

setTimeout(()=>{

setCartItems([...cartItems,food]);

setMessage(`✅ Added ${food.name} to cart`);

setTimeout(()=>{

setMessage("");

},2000);

},750);

};


const getDiscountPercent = (oldPrice, price) => {
if (!oldPrice || !price) return 0;

return Math.round(((oldPrice - price) / oldPrice) * 100);
};



return (
<>
      {/* رسالةنجاحالإضافة */}
      
{message&& (

<div className="success-message">

{message}

</div>

)}


<motion.div

className="menu-container"

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
className="page-title"

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}
>
Our Menu
</motion.h1>



        {/* شريطالبحث */}


<motion.div
 className="search-container"
initial={{ opacity: 0, x: 40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .3,
duration: .5
}}
>


<input

type="text"

placeholder="Search food..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

{search&& (

<button

className="clear-search"

onClick={()=>setSearch("")}

>

✕

</button>

)}


</motion.div>



        {/* أزرارالتصنيفات */}


<motion.div
className="menu-categories"

initial={{
opacity:0,
y:25
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:.4,
duration:.5
}}
>

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

</motion.div>

        {/* عرضالأكلات */}

<div className={`food-grid ${loading ? "loading" : ""}`}>



          {filteredFoods.length === 0 ? (
<h2 className="no-food">No Food Found</h2>
          ) : (
filteredFoods.map((food, index) => (


<motion.div
className="food-card"

key={food.id}

initial={{
opacity: 0,
y: 50,
scale: 0.9
  }}
whileInView={{
opacity: 1,
y: 0,
scale: 1
  }}
  

whileHover={
window.innerWidth> 768
? { y: -10 }
: {}
}


viewport={{
once: true,
amount: 0.2
  }}

transition={{
type: "spring",
stiffness: 120,
damping: 14,
delay: index * 0.08
}}


>


<div className="image-box">
<img
src={`https://restaurant-app-production-0924.up.railway.app/uploads/${food.image}`}
alt={food.name}
className="food-image"
                />

<span className="menu-category-badge">{food.category}</span>


{food.discount === 1&& (


<span className="menu-discount-badge">
🔥 {getDiscountPercent(food.oldPrice, food.price)}% OFF
</span>

)}



 </div>               
<h3>{food.name}</h3>

<StarRating rating={food.rating} />


<div className="menu-price-box">

{food.discount === 1&& (
<p className="old-price">
${food.oldPrice}
</p>
)}

<p className="price">
${food.price}
</p>

</div>


<button
className="add-to-cart-btn"

onClick={(e) => {
e.stopPropagation();
addToCart(food, e);
}}
>
Add to Cart
</button>

</motion.div>


            ))
          )}
</div>


</motion.div>
</>
  );
}

export default Menu;

