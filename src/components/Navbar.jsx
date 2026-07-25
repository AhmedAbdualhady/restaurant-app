import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { motion } from "framer-motion";




function Navbar({

cart,

cartShake,

darkMode,

setDarkMode

}) { 






const navigate = useNavigate();

const logout = () => {

localStorage.removeItem("user");
localStorage.removeItem("token");

navigate("/login");

};


const [settings, setSettings] = useState({
restaurant_name: "",
});

useEffect(() => {
fetch("http://localhost:5000/api/settings")
    .then((res) => res.json())
    .then((data) => setSettings(data));
}, []);




return (

<motion.nav

className="navbar"

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




<h2 className="home-logo">

🍔 {settings.restaurant_name}

</h2>



<ul className="nav-links">


<NavLink to="/">
Home
</NavLink>

<NavLink to="/menu">
Menu
</NavLink>




<motion.div

animate={

cartShake

?{

rotate:[0,-10,10,-8,8,-4,4,0]

}

:{}

}


transition={{
duration:.45
}}

>


<NavLink
 to="/cart" 
  className="cart-nav"
  onClick={() => {
window.scrollTo({
top: 0,
behavior: "auto",
});
}}
  >
🛒 Cart



<motion.span

className="navbar-cart-badge"

key={cart}

initial={{
scale:.7
}}

animate={

cartShake

?{

scale:[1,1.45,.95,1],

rotate:[0,-12,12,0]

}

:{}

}

transition={{

duration:.45

}}

>

{cart}

</motion.span>

</NavLink>

</motion.div>


  {!localStorage.getItem("token") ? (


<NavLink to="/login" className="login-btn">
Login
</NavLink>



  ) : (

<button
className="logout-btn"
onClick={logout}
>
Logout
</button>

  )}




<button
className={`dark-btn ${darkMode ? "active" : ""}`}
onClick={()=>setDarkMode(!darkMode)}
>

<span className="icon">
{darkMode ? <FaSun className="sun-icon" /> : <FaMoon className="moon-icon"/>}
</span>


</button>





</ul>


</motion.nav>

  );
}

export default Navbar;


