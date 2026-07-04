const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");

// Forgot Password
router.post("/forgot-password", (req, res) => {

const { email } = req.body;

const code = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

db.query(
    "UPDATE users SET reset_code=? WHERE email=?",
    [code, email],
    (err, result) => {

if (err) return res.json(err);

res.json({
success: true,
code,
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

if (err) return res.json(err);

res.json({
success: true,

      });

    }
  );
});

module.exports = router;
