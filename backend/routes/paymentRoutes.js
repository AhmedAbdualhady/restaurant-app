

const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/payment-settings", (req, res) => {

const sql =
  "SELECT * FROM payment_settings LIMIT 1";

db.query(sql, (err, result) => {

if (err) return res.json(err);

res.json(result[0]);

  });

});

module.exports = router;


