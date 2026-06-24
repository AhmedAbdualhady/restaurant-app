const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET all foods
router.get("/foods", (req, res) => {
const sql = "SELECT * FROM foods";

db.query(sql, (err, result) => {
if (err) return res.json(err);
res.json(result);
  });
});

module.exports = router;
