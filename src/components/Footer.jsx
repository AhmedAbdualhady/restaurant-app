import { Link, useLocation } from "react-router-dom";


function Footer({ cartItems }) {
    
const location = useLocation();
return (
<footer className="mobile-nav">
<Link
to="/"
className={location.pathname === "/" ? "active-nav" : ""}
>
🏠Home
</Link>

<Link
to="/menu"
className={location.pathname === "/menu" ? "active-nav" : ""}
>
🍔Menu
</Link>

<Link
to="/cart"
className={`cart-link ${
location.pathname === "/cart"
      ? "active-nav"
      : ""
  }`}
>
🛒Cart
<span className="cart-badge">
    {cartItems.length}
</span>
</Link>

<Link
to="/login"
className={
location.pathname === "/login"
      ? "active-nav"
      : ""
  }
>
👤Login
</Link>

</footer>
  );
}

export default Footer;

