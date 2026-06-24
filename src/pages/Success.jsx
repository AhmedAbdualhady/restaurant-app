import "../styles/Success.css";
import { Link } from "react-router-dom";

function Success() {
return (
<div className="success-container">
<h1>🎉 Order Placed Successfully</h1>

<p>
Thank you for your order!
</p>

<h3>Order #1025</h3>

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

