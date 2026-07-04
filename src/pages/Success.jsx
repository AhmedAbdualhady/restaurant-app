import "../styles/Success.css";
import { Link, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const orderId = location.state?.orderId;

return (
<div className="success-container">
<h1>🎉 Order Placed Successfully</h1>

<p>
Thank you for your order!
</p>

<h3>Order #{orderId}</h3>

<div className="success-buttons">
<Link to="/">
<button>
Back To Home
</button>
</Link>

<Link to="/menu">
<button>
Continue Shopping
</button>
</Link>
</div>
</div>
  );
}

export default Success;

