import { useEffect, useState } from "react";
import {
FaPhoneAlt,
FaEnvelope,
FaMapMarkerAlt,
FaFacebookF,
FaInstagram,
FaWhatsapp
} from "react-icons/fa";

import { motion } from "framer-motion";



function Footer(){

const [settings,setSettings]=useState({});

useEffect(()=>{

fetch("https://restaurant-app-production-0924.up.railway.app/api/settings")

.then(res=>res.json())

.then(data=>setSettings(data));

},[]);

return(


<motion.footer

className="footer"

initial={{
opacity:0,
y:30
}}
animate={{
opacity:1,
y:0
}}
transition={{
duration:.8
}}


>


<div className="footer-container">

<h2>{settings.restaurant_name}</h2>

<p>
{settings.about}
</p>


<div className="footer-info">

<p> <FaPhoneAlt/> {settings.phone}</p>

<p> <FaEnvelope/>  {settings.email}</p>

<p> <FaMapMarkerAlt/> {settings.address}</p>

</div>

<div className="footer-social">

<a
href={`https://wa.me/${settings.whatsapp}`}
target="_blank"
rel="noreferrer"
>

<FaWhatsapp/> WhatsApp
</a>

<a
href={settings.facebook}
target="_blank"
rel="noreferrer"
>
<FaFacebookF/> Facebook
</a>

<a
href={settings.instagram}
target="_blank"
rel="noreferrer"
>

<FaInstagram/> Instagram
</a>

</div>

<p className="copyright">

© 2026 {settings.restaurant_name}

</p>

</div>

</motion.footer>

);

}

export default Footer;

