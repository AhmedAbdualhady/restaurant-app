import { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
FaMoon,
FaSun,
FaBars,
FaTimes,
FaHome,
FaUtensils,
FaShoppingCart,
FaUserCircle,
FaUserShield,
FaSignInAlt,
FaSignOutAlt,
} from "react-icons/fa";

const API = "https://restaurant-app-production-0924.up.railway.app";

function Navbar({ cart, cartShake, darkMode, setDarkMode }) {
const navigate = useNavigate();
const menuRef = useRef(null);

const [open, setOpen] = useState(false);
const [settings, setSettings] = useState({ restaurant_name: "" });

const token = localStorage.getItem("token");

let user = null;
try {
user = JSON.parse(localStorage.getItem("user"));
  } catch {
user = null;
  }

useEffect(() => {
fetch(`${API}/api/settings`)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error(err));
  }, []);

  // اقفلالقائمةلمنالزوليضغطبرا
useEffect(() => {
const close = (e) => {
if (menuRef.current && !menuRef.current.contains(e.target)) {
setOpen(false);
      }
    };

document.addEventListener("pointerdown", close);
return () => document.removeEventListener("pointerdown", close);
  }, []);

const logout = () => {
localStorage.removeItem("user");
localStorage.removeItem("token");
setOpen(false);
navigate("/login");
  };

const links = [
    { to: "/", label: "Home", icon: <FaHome />, end: true },
    { to: "/menu", label: "Menu", icon: <FaUtensils /> },
    { to: "/cart", label: `Cart (${cart})`, icon: <FaShoppingCart /> },
  ];

if (token) {
links.push({ to: "/profile", label: "My Profile", icon: <FaUserCircle /> });
  }

if (user?.is_admin === 1) {
links.push({ to: "/admin", label: "Admin Dashboard", icon: <FaUserShield /> });
  }

return (
<motion.nav
className="navbar nb"
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>
<h2 className="home-logo" onClick={() => navigate("/")}>
🍔 {settings.restaurant_name}
</h2>

<div className="nb-right">
        {/* السلةتفضلظاهرةدايماعشانانيميشنFlyToCartيلقى .navbar-cart-badge */}
<motion.div
animate={cartShake ? { rotate: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
transition={{ duration: 0.45 }}
>
<NavLink
to="/cart"
className="cart-nav nb-cart"
aria-label="Cart"
onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
>
<FaShoppingCart />

<motion.span
className="navbar-cart-badge"
key={cart}
initial={{ scale: 0.7 }}
animate={
cartShake
                  ? { scale: [1, 1.45, 0.95, 1], rotate: [0, -12, 12, 0] }
                  : { scale: 1 }
              }
transition={{ duration: 0.45 }}
>
              {cart}
</motion.span>
</NavLink>
</motion.div>

<button
className={`dark-btn ${darkMode ? "active" : ""}`}
onClick={() => setDarkMode(!darkMode)}
aria-label="Toggle dark mode"
>
<span className="icon">
            {darkMode ? (
<FaSun className="sun-icon" />
            ) : (
<FaMoon className="moon-icon" />
            )}
</span>
</button>

        {/* زرالدخول / الخروجمنفصلبراالقائمة */}
        {!token ? (
<NavLink to="/login" className="login-btn">
<FaSignInAlt />
<span>Login</span>
</NavLink>
        ) : (
<button className="logout-btn" onClick={logout}>
<FaSignOutAlt />
<span>Logout</span>
</button>
        )}

        {/* القائمةالمنسدلة */}
<div className="nb-menu" ref={menuRef}>
<button
className={`nb-burger ${open ? "open" : ""}`}
onClick={() => setOpen(!open)}
aria-label="Menu"
aria-expanded={open}
>
            {open ? <FaTimes /> : <FaBars />}
</button>

<AnimatePresence>
            {open&& (
<motion.div
className="nb-dropdown"
initial={{ opacity: 0, y: -12, scale: 0.96 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -12, scale: 0.96 }}
transition={{ duration: 0.2 }}
>
                {links.map((link) => (
<NavLink
key={link.to}
to={link.to}
end={link.end}
onClick={() => setOpen(false)}
>
                    {link.icon}
<span>{link.label}</span>
</NavLink>
                ))}
</motion.div>
            )}
</AnimatePresence>
</div>
</div>
</motion.nav>
  );
}

export default Navbar;

