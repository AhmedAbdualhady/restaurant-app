import "../styles/Login.css";
import { useState , useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(false);

useEffect(() => {

const savedEmail =
localStorage.getItem("userEmail");

if(savedEmail){

setEmail(savedEmail);
setRememberMe(true);

 }

}, []);

const handleLogin = (e) => {
e.preventDefault();

if (!email || !password) {
alert("Please fill all fields");
return;
    }
    
fetch("http://localhost:5000/api/login", {
method: "POST",
headers: {
    "Content-Type": "application/json",
  },
body: JSON.stringify({
email,
password,
  }),
})
  .then((res) =>res.json())
  .then((data) => {
if (data.success) {

localStorage.setItem(
  "user",
JSON.stringify(data.user)
);


if(rememberMe){

localStorage.setItem(
  "userEmail",
email
 );

}


alert("Login Successful");

navigate("/");
    } else {
alert("Invalid Email Or Password");
    }
  })
  .catch((err) =>console.log(err));
};




return (
<div className="login-container">
<h1>Login</h1>

<form className="login-form" onSubmit={handleLogin}>

<input
type="email"
required
placeholder="Enter Email"
value={email}
onChange={(e) =>setEmail(e.target.value)}
      />

<input
type={showPassword ? "text" : "password"}
required
minLength={8}
placeholder="Enter Password"
value={password}
onChange={(e) =>setPassword(e.target.value)}
/>

<button
type="button"
className="show-btn"
onClick={() =>setShowPassword(!showPassword)}
>
  {showPassword ? "Hide Password" : "Show Password"}
</button>

<label className="remember">
<input
type="checkbox"
checked={rememberMe}
onChange={() =>setRememberMe(!rememberMe)}
  />

Remember Me
</label>

<button type="submit">
Login
</button>

<Link className="forgot-password" to="/forgot-password">
Forgot Password?
</Link>

<p className="register-link">
Don't have an account?
<Link to="/register">
Register
</Link>
</p>
</form>

</div>
  );
}

export default Login;
