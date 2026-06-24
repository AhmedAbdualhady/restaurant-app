import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  
const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);


const handleRegister = (e) => {
e.preventDefault();

if (password !== confirmPassword) { 
alert("Passwords do not match");
return;
}
  fetch("http://localhost:5000/api/register", {
method: "POST",
headers: {
    "Content-Type": "application/json",
  },
body: JSON.stringify({
name,
email,
password,
  }),
})
  .then((res) =>res.json())
  .then((data) => {

if (data.success) {
alert("Registered Successfully");
navigate("/login");

}else{

alert(data.message);

}
});
};
 

return (
<div className="register-container">
<h1>Create Account</h1>

<form className="register-form" onSubmit={handleRegister}>

<input
type="text"
required
placeholder="Full Name"
value={name}
onChange={(e) =>setName(e.target.value)}
      />

<input
type="email"
required
placeholder="Email"
value={email}
onChange={(e) =>setEmail(e.target.value)}
      />


<input
type={showPassword ? "text" : "password"}
required
minLength={8}
placeholder="Password"
value={password}
onChange={(e) =>setPassword(e.target.value)}
/>

<input
type={showPassword ? "text" : "password"}
required
minLength={8}
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e) =>setConfirmPassword(e.target.value)}
/>

<button
type="button"
className="show-btn"
onClick={() =>setShowPassword(!showPassword)}
>
  {showPassword ? "Hide Password" : "Show Password"}
</button>

<button type="submit" >
Register
</button>

<p className="login-link">
Already have an account?

<Link to="/login">
Login
</Link>
</p>
</form>
</div>
  );
}

export default Register;






