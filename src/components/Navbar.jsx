import { Link, useNavigate } from "react-router-dom";

function Navbar({ cart }) {
const navigate = useNavigate();


const handleLogout = () => {

localStorage.removeItem("user");
localStorage.removeItem("userEmail");

navigate("/login");

};


const user = JSON.parse(
localStorage.getItem("user")
);



const logout = () => {

localStorage.removeItem("user");

localStorage.removeItem("isAdmin");

window.location.href="/";

};


return (
<nav className="navbar">
<h2>🍔 Foodie</h2>

<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/menu">Menu</Link></li>
<li>
  
<Link to="/cart">
🛒Cart ({cart})
</Link>

  </li>
  
<button
className="logout-btn"
onClick={() => {

localStorage.removeItem(
  "userEmail"
 );

navigate("/login");

}}
>
Logout
</button>



</ul>
</nav>
  );
}

export default Navbar;


