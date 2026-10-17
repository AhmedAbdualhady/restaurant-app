import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminSettings from "./pages/AdminSettings";
import TrackOrder from "./pages/TrackOrder";
import Profile from "./pages/Profile";

import { AnimatePresence } from "framer-motion";

import FlyToCart from "./components/FlyToCart";

// لازمتتحملبعدملفاتالصفحاتعشانتغلبعلىCSSالقديم
import "./styles/Navbar.css";
import "./styles/MenuMobile.css";


// براAppعشانماتتعملمنجديد (remount) معكلrender
function ProtectedAdminRoute({ children }) {
const user = JSON.parse(localStorage.getItem("user") || "{}");

if (user?.is_admin !== 1) {
return <Navigate to="/" replace />;
  }

return children;
}

function RequireAuth({ children }) {
const location = useLocation();

if (!localStorage.getItem("token")) {
return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

return children;
}


function App() {
const [cartItems, setCartItems] = useState(
JSON.parse(localStorage.getItem("cartItems")) || []
  );

const [flyItem, setFlyItem] = useState(null);

const [cartShake, setCartShake] = useState(false);

const [darkMode, setDarkMode] = useState(
localStorage.getItem("theme") === "dark"
  );

useEffect(() => {
if (darkMode) {
document.body.classList.add("dark");
localStorage.setItem("theme", "dark");
    } else {
document.body.classList.remove("dark");
localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

useEffect(() => {
localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

const location = useLocation();

const isAdmin = location.pathname.startsWith("/admin");

return (
<>
<Navbar
cart={cartItems.length}
darkMode={darkMode}
setDarkMode={setDarkMode}
cartShake={cartShake}
      />

<AnimatePresence mode="wait">
<Routes location={location} key={location.pathname}>
<Route
path="/"
element={
<Home
cartItems={cartItems}
setCartItems={setCartItems}
setFlyItem={setFlyItem}
              />
            }
          />

<Route
path="/menu"
element={
<Menu
cartItems={cartItems}
setCartItems={setCartItems}
setFlyItem={setFlyItem}
              />
            }
          />

<Route
path="/cart"
element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route
path="/checkout"
element={
<Checkout cartItems={cartItems} setCartItems={setCartItems} />
            }
          />

<Route path="/success" element={<Success />} />

<Route path="/forgot-password" element={<ForgotPassword />} />

<Route
path="/profile"
element={
<RequireAuth>
<Profile />
</RequireAuth>
            }
          />

<Route
path="/admin"
element={
<ProtectedAdminRoute>
<AdminDashboard />
</ProtectedAdminRoute>
            }
          />

<Route
path="/admin/products"
element={
<ProtectedAdminRoute>
<AdminProducts />
</ProtectedAdminRoute>
            }
          />

<Route
path="/admin/home-settings"
element={
<ProtectedAdminRoute>
<AdminSettings />
</ProtectedAdminRoute>
            }
          />

<Route path="/track/:id" element={<TrackOrder />} />
</Routes>
</AnimatePresence>

<FlyToCart
flyItem={flyItem}
setFlyItem={setFlyItem}
setCartShake={setCartShake}
      />

      {!isAdmin&&<Footer cartItems={cartItems} />}
</>
  );
}

export default App;

