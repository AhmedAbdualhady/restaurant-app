const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {


const { name, email, password } = req.body;


const hashedPassword = await bcrypt.hash(password, 10);



db.query(
"SELECT * FROM users WHERE email=?",
[email],
(err, result) => {

if (err) return res.json(err);

if (result.length > 0) {

return res.json({
success:false,
message:"Email already exists"
});

}

db.query(
"INSERT INTO users (name,email,password) VALUES (?,?,?)",
[name, email, hashedPassword],
(err, insertResult) => {

if (err) return res.json(err);

res.json({
success:true,
message:"User Registered"
});

}
);

}
);

});



router.post("/login", async (req, res) => {

const { email, password } = req.body;

db.query(

"SELECT * FROM users WHERE email = ?",

[email],

async (err, result) => {

if (err) return res.json(err);

if (result.length === 0) {

return res.json({
success: false,
message: "Invalid Email or Password",
});

}

const match = await bcrypt.compare(
password,
result[0].password
);



if (match) {

const user = result[0];

const token = jwt.sign(
{
id: user.id,
is_admin: user.is_admin,
},
process.env.JWT_SECRET,
{
expiresIn: "7d",
}
);

res.json({
success: true,
token,
user: {
id: user.id,
name: user.name,
email: user.email,
is_admin: user.is_admin,
},
});


} else {

res.json({
success: false,
message: "Invalid Email or Password",
});

}

}

);

});



router.get("/users/count", (req, res) => {

db.query(
"SELECT COUNT(*) AS totalUsers FROM users",
(err, result) => {

if (err) return res.json(err);

res.json(result[0]);

});

});



module.exports = router;

