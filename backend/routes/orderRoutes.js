const express = require("express");
const router = express.Router();
const db = require("../config/database");
const upload = require("../middleware/upload");

router.post(
  "/orders",
upload.single("paymentImage"),
 (req, res) => {

  const {
customer_name,
phone,
address,
total,
payment_method,
} = req.body;

const payment_image = req.file
  ? req.file.filename
  : null;


const sql =
"INSERT INTO orders (customer_name, phone, address, total, payment_method, payment_image) VALUES (?, ?, ?, ?, ?, ?)";

db.query(
sql,
    [customer_name, phone, address, total, payment_method, payment_image],
    (err, result) => {
if (err) return res.json(err);

res.json({
success: true,
message: "Order Placed",
orderId: result.insertId,
      });
    }
  );
});


router.get("/orders", (req, res) => {

const sql =
  "SELECT * FROM orders ORDER BY id DESC";

db.query(sql, (err, result) => {

if(err) return res.json(err);

res.json(result);

  });

});


router.put("/orders/:id", (req, res) => {

const { status } = req.body;

const sql =
  "UPDATE orders SET status=? WHERE id=?";


db.query(
sql,
  [status, req.params.id],
  (err, result) => {

if (err) {
console.log(err);
return res.json(err);
    }


res.json({
success: true,
result
    });

  }
);



});




module.exports = router;


