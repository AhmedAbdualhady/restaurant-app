import "../styles/Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaTruck } from "react-icons/fa";

import { motion } from "framer-motion";

import { FaCamera } from "react-icons/fa";




function Checkout({
cartItems,
setCartItems
})

 {
const navigate = useNavigate();

const [paymentMethod, setPaymentMethod] = useState("");
const [paymentImage, setPaymentImage] = useState(null);

const [preview, setPreview] =
useState(null);

const [name, setName] = useState("");
const [address, setAddress] = useState("");
const [phone, setPhone] = useState("");
  
const [paymentInfo,
setPaymentInfo] = useState({});

useEffect (() => {

window.scrollTo({
  top:0,
  behavior:"auto"
});

 
fetch("https://restaurant-app-production-0924.up.railway.app/api/settings")


 .then((res) =>res.json())
 .then((data) => {

setPaymentInfo(data);

 })
 
   .catch((err) =>console.error(err));

}, []);


useEffect(() => {
return () => {
if (preview) {
URL.revokeObjectURL(preview);
    }
  };
}, [preview]);



const total = cartItems.reduce(
(sum, item) => sum + Number(item.price),
  0
);


const handleOrder = (e) => {
e.preventDefault();


const user = JSON.parse(
localStorage.getItem("user")
);

if (!user) {


alert("Please login to complete your order.");

navigate("/login", {
state: {
from: "/checkout"
}
});


return;


}



if (!paymentMethod) {

alert(
"Please select payment method"
);

return;

}




if (

(paymentMethod === "bank" ||
paymentMethod === "wallet")

&&

!paymentImage

){

alert(
"Please upload payment proof"
);

return;

}


const formData = new FormData();

formData.append("customer_name", name);
formData.append("phone", phone);
formData.append("address", address);
formData.append("total", total);

formData.append("payment_method", paymentMethod);
formData.append("paymentImage", paymentImage);


formData.append(
"items",
JSON.stringify(cartItems)
);


fetch("https://restaurant-app-production-0924.up.railway.app/api/orders", {
method: "POST",
body: formData,
})
  .then((res) =>res.json())
  .then((data) => {
    console.log(data);
alert("Order Placed Successfully");

setCartItems([]);



navigate("/success",{
  state:{
    orderId:data.orderId
  }
  });
  
  })
  
.catch((err) => {
console.log(err);
alert("Error");
});


  };

  

return (

<motion.div

className="checkout-container"

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

initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{
delay: .2,
duration: .5
}}>

Checkout

</motion.h1>



<form className="checkout-form" onSubmit={handleOrder}>

<input
type="text"
required
placeholder="Full Name"
value={name}
onChange={(e) =>setName(e.target.value)}
/>

<input
type="text"
required
placeholder="Address"
value={address}
onChange={(e) =>setAddress(e.target.value)}
      />

<input
type="tel"
required
placeholder="Phone Number"
minLength={10}
value={phone}
onChange={(e) =>setPhone(e.target.value)}
      />


<div required className="payment-methods">

<div
className={`payment-card ${
paymentMethod === "bank" ? "active" : ""
    }`}
onClick={() =>setPaymentMethod("bank")}
>
<FaUniversity className="payment-icon" />
<span>Bank Transfer</span>
</div>

<div
className={`payment-card ${
paymentMethod === "wallet" ? "active" : ""
    }`}
onClick={() =>setPaymentMethod("wallet")}
>
<MdOutlineAccountBalanceWallet className="payment-icon" />
<span>Mobile Wallet</span>
</div>

<div
className={`payment-card ${
paymentMethod === "cash" ? "active" : ""
    }`}
onClick={() =>setPaymentMethod("cash")}
>
<FaTruck className="payment-icon" />
<span>Cash On Delivery</span>
</div>

</div>


{paymentMethod === "bank" && (
<div className="payment-info">

<h4>Bank Transfer</h4>

<p>
Bank:
 {paymentInfo.bank_name}
</p>

<p>
Name:
 {paymentInfo.account_name}
</p>

<p>
Account:
 {paymentInfo.account_number}
</p>


<button
type="button"
onClick={() =>

navigator.clipboard.writeText(
paymentInfo.account_number
)

      }
>
Copy Account Number
</button>

</div>
)}




{paymentMethod === "wallet" && (
<div className="payment-info">

<h4>Mobile Wallet</h4>


<p>
 {paymentInfo.wallet_name}
</p>

<p>
 {paymentInfo.wallet_number}
</p>


<button
type="button"
onClick={() =>

navigator.clipboard.writeText(
paymentInfo.wallet_number
)

      }
>
Copy Number
</button>

</div>
)}


{paymentMethod === "cash" && (
<div className="payment-info">

<h4>
Delivery Time
</h4>

<p>
 {paymentInfo.delivery_time}
</p>

</div>
)}


<label className="upload-box">

<FaCamera className="upload-icon" />

<span>
Upload Payment Screenshot
</span>

<small>
Click to choose image
</small>


<input
type="file"
accept="image/*"
onChange={(e) => {

const file = e.target.files[0];

setPaymentImage(file);


if(file){

const imageUrl = URL.createObjectURL(file);

setPreview(imageUrl);

}

}}
/>

</label>



{paymentImage&& (

<div className="file-name">

{paymentImage.name}

</div>

)}





{preview&& (

<div className="image-preview">

<img
src={preview}
alt="Payment Preview"
    />

</div>

)}

<button type="submit">
Place Order
</button>
</form>
</motion.div>
  );
}

export default Checkout;

