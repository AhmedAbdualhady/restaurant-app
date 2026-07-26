import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminSettings.css";
import {
FaStore,
FaBullhorn,
FaPercent,
FaPhoneAlt,
FaGlobe,
FaSave,
} from "react-icons/fa";


import { FaUniversity } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaTruck } from "react-icons/fa";


import { motion } from "framer-motion";



function AdminSettings(){

const token = localStorage.getItem("token");

const [settings, setSettings] = useState({
restaurant_name: "",

about: "",

phone: "",
email: "",
address: "",

facebook: "",
instagram: "",
whatsapp: "",

hero_title: "",
hero_description: "",
hero_button: "",

discount_title: "",
discount_description: "",

bank_name:"",
account_name:"",
account_number:"",

wallet_name:"",
wallet_number:"",

delivery_time:"",

});


useEffect(() => {

fetch("https://restaurant-app-production-0924.up.railway.app/api/settings")
.then(res => {

if(!res.ok) throw new Error("Failed");

return res.json();

})

.then(data => {

setSettings(data);

})

.catch(err =>console.error(err));

}, []);


const handleChange = (e) => {

setSettings(prev => ({

...prev,

[e.target.name]: e.target.value,

}));

};


const handleSubmit = (e) => {

e.preventDefault();

fetch("https://restaurant-app-production-0924.up.railway.app/api/settings", {

method: "PUT",

headers: {

"Content-Type": "application/json",

Authorization: `Bearer ${token}`,

},

body: JSON.stringify(settings),

})

.then(res =>res.json())

.then(()=>{

alert("Updated Successfully");

})

.catch(err =>console.error(err));

};


return(

<div className="admin-setting-products">

<AdminSidebar />


<motion.div
className="admin-setting-content"

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}
>



<motion.h1

initial={{
opacity:0,
x:-30
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:.2,
duration:.5
}}

>

Website Settings

</motion.h1>



<form onSubmit={handleSubmit}>


<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>

<h2>

<FaStore className="section-icon"/>

Restaurant Settings

</h2>

<input
required
name="restaurant_name"
placeholder="Restaurant Name"
value={settings.restaurant_name}
onChange={handleChange}
/>


<textarea
name="about"
placeholder="About Restaurant"
value={settings.about}
onChange={handleChange}
/>


</motion.div>


<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>


<h2>

<FaBullhorn className="section-icon"/>

Hero Section

</h2>



<input
name="hero_title"
placeholder="Hero Title"
value={settings.hero_title}
onChange={handleChange}
/>

<input
name="hero_description"
placeholder="Hero Description"
value={settings.hero_description}
onChange={handleChange}
/>

<input
required
name="hero_button"
placeholder="Hero Button"
value={settings.hero_button}
onChange={handleChange}
/>

</motion.div>


<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>

<h2>

<FaPercent className="section-icon"/>

Discount Section

</h2>



<input
name="discount_title"
placeholder="Discount Title"
value={settings.discount_title}
onChange={handleChange}
/>

<input
name="discount_description"
placeholder="Discount Description"
value={settings.discount_description}
onChange={handleChange}
/>

</motion.div>


<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>

<h2>
<FaUniversity className="section-icon"/>
Bank Transfer
</h2>

<input
name="bank_name"
placeholder="Bank Name"
value={settings.bank_name}
onChange={handleChange}
/>

<input
name="account_name"
placeholder="Account Holder"
value={settings.account_name}
onChange={handleChange}
/>

<input
name="account_number"
placeholder="Account Number"
value={settings.account_number}
onChange={handleChange}
/>

</motion.div>


<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>


<h2>
<MdOutlineAccountBalanceWallet className="section-icon"/>
Mobile Wallet
</h2>

<input
name="wallet_name"
placeholder="Wallet Name"
value={settings.wallet_name}
onChange={handleChange}
/>

<input
name="wallet_number"
placeholder="Wallet Number"
value={settings.wallet_number}
onChange={handleChange}
/>

</motion.div>




<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>

<h2>
<FaTruck className="section-icon"/>
Delivery
</h2>

<input
name="delivery_time"
placeholder="Delivery Time"
value={settings.delivery_time}
onChange={handleChange}
/>

</motion.div>



<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>

<h2>

<FaPhoneAlt className="section-icon"/>

Contact Settings

</h2>

<input
required
name="phone"
placeholder="Phone Number"
value={settings.phone}
onChange={handleChange}
/>

<input
required
name="email"
placeholder="Email Address"
value={settings.email}
onChange={handleChange}
/>

<input
required
name="address"
placeholder="Restaurant Address"
value={settings.address}
onChange={handleChange}
/>

</motion.div>


<motion.div

className="settings-card"

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
duration:.45,
delay:.08
}}

whileHover={{
y:-8
}}

>

<h2>

<FaGlobe className="section-icon"/>

Social Media

</h2>

<input
name="facebook"
placeholder="Facebook Link"
value={settings.facebook}
onChange={handleChange}
/>

<input
name="instagram"
placeholder="Instagram Link"
value={settings.instagram}
onChange={handleChange}
/>

<input
name="whatsapp"
placeholder="WhatsApp Number"
value={settings.whatsapp}
onChange={handleChange}
/>

</motion.div>


<button
className="save-settings-btn"
type="submit"
>

<FaSave style={{marginRight:"8px"}}/>

Save Changes

</button>

</form>

</motion.div>

</div>
);
}

export default AdminSettings;