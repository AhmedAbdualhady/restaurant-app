const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");
const transporter = require("../utils/mailer");


// Forgot Password
router.post("/forgot-password", (req, res) => {

const { email } = req.body;

const code = Math.floor(
    100000 + Math.random() * 900000
  ).toString();


db.query(

"UPDATE users SET reset_code=? WHERE email=?",

[code, email],

async (err, result) => {

if (err) return res.json(err);

// الإيميلغيرموجود
if (result.affectedRows === 0) {

return res.json({
success: false,
message: "Email not found."
});

}


try{

await transporter.sendMail( {

from: `"Restaurant App 🍔" <${process.env.EMAIL_USER}>`,

to:email,

subject: "Password Reset Code - Restaurant App",

html:`

<h2 style="color:#ff4fa3;">
Restaurant App
</h2>

<p>You have requested a password reset.</p>

<p>Your verification code is:</p>

<h1 style="color:#ff4fa3;">
${code}
</h1>

<p>This code is valid 10 minutes only.</p>

<p>If you didn't request this, you can ignore this message.</p>


`

});


}catch(err){

return res.json({
success:false,
message:"Email failed"
});

}



res.json({

success:true,

message:"Verification code sent successfully."

});

}

);

});

// Reset Password
router.post("/reset-password", async(req, res) => {

const {
email,
code,
newPassword,
  } = req.body;


  const hashedPassword = await bcrypt.hash(newPassword, 10);

const sql =
  `UPDATE users
SET password=?,
reset_code=NULL
WHERE email=?
AND reset_code=?`;



db.query(
sql,
[hashedPassword, email, code],
(err, result) => {

if (err) {
return res.json(err);
}

// الكودأوالإيميلغلط
if (result.affectedRows === 0) {

return res.json({
success: false,
message: "Invalid verification code."
});

}

// النجاح
res.json({
success: true,
message: "Password updated successfully."
});

}
);
  
});

module.exports = router;
