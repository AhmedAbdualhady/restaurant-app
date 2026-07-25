import "../styles/TrackOrder.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
FaBoxOpen,
FaCheckCircle,
FaHeart,
} from "react-icons/fa";


import { motion } from "framer-motion";




function TrackOrder() {

const { id } = useParams();

const [order, setOrder] = useState(null);

const [rating, setRating] = useState(0);
const [rated, setRated] = useState(false);


  useEffect(()=>{
  
  window.scrollTo({
  top:0,
  behavior:"auto"
  });
  
  },[]);



useEffect(() => {

fetch(`http://localhost:5000/api/orders/${id}`)

.then(res =>res.json())

.then(data=>{

setOrder(data);

if(data.rating){

setRating(data.rating);

setRated(true);

}

})

.catch(err =>console.error(err));

}, [id]);


if (!order) {
return (
<div className="track-loading">
Loading...
</div>
  );
}



const steps = [

"Pending",

"Accepted",

"Preparing",

"On The Way",

"Delivered",

];

const currentStep = steps.indexOf(order.status);


const submitRating = () => {

if(rating===0){

alert("Please select a rating");

return;

}

fetch(`http://localhost:5000/api/orders/${id}/rating`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
rating
})

})

.then(res=>res.json())

.then(() => {
setRated(true);
})
.catch(err =>console.error(err));

};


return (

<motion.div

className="track-page"


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
className="track-title"
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>


<FaBoxOpen className="track-icon" />
Track Order

</motion.h1>


<motion.h2

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>

Order #{order.id}
</motion.h2>



<div className="progress-container">

{steps.map((step, index) => (

<div

key={step}

className="progress-step"

>

<div

className={

index <currentStep

? "circle completed"

: index === currentStep

? "circle active"

: "circle"

}

>

{index <currentStep ? "✓" : index + 1}

</div>

<p>

{step}

</p>

{index !== steps.length - 1&& (

<div

className={

index <currentStep

? "line completed"

: "line"

}

></div>

)}

</div>

))}

</div>

{order.status === "Delivered" && (

<div className="success-box">


<FaCheckCircle className="success-icon" />


<h2>

Your Order Has Been Delivered

</h2>

<p>

Enjoy Your Meal <FaHeart className="heart-icon" />

</p>

</div>



)}






{order.status==="Delivered" && (

<div className="rating-box">

{!rated ? (

<>

<h2>

⭐Rate Your Order

</h2>

<div className="stars">

{[1,2,3,4,5].map((star)=>(

<span

key={star}

onClick={()=>setRating(star)}

className={rating>=star ? "active-star" : ""}

>

⭐

</span>

))}

</div>

<button

className="rate-btn"

onClick={submitRating}

>

Submit Rating

</button>

</>

) : (

<div className="thank-you">

<h1> <FaHeart className="heart-icon" /> </h1>

<h2>Thank You!</h2>

<p>

We Appreciate Your Feedback

</p>

<div className="stars-fixed">

{"⭐".repeat(rating)}

</div>

</div>

)}

</div>

)}






<div className="track-buttons">

<Link to="/">
<button className="home-btn">
 Back to Home
</button>
</Link>

<Link to="/menu">
<button className="shop-btn">
Continue Shopping
</button>
</Link>

</div>

</motion.div>

);

}

export default TrackOrder;


