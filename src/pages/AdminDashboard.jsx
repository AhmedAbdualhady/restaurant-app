import "../styles/AdminDashboard.css";
import { useEffect, useState }
from "react";

import AdminSidebar from "../components/AdminSidebar";


import {
FaBoxOpen,
FaDollarSign,
FaClock,
FaCheckCircle,
FaFire,
FaMotorcycle,
FaUsers,
FaStar,
} from "react-icons/fa";


import {
FaPhoneAlt,
FaMapMarkerAlt,
FaCreditCard,
FaClipboardList,
} from "react-icons/fa";


import { motion } from "framer-motion";


function AdminDashboard(){


const [orders,setOrders] =
useState([]);


const [totalUsers, setTotalUsers] = useState(0);




useEffect(() => {

const fetchOrders = () => {

fetch(
"http://localhost:5000/api/orders"
)

.then((res)=>res.json())

.then((data)=>{

setOrders(data);

})

.catch(err =>console.error(err));


fetch("http://localhost:5000/api/users/count")
.then(res =>res.json())
.then(data => {
setTotalUsers(data.totalUsers);
})

.catch(err =>console.error(err));


};

fetchOrders();

const interval = setInterval(
fetchOrders,
5000
);

return () =>clearInterval(interval);

}, []);


const updateStatus = async (id,status) => {

try{

const res = await fetch(

`http://localhost:5000/api/orders/${id}`,

{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
status
})

}

);

if(!res.ok) return;

setOrders(

orders.map(order=>

order.id === id

? {...order,status}

: order

)

);

}catch(err){

console.error(err);

}

};


const totalSales =

orders.reduce(

 (sum,item)=>

sum + Number(item.total),

 0

);



const pendingOrders = orders.filter(
(order) =>order.status === "Pending"
).length;

const acceptedOrders = orders.filter(
(order) =>order.status === "Accepted"
).length;

const preparingOrders = orders.filter(
(order)=>order.status==="Preparing"
).length;

const onWayOrders = orders.filter(
(order)=>order.status==="On The Way"
).length;

const deliveredOrders = orders.filter(
(order) =>order.status === "Delivered"
).length;



const completedRate =
orders.length
? ((deliveredOrders / orders.length) * 100).toFixed(1)
: 0;


const ratedOrders = orders.filter(order =>order.rating);

const averageRating = ratedOrders.length
? (
ratedOrders.reduce(
(sum, order) => sum + Number(order.rating),
0
) / ratedOrders.length
).toFixed(1)
: 0;

return(

<div className="admin-page">

<AdminSidebar />

<div className="admin-dashboard-content">

<div className="stats-container">


<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>


<FaBoxOpen className="stat-icon"/>

<h3>{orders.length}</h3>

<p>Total Orders</p>

</motion.div>



<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>


<FaDollarSign className="stat-icon"/>

<h3>${totalSales}</h3>

<p>Total Sales</p>

</motion.div>


<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>

<FaClock className="stat-icon"/>

<h3>{pendingOrders}</h3>

<p>Pending</p>

</motion.div>




<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>

<FaCheckCircle className="stat-icon"/>

<h3>{acceptedOrders}</h3>

<p>Accepted</p>

</motion.div>



<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>


<FaFire className="stat-icon"/>

<h3>{preparingOrders}</h3>

<p>Preparing</p>

</motion.div>



<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>


<FaMotorcycle className="stat-icon"/>

<h3>{onWayOrders}</h3>

<p>On The Way</p>


</motion.div>




<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>

<FaCheckCircle className="stat-icon"/>

<h3>{deliveredOrders}</h3>

<p>Delivered</p>

</motion.div>


<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>

<FaUsers className="stat-icon"/>

<h3>{totalUsers}</h3>

<p>Total Users</p>

</motion.div>




<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>

<FaCheckCircle className="stat-icon"/>

<h3>{completedRate}%</h3>

<p>Completed</p>

</motion.div>



<motion.div

className="stat-card"

initial={{
opacity:0,
y:35
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:0.1
}}

whileHover={{
y:-10,
scale:1.03
}}

>

<FaStar className="stat-icon"/>

<h3>

{ratedOrders.length

? averageRating

: "--"}

</h3>

<p>

{ratedOrders.length

? "Average Rating"

: "No Ratings"}

</p>

</motion.div>

</div>


<motion.h1
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}
>
Orders Dashboard

</motion.h1>


<div className="orders-container">
   {orders.map((order) => (

<div
key={order.id}
className="order-card"
>

<h2 className="order-id">
Order #{order.id}
</h2>


<h3 className="customer-name">

{order.customer_name}

</h3>



<div className="order-info">

<p>

<FaPhoneAlt className="info-icon"/>

{order.phone}

</p>

<p>

<FaMapMarkerAlt className="info-icon"/>

{order.address}

</p>

<p>

<FaCreditCard className="info-icon"/>

{order.payment_method}

</p>

</div>



<h4 className="items-title">

<FaClipboardList/>

Ordered Items

</h4>



{order.items&& (() => {

let items = [];

try{

items = JSON.parse(order.items);

}catch{

items = [];

}

const grouped = {};

items.forEach((item) => {

grouped[item.name] = {

count: (grouped[item.name]?.count || 0) + 1,

category: item.category,

};

});

const getEmoji = (category) => {

switch(category){

case "Burger":

return "🍔";

case "Pizza":

return "🍕";

case "Drink":

return "🥤";

case "Dessert":

return "🍰";

default:

return "🍽";

}

};

return (

<ul className="order-items">

{Object.entries(grouped).map(

([name, data]) => (

<li key={name}>

{getEmoji(data.category)}

{" "}

{name}

{" ×"}

{data.count}

</li>

)

)}

</ul>

);

})()}


{order.payment_image&& (

<img
src={`http://localhost:5000/uploads/${order.payment_image}`}
alt="payment"
className="payment-proof"
/>

)}


<p
className={`status ${order.status}`}
>
Status: {order.status}
</p>





{order.status === "Pending" && (
<button
className="accept-btn"
onClick={() =>
updateStatus(order.id, "Accepted")
}
>
Accept
</button>
)}

{order.status === "Accepted" && (
<button
className="prepare-btn"
onClick={() =>
updateStatus(order.id, "Preparing")
}
>
 Preparing
</button>
)}

{order.status === "Preparing" && (
<button
className="way-btn"
onClick={() =>
updateStatus(order.id, "On The Way")
}
>
 On The Way
</button>
)}

{order.status === "On The Way" && (
<button
className="delivered-btn"
onClick={() =>
updateStatus(order.id, "Delivered")
}
>
 Delivered
</button>
)}


{order.rating&& (

<div className="order-rating">

{"⭐".repeat(order.rating)}

{"☆".repeat(5 - order.rating)}

<span>

({order.rating}/5)

</span>

</div>

)}


</div>


   ))}


<button
className="scroll-top"
onClick={() =>
window.scrollTo({
top:0,
behavior:"smooth"
})
}
>
⬆
</button>

<button
className="scroll-bottom"
onClick={() =>
window.scrollTo({
top:document.body.scrollHeight,
behavior:"smooth"
})
}
>
⬇
</button>

</div>
</div>
</div>

 );
}




export default AdminDashboard;

