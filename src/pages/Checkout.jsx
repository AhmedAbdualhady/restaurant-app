import "../styles/Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



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

useEffect(() => {

fetch(
 "http://localhost:5000/api/payment-settings"
 )
 .then((res) =>res.json())
 .then((data) => {

setPaymentInfo(data);

 });

}, []);




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

alert("Please Login First");

navigate("/login");

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

fetch("http://localhost:5000/api/orders", {
method: "POST",
body: formData,
})
  .then((res) =>res.json())
  .then((data) => {
    console.log(data);
alert("Order Placed Successfully");

setCartItems([]);



navigate("/success");
  })
  
.catch((err) => {
console.log(err);
alert("Error");
});


  };

  

return (
<div className="checkout-container">
<h1>Checkout</h1>

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
🏦
<span>Bank Transfer</span>
</div>

<div
className={`payment-card ${
paymentMethod === "wallet" ? "active" : ""
    }`}
onClick={() =>setPaymentMethod("wallet")}
>
📱
<span>Mobile Wallet</span>
</div>

<div
className={`payment-card ${
paymentMethod === "cash" ? "active" : ""
    }`}
onClick={() =>setPaymentMethod("cash")}
>
🚚
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
          "2448532"
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
          "0912345678"
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

<div className="payment-upload">

<h4>📸 Upload Payment Screenshot</h4>

<input
type="file"
accept="image/*"
onChange={(e) => {

const file =
e.target.files[0];

setPaymentImage(file);

if(file){

setPreview(
URL.createObjectURL(file)
      );

    }

  }}
/>

</div>

<p className="file-name">
  {paymentImage?.name}
</p>


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
</div>
  );
}

export default Checkout;

