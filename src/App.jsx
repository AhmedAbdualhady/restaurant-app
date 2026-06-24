import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import { useEffect } from "react";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";





function App() {
  
const [cartItems, setCartItems] = useState(
JSON.parse(
localStorage.getItem("cartItems")
  ) || []
);

useEffect(() => {
localStorage.setItem(
    "cartItems",
JSON.stringify(cartItems)
  );
}, [cartItems]);


const user = JSON.parse(
localStorage.getItem("user")
);



return (
<>
<Navbar cart={cartItems.length}/>

<Routes>
<Route
path="/"
element={
<Home
cartItems={cartItems}
setCartItems={setCartItems}
    />
  }
/>

<Route
path="/menu"
element={
<Menu
cartItems={cartItems}
setCartItems={setCartItems}
    />
  }
/>

<Route
path="/cart"
element={
<Cart
cartItems={cartItems}
setCartItems={setCartItems}
    />
  }
/>
<Route path="/login" element={<Login />} />
<Route
path="/register"
element={<Register />}
/>


<Route
path="/checkout"
element={
<Checkout
cartItems={cartItems}
setCartItems={setCartItems}
    />
  }
/>


<Route
path="/success"
element={<Success />}
/>

<Route
path="/forgot-password"
element={<ForgotPassword />}
/>


<Route
path="/admin"
element={
user?.is_admin === 1
? <AdminDashboard />
: <Home />
}
/>



</Routes>

<Footer cartItems={cartItems} />
</>
  );
}

export default App;


