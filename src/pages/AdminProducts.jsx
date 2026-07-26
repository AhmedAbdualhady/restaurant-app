import { useEffect, useState } from "react";
import "../styles/AdminProducts.css";
import AdminSidebar from "../components/AdminSidebar";
import StarRating from "../components/StarRating";
import { data } from "react-router-dom";

import { motion } from "framer-motion";

import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";


function AdminProducts() {

const token = localStorage.getItem("token");

const [foods, setFoods] = useState([]);


const [form, setForm] = useState({
name: "",
price: "",
oldprice: "",
category: "",
rating: "",
image: "",
popular: 0,
hero: 0,
discount: 0,
});


const [preview, setPreview] = useState(null);


const [editId, setEditId] = useState(null);
const [showModal, setShowModal] = useState(false);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

const [toast, setToast] = useState({
show: false,
message: "",
type: "success",
});

const [loading, setLoading] = useState(false);



const showToast = (message, type = "success") => {
setToast({
show: true,
message,
type,
  });

setTimeout(() => {
setToast({
show: false,
message: "",
type: "success",
    });
  }, 2500);
};


const totalProducts = foods.length;

const burgers = foods.filter(
(food) =>food.category === "Burger"
).length;

const pizzas = foods.filter(
(food) =>food.category === "Pizza"
).length;

const drinks = foods.filter(
(food) =>food.category === "Drink"
).length;

const desserts = foods.filter(
(food) =>food.category === "Dessert"
).length;


  // GET products

const fetchFoods = () => {

fetch("https://restaurant-app-production-0924.up.railway.app/api/admin/foods")
.then((res) =>res.json())
.then((data) =>setFoods(Array.isArray(data) ? data : []))
.catch((err) =>console.error(err));

};



useEffect(() => {
fetchFoods();
  }, []);

  // input change

const handleChange = (e) => {
setForm(prev => ({
...prev,
[e.target.name]: e.target.value
}));
};


  // ADD or UPDATE

const handleSubmit = (e) => {
e.preventDefault();

setLoading(true);

const formData = new FormData();



formData.append("name", form.name);
formData.append("price", form.price);
formData.append("oldprice", form.oldprice);
formData.append("category", form.category);
formData.append("rating", form.rating);
formData.append("popular", form.popular);
formData.append("hero", form.hero);
formData.append("image", form.image);
formData.append("discount", form.discount);


const url = editId
    ? `https://restaurant-app-production-0924.up.railway.app/api/foods/${editId}`
    : "https://restaurant-app-production-0924.up.railway.app/api/foods";

const method = editId ? "PUT" : "POST";



fetch(url, {
method,

headers: {
Authorization: `Bearer ${token}`,
},

body: formData,
})
.then(() => {

setLoading(false);

fetchFoods();

setForm({
name: "",
price: "",
oldprice: "",
category: "",
rating: "",
popular:0,
hero: 0,
discount:0,
image: null,
    });

setEditId(null);
setShowModal(false);


showToast(
editId ? "Product updated successfully" : "Product added successfully",
  "success"
);

})

.catch(() => {

setLoading(false);

showToast(
"Something went wrong",
"error"
);

});

};




  // DELETE
const handleDelete = (id) => {


const confirmDelete = window.confirm(
"Are you sure you want to delete this product?"
);

if (!confirmDelete) return;


fetch(`https://restaurant-app-production-0924.up.railway.app/api/foods/${id}`, {

method: "DELETE",

headers: {
Authorization: `Bearer ${token}`,
},

})
.then(() =>fetchFoods());

showToast("Product deleted successfully", "error");
  };



  // EDIT


const handleEdit = (food) => {
setForm({
name: food.name,
price: food.price,
oldprice: food.oldPrice,
category: food.category,
rating: food.rating,
popular:food.popular,
hero: food.hero,
discount: food.discount,
image: food.image,
});

setPreview(`https://restaurant-app-production-0924.up.railway.app/uploads/${food.image}`);

setEditId(food.id);
setShowModal(true);
};



const filteredFoods = foods.filter((food)=>{

const matchSearch =
food.name.toLowerCase().includes(search.toLowerCase());

const matchCategory =
category==="All" || food.category===category;

return matchSearch&&matchCategory;

});


const getDiscountPercent = (oldPrice, price) => {
if (!oldPrice || !price) return 0;

return Math.round(((oldPrice - price) / oldPrice) * 100);
};




return (

    

<div className="admin-products">


<AdminSidebar />

<motion.div
className="admin-content"
initial={{ opacity: 0, y: 25 }}
animate={{ opacity: 1, y: 0 }}
transition={{
duration: 0.6,
ease: "easeOut"
}}
>


<div className="products-header">

<div>

<motion.h1
className="page-title"
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}
>
Products Management
</motion.h1>


<p className="page-subtitle">

Manage your restaurant menu professionally

</p>

</div>

<button
className="add-product-btn"
onClick={()=>{
setEditId(null);

setForm({
name:"",
price:"",
oldprice:"",
category:"",
rating:"",
popular:0,
hero:0,
discount: 0,
image:null
});


setPreview(null);

setShowModal(true);

}}
>

<FaPlus/> Add Product

</button>

</div>



<div className="top-toolbar">


<motion.div
className="search-box"
initial={{ opacity: 0, x: 40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .3,
duration: .5
}}
>


<input

type="text"

placeholder="Search products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

{search&& (

<button

className="clear-btn"

onClick={()=>setSearch("")}

>

✕

</button>

)}

</motion.div>

</div>



<div className="stats-grid">

<div
className={`mini-card ${category==="All"?"active":""}`}
onClick={()=>setCategory("All")}
>

<h2>{totalProducts}</h2>

<span>Products</span>

</div>



<div
className={`mini-card ${category==="Burger"?"active":""}`}
onClick={()=>setCategory("Burger")}
>

<h2>{burgers}</h2>

<span>Burgers</span>

</div>



<div
className={`mini-card ${category==="Pizza"?"active":""}`}
onClick={()=>setCategory("Pizza")}
>

<h2>{pizzas}</h2>

<span>Pizzas</span>

</div>



<div
className={`mini-card ${category==="Drink"?"active":""}`}
onClick={()=>setCategory("Drink")}
>

<h2>{drinks}</h2>

<span>Drinks</span>

</div>



<div
className={`mini-card ${category==="Dessert"?"active":""}`}
onClick={()=>setCategory("Dessert")}
>

<h2>{desserts}</h2>

<span>Desserts</span>

</div>

</div>


<div className="products-grid">

{filteredFoods.length> 0 ? (

filteredFoods.map((food)=>(



<div className="product-card" key={food.id}>

<div className="image-box">


<img
src={`https://restaurant-app-production-0924.up.railway.app/uploads/${food.image}`}
alt={food.name}
className="admin-food-image"
/>



<span className="category-badge">
      {food.category}
</span>

</div>


<div className="product-info">

<div className="product-top">

<h2>{food.name}</h2>

< div className="badges">

{food.popular === 1&& (

<span className="popular-badge">

Popular

</span>

)}

{food.hero === 1&& (

<span className="hero-badge">

Hero

</span>

)}



{food.discount === 1&& (

<span className="discount-badge">
🔥 {getDiscountPercent(food.oldPrice, food.price)}% OFF
</span>

)}



</div>

</div>

<StarRating rating={food.rating} />

<div className="price-box">

{food.oldPrice&& (

<span className="admin-old-price">

${food.oldPrice}

</span>

)}


<span className="admin-price">

${food.price}

</span>


</div>

<div className="buttons">

<button
className="edit-btn"
onClick={()=>handleEdit(food)}
>

<FaEdit/> Edit

</button>

<button
className="delete-btn"
onClick={()=>handleDelete(food.id)}
>

<FaTrashAlt/> Delete
 
</button>

</div>

</div>



</div>




))

) : (

<div className="no-products">

 No food found

</div>

)}




{showModal&& (
<div className="modal">

<div className="modal-content">

<div className="modal-header">

<h2>

{editId

? "Edit Product"

: "New Product"}

</h2>

</div>



<form onSubmit={handleSubmit}>

<input
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
        />

<input
name="price"
placeholder="Price"
value={form.price}
onChange={handleChange}
        />


<input
name="oldprice"
placeholder="Old Price"
value={form.oldprice}
onChange={handleChange}
disabled={form.discount !== 1}
/>


<input
name="category"
placeholder="Category"
value={form.category}
onChange={handleChange}
        />


<input
name="rating"
placeholder="Rating"
value={form.rating}
onChange={handleChange}
        />




<label className="upload-image">

Choose Image

<input
className="product-image"
type="file"
accept="image/*"
onChange={(e)=>{

const file = e.target.files[0];

if(file){

setForm({
...form,
image:file,
});

setPreview(URL.createObjectURL(file));

}

}}

/>


</label>



{preview&& (

<div className="preview-box">

<img
src={preview}
alt="Preview"
className="preview-image"
/>

</div>

)}



<div className="switch-row">

<label>

Popular

</label>

<label className="switch">

<input

type="checkbox"

checked={form.popular===1}

onChange={(e)=>

setForm({

...form,

popular:e.target.checked?1:0

})

}

/>

<span></span>

</label>

</div>



<div className="switch-row">

<label>

Hero Banner

</label>

<label className="switch">

<input

type="checkbox"

checked={form.hero===1}

onChange={(e)=>

setForm({

...form,

hero:e.target.checked?1:0

})

}

/>

<span></span>

</label>

</div>


<div className="switch-row">

<label>
Discount
</label>

<label className="switch">

<input
type="checkbox"
checked={form.discount===1}
onChange={(e)=>
setForm({
...form,
discount:e.target.checked?1:0
})
}
/>

<span></span>

</label>

</div>



<div className="modal-buttons">


<button
type="submit"
className="save-btn"
disabled={loading}
>
{loading
? "Saving..."
: editId
? "Update"
: "Add"}
</button>





<button
type="button"
className="cancel-btn"
onClick={() =>setShowModal(false)}
>
Cancel
</button>

</div>

</form>

</div>

</div>
)}

</div>

</motion.div>


{toast.show&& (
<div className={`toast ${toast.type}`}>
    {toast.message}
</div>
)}


</div>
  );
}

export default AdminProducts;

