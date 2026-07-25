import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "../components/StarRating";

import { motion } from "framer-motion";


function Home({
cartItems = [],
setCartItems,
setFlyItem
}) {


const navigate = useNavigate();
const [notification, setNotification] = useState("");


const [homeSettings, setHomeSettings] = useState({
hero_title: "",
hero_description: "",
hero_button: "",
discount_title: "",
discount_description: "",
});



const [foods, setFoods] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {

window.scrollTo({
  top:0,
  behavior:"auto"
});


fetch("http://localhost:5000/api/settings")

.then(res =>res.json())

.then(data => {

setHomeSettings(data);

});

}, []);



useEffect(() => {


fetch("http://localhost:5000/api/foods")
.then((res) =>res.json())
.then((data) => {
setFoods(data);
setLoading(false);
});


}, []);




const heroFood = foods.find(
(food) =>food.hero === 1
);




const handleAddToCart = (item, e) => {

const img =
e.currentTarget
.closest(".card")
.querySelector("img");

const rect =
img.getBoundingClientRect();

setFlyItem({

image:`http://localhost:5000/uploads/${item.image}`,

rect

});

setTimeout(()=>{

setCartItems([...cartItems,item]);

setNotification(`✅ Added ${item.name} to cart`);

setTimeout(()=>{

setNotification("");

},2000);

},750);

};



if (loading) {
return (
<div className="loading-screen">
<div className="loader"></div>
<h2>Loading...</h2>
</div>
);
}


const getDiscountPercent = (oldPrice, price) => {
if (!oldPrice || !price) return 0;

return Math.round(((oldPrice - price) / oldPrice) * 100);
};


return (

<motion.div

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



{/* ضيفدافوقخالصعشانيظهرفيالنصفوق */}
{notification &&<div className="home-notification">{notification}</div>}

<section className="hero">

<motion.div
className="hero-text"
initial={{ opacity: 0, x: -80 }}
animate={{ opacity: 1, x: 0 }}
transition={{
duration: 0.8
}}
>



<h1 className="hero-color">{homeSettings.hero_title}</h1>


<p>{homeSettings.hero_description}</p>


<button
className="order-btn"
onClick={() => navigate("/menu")}
>

{homeSettings.hero_button}

</button>


</motion.div>


<motion.div
className="hero-image"
initial={{ opacity: 0, x: 80 }}
animate={{ opacity: 1, x: 0 }}
transition={{
duration: 0.8
}}
>


<img
src={
heroFood
? `http://localhost:5000/uploads/${heroFood.image}`
: "/images/hero.jpg"
}
alt="Hero"
/>


</motion.div>

</section>


<section className="categories">

<motion.h2

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.6
}}

>

Categories

</motion.h2>




<div className="category-list">


<motion.div
className="category"
onClick={() => navigate("/menu?category=Burger")}

initial={{
opacity: 0,
y: 20
}}

whileInView={{
opacity: 1,
y: 0
}}

viewport={{
once: true,
margin:"0px 0px -120px 0px"
}}

transition={{
duration: .5,
ease:"easeOut",
delay:0
}}

whileHover={{
y: -12,
scale: 1.05
}}
>

<div className="category-icon">🍔</div>

<h3>Burger</h3>

<span>Delicious Burgers</span>


</motion.div>

<motion.div
className="category"
onClick={() => navigate("/menu?category=Pizza")}

initial={{
opacity: 0,
y: 20
}}

whileInView={{
opacity: 1,
y: 0
}}

viewport={{
once: true,
margin:"0px 0px -120px 0px"
}}

transition={{
duration: .5,
ease:"easeOut",
delay: 0.15
}}

whileHover={{
y: -12,
scale: 1.05
}}
>

<div className="category-icon">🍕</div>

<h3>Pizza</h3>

<span>Fresh Pizza</span>

</motion.div>

<motion.div
className="category"
onClick={() => navigate("/menu?category=Drink")}

initial={{
opacity: 0,
y: 20
}}

whileInView={{
opacity: 1,
y: 0
}}

viewport={{
once: true,
margin:"0px 0px -120px 0px"
}}

transition={{
duration: .35,
ease:"easeOut",
delay:0.30
}}

whileHover={{
y: -12,
scale: 1.05
}}
>

<div className="category-icon">🥤</div>

<h3>Drinks</h3>

<span>Cold Drinks</span>

</motion.div>

<motion.div
className="category"
onClick={() => navigate("/menu?category=Dessert")}


initial={{
opacity: 0,
y: 20
}}

whileInView={{
opacity: 1,
y: 0
}}

viewport={{
once: true,
margin:"0px 0px -120px 0px"
}}

transition={{
duration: .5,
ease:"easeOut",
delay: 0.45
}}

whileHover={{
y: -12,
scale: 1.05
}}
>

<div className="category-icon">🍰</div>

<h3>Dessert</h3>

<span>Sweet Taste</span>

</motion.div>

</div>
</section>


<section className="discount">

<motion.div

className="discount-card"

initial={{
opacity:0,
scale:.8
}}

whileInView={{
opacity:1,
scale:1
}}

viewport={{
once:true
}}

transition={{
duration:.6
}}

>


<h2>{homeSettings.discount_title}</h2>



<p>{homeSettings.discount_description}</p>

</motion.div>

</section>


<motion.h2

className="popular-title"

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.6
}}

>

Popular Foods
</motion.h2>

<section className="foods">

{foods
.filter((food) =>food.popular === 1)
.map((food,index) => (

<motion.div

layout

className="card"

onClick={() =>
navigate(`/menu?category=${food.category}`)
}


initial={{
opacity:0,
y:60,
scale:.9
}}

whileInView={{
opacity:1,
y:0,
scale:1
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:.45,
delay:index*.08
}}


whileHover={
window.innerWidth> 768
?{
y:-10
}
:{}
}


whileTap={{
scale:.97
}}

key={food.id}>
  


<img
src={`http://localhost:5000/uploads/${food.image}`}
alt={food.name}
/>



<span className="food-category">
{food.category}
</span>


{food.discount === 1&& (

<span className="home-discount-badge">
🔥 {getDiscountPercent(food.oldPrice, food.price)}% OFF
</span>


)}



<div className="card-content">

<h3>{food.name}</h3>

<StarRating rating={food.rating} />



<div className="home-price-box">

{food.discount === 1&& (
<del className="home-oldprice">
${food.oldPrice}
</del>
)}

<p className="home-price">
${food.price}
</p>

</div>

<button
className="add-cart-btn"
onClick={(e)=>{

e.stopPropagation();

handleAddToCart(food,e);
}}
>
 Add To Cart
</button>

</div>

</motion.div>


))}



</section>


</motion.div>

  );
}

export default Home;
