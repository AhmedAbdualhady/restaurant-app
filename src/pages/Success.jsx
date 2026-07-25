import "../styles/Success.css";
import { Link, useLocation } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

import { motion } from "framer-motion";
import { useEffect } from "react";

function Success() {

  
  useEffect(()=>{
  
  window.scrollTo({
  top:0,
  behavior:"auto"
  });
  
  },[]);

  const location = useLocation();
  const orderId = location.state?.orderId;


return (

<motion.div

className="success-container"

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




<div className="success-icon">
<FaCircleCheck />
</div>


<motion.h1

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>
Order Placed Successfully

</motion.h1>


<motion.p

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>
Thank you for your order!
</motion.p>


<motion.h3

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>

Order #{orderId ?? "----"}

</motion.h3>


<div className="success-buttons">
<Link to="/">
<button type="button">
Back To Home
</button>
</Link>

<Link to="/menu">
<button type="button">
Continue Shopping
</button>
</Link>

<Link
to={`/track/${orderId}`}
>
<button type="button">
 Track Order
</button>
</Link>


</div>
</motion.div>

  );
}


export default Success;

