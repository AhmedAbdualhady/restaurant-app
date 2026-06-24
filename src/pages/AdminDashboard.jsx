import { Navigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import { useEffect, useState }
from "react";

function AdminDashboard(){


const [orders,setOrders] =
useState([]);



useEffect(() => {

const fetchOrders = () => {

fetch(
"http://localhost:5000/api/orders"
)

.then((res)=>res.json())

.then((data)=>{

setOrders(data);

});

};

fetchOrders();

const interval = setInterval(
fetchOrders,
5000
);

return () =>clearInterval(interval);

}, []);






const updateStatus =
async (id,status) => {

await fetch(

 `http://localhost:5000/api/orders/${id}`,

 {

method:"PUT",

headers:{
   "Content-Type":
   "application/json"
  },

body:JSON.stringify({
status
  })

 });



setOrders(

orders.map((order)=>

order.id === id

? {...order,status}

: order

)

);


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

const deliveredOrders = orders.filter(
(order) =>order.status === "Delivered"
).length;

return(

<div className="admin-page">



<div className="stats-container">

<div className="stat-card">
<h3>{orders.length}</h3>
<p>Total Orders</p>
</div>

<div className="stat-card">
<h3>${totalSales}</h3>
<p>Total Sales</p>
</div>

<div className="stat-card">
<h3>{pendingOrders}</h3>
<p>Pending</p>
</div>

<div className="stat-card">
<h3>{acceptedOrders}</h3>
<p>Accepted</p>
</div>

<div className="stat-card">
<h3>{deliveredOrders}</h3>
<p>Delivered</p>
</div>

</div>





<h1>
Orders Dashboard
</h1>

   {orders.map((order) => (

<div
key={order.id}
className="order-card"
>

<h3>
      {order.customer_name}
</h3>

<p>
      {order.phone}
</p>

<p>
      {order.address}
</p>

<p>
      {order.payment_method}
</p>


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
className="delivered-btn"
onClick={() =>
updateStatus(order.id, "Delivered")
    }
>
Delivered
</button>
)}



</div>

   ))}

</div>

 );

}

export default AdminDashboard;

