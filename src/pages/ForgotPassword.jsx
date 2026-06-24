
import "../styles/ForgotPassword.css";
import { useState } from "react";

function ForgotPassword() {

const [email, setEmail] = useState("");
const [code, setCode] = useState("");
const [newPassword, setNewPassword] = useState("");

const sendCode = async () => {

const res = await fetch(
      "http://localhost:5000/api/forgot-password",
      {
method: "POST",
headers: {
          "Content-Type": "application/json"
        },
body: JSON.stringify({
email
        })
      }
    );

const data = await res.json();

alert(
      "Verification Code: " + data.code
    );

  };

const resetPassword = async () => {

const res = await fetch(
      "http://localhost:5000/api/reset-password",
      {
method: "POST",
headers: {
          "Content-Type": "application/json"
        },

        
body: JSON.stringify({
email,
code,
newPassword
        })
      }
    );

const data = await res.json();

if (data.success) {

alert("Password Updated Successfully");


    }

  };

return (

<div className="forgot-container">

<div className="forgot-card">

<h2 className="forgot-title">
Forgot Password
</h2>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e) =>
setEmail(e.target.value)
          }
        />


<button
type="button"
onClick={sendCode}
>
Send Code
</button>

<input
type="text"
placeholder="Enter Code"
value={code}
onChange={(e) =>
setCode(e.target.value)
          }
        />

<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e) =>
setNewPassword(e.target.value)
          }
        />

<button
type="button"
onClick={resetPassword}
>
Reset Password
</button>

</div>

</div>

  );

}

export default ForgotPassword;

