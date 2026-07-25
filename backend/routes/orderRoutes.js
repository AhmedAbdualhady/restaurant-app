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
items,
} = req.body;

const payment_image = req.file
  ? req.file.filename
  : null;


const sql =
"INSERT INTO orders (customer_name, phone, address, total, payment_method, payment_image,items) VALUES (?, ?, ?, ?, ?, ?,?)";

db.query(
sql,
    [customer_name, phone, address, total, payment_method, payment_image,items],
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



router.get("/orders/:id", (req, res) => {

const sql =
"SELECT * FROM orders WHERE id=?";

db.query(
sql,
[req.params.id],
(err, result) => {

if(err) return res.json(err);

res.json(result[0]);

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





// Rate Order
router.put("/orders/:id/rating", (req, res) => {

const { rating } = req.body;

db.query(

"UPDATE orders SET rating=? WHERE id=?",

[rating, req.params.id],

(err) => {

if(err) return res.json(err);

res.json({
success:true
});

}

);

});





module.exports = router;


