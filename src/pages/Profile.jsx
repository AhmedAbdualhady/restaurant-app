import "../styles/Profile.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
FaBoxOpen,
FaCheckCircle,
FaMotorcycle,
FaDollarSign,
FaMapMarkedAlt,
FaSignOutAlt,
} from "react-icons/fa";

const API = "https://restaurant-app-production-0924.up.railway.app";

const emojiFor = (category) =>
  ({ Burger: "🍔", Pizza: "🍕", Drink: "🥤", Dessert: "🍰" }[category] || "🍽");

// نجمعالمنتجاتالمتكررةفيالطلب
function groupItems(raw) {
let items = [];

try {
items = JSON.parse(raw) || [];
  } catch {
items = [];
  }

const map = {};

items.forEach((it) => {
if (!map[it.name]) {
map[it.name] = { name: it.name, category: it.category, count: 0 };
    }
map[it.name].count += 1;
  });

return Object.values(map);
}

function formatDate(value) {
if (!value) return "";
const d = new Date(value);
return isNaN(d) ? "" : d.toLocaleDateString(undefined, {
year: "numeric",
month: "short",
day: "numeric",
  });
}

function Profile() {
const navigate = useNavigate();

const [user] = useState(() => {
try {
return JSON.parse(localStorage.getItem("user"));
    } catch {
return null;
    }
  });

const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState("all");

useEffect(() => {
window.scrollTo({ top: 0, behavior: "auto" });

const token = localStorage.getItem("token");

if (!token) {
navigate("/login", { state: { from: "/profile" } });
return;
    }

const load = () =>
fetch(`${API}/api/orders/my`, {
headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // التوكنانتهى
if (res.status === 401) {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login", { state: { from: "/profile" } });
throw new Error("expired");
          }
return res.json();
        })
        .then((data) => {
setOrders(Array.isArray(data) ? data : []);
setLoading(false);
        })
        .catch(() => setLoading(false));

load();

    // تحديثتلقائيللحالات
const timer = setInterval(load, 8000);

return () => clearInterval(timer);
  }, [navigate]);

const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login");
  };

const delivered = orders.filter((o) => o.status === "Delivered");
const active = orders.filter((o) => o.status !== "Delivered");
const spent = delivered.reduce((sum, o) => sum + Number(o.total || 0), 0);

const shown =
filter === "delivered" ? delivered : filter === "active" ? active : orders;

const filters = [
    { id: "all", label: "All", count: orders.length },
    { id: "active", label: "In Progress", count: active.length },
    { id: "delivered", label: "Delivered", count: delivered.length },
  ];

const emptyText = {
all: "You haven't placed any orders yet.",
active: "No orders in progress right now.",
delivered: "No delivered orders yet.",
  }[filter];

return (
<motion.div
className="profile-page"
initial={{ opacity: 0, x: 60 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -60 }}
transition={{ duration: 0.45 }}
>
      {/* ---------- Header ---------- */}
<div className="pf-header">
<div className="pf-avatar">
          {(user?.name || "?").charAt(0).toUpperCase()}
</div>

<div className="pf-info">
<h1>{user?.name}</h1>
<p>{user?.email}</p>
</div>

<button className="pf-logout" onClick={logout}>
<FaSignOutAlt />
<span>Logout</span>
</button>
</div>

      {/* ---------- Stats ---------- */}
<div className="pf-stats">
<div className="pf-stat">
<FaBoxOpen />
<h3>{orders.length}</h3>
<p>Orders</p>
</div>

<div className="pf-stat">
<FaMotorcycle />
<h3>{active.length}</h3>
<p>In Progress</p>
</div>

<div className="pf-stat">
<FaCheckCircle />
<h3>{delivered.length}</h3>
<p>Delivered</p>
</div>

<div className="pf-stat">
<FaDollarSign />
<h3>${spent.toFixed(2)}</h3>
<p>Total Spent</p>
</div>
</div>

      {/* ---------- Filters ---------- */}
<h2 className="pf-title">My Orders</h2>

<div className="pf-filters">
        {filters.map((f) => (
<button
key={f.id}
className={filter === f.id ? "pf-chip active" : "pf-chip"}
onClick={() => setFilter(f.id)}
>
{f.label} ({f.count})
</button>
        ))}
</div>

      {/* ---------- Orders ---------- */}
      {loading ? (
<div className="pf-loading">Loading...</div>
      ) : shown.length === 0 ? (
<div className="pf-empty">
<p>{emptyText}</p>
<Link to="/menu" className="pf-track-btn">
Browse Menu
</Link>
</div>
      ) : (
<div className="pf-orders">
          {shown.map((order, index) => {
const status = order.status || "Pending";
const isDelivered = status === "Delivered";
const date = formatDate(order.created_at);

return (
<motion.div
key={order.id}
className={`pf-order ${isDelivered ? "done" : ""}`}
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
>
<div className="pf-order-top">
<div>
<h3>Order #{order.id}</h3>
                    {date &&<span className="pf-date">{date}</span>}
</div>

<span className={`pf-status pf-${status.replace(/\s/g, "")}`}>
                    {isDelivered &&<FaCheckCircle />}
                    {status}
</span>
</div>

<ul className="pf-items">
                  {groupItems(order.items).map((it) => (
<li key={it.name}>
{emojiFor(it.category)} {it.name} ×{it.count}
</li>
                  ))}
</ul>

<div className="pf-order-bottom">
<span className="pf-total">
                    ${Number(order.total || 0).toFixed(2)}
</span>

                  {order.rating > 0&& (
<span className="pf-rating">{"⭐".repeat(order.rating)}</span>
                  )}

<Link to={`/track/${order.id}`} className="pf-track-btn">
<FaMapMarkedAlt />
                    {isDelivered ? "View Order" : "Track Order"}
</Link>
</div>
</motion.div>
            );
          })}
</div>
      )}
</motion.div>
  );
}

export default Profile;

