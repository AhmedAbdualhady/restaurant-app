const express = require("express");
const router = express.Router();
const db = require("../config/database");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const STATUSES = ["Pending", "Accepted", "Preparing", "On The Way", "Delivered"];
const METHODS = ["bank", "wallet", "cash"];

const serverError = (res, err) => {
console.error(err);
return res.status(500).json({ success: false, message: "Server error" });
};


// ===============================
// Create order (لازمالمستخدميكونمسجلدخول)
// ===============================
router.post("/orders", auth, upload.single("paymentImage"), (req, res) => {
const { customer_name, phone, address, payment_method, items } = req.body;

if (!customer_name || !phone || !address) {
return res
      .status(400)
      .json({ success: false, message: "Missing customer details" });
  }

if (!METHODS.includes(payment_method)) {
return res
      .status(400)
      .json({ success: false, message: "Invalid payment method" });
  }

if (payment_method !== "cash" && !req.file) {
return res
      .status(400)
      .json({ success: false, message: "Payment proof is required" });
  }

let cart;

try {
cart = JSON.parse(items);
  } catch {
cart = null;
  }

if (!Array.isArray(cart) || cart.length === 0) {
return res.status(400).json({ success: false, message: "Cart is empty" });
  }

const ids = [...new Set(cart.map((i) => Number(i.id)).filter(Boolean))];

if (ids.length === 0) {
return res.status(400).json({ success: false, message: "Invalid items" });
  }

  // الأسعارتتجابمنالداتابيسمشمنالمتصفح (عشانماحديغيّرالسعر)
db.query(
    "SELECT id, name, price, category, image FROM foods WHERE id IN (?)",
    [ids],
    (err, foods) => {
if (err) return serverError(res, err);

const byId = new Map(foods.map((f) => [f.id, f]));

let total = 0;
const cleanItems = [];

cart.forEach((i) => {
const food = byId.get(Number(i.id));
if (!food) return;

total += Number(food.price);

cleanItems.push({
id: food.id,
name: food.name,
price: food.price,
category: food.category,
image: food.image,
        });
      });

if (cleanItems.length === 0) {
return res
          .status(400)
          .json({ success: false, message: "Invalid items" });
      }

total = Math.round(total * 100) / 100;

const sql =
        "INSERT INTO orders (user_id, customer_name, phone, address, total, payment_method, payment_image, items) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

db.query(
sql,
        [
req.user.id,
customer_name,
phone,
address,
total,
payment_method,
req.file ? req.file.filename : null,
JSON.stringify(cleanItems),
        ],
        (err, result) => {
if (err) return serverError(res, err);

res.json({
success: true,
message: "Order Placed",
orderId: result.insertId,
          });
        }
      );
    }
  );
});


// ===============================
// كلالطلبات (أدمنبس)
// ===============================
router.get("/orders", auth, isAdmin, (req, res) => {
db.query("SELECT * FROM orders ORDER BY id DESC", (err, result) => {
if (err) return serverError(res, err);

res.json(result);
  });
});


// ===============================
// طلباتالمستخدمالحالي (لصفحةProfile)
// لازمتكونقبل /orders/:id
// ===============================
router.get("/orders/my", auth, (req, res) => {
db.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC",
    [req.user.id],
    (err, result) => {
if (err) return serverError(res, err);

res.json(result);
    }
  );
});


// ===============================
// تتبعالطلب - عاملكنبيرجعالحالةبس
// (مابيرجعالاسمولاالتلفونولاالعنوان)
// ===============================
router.get("/orders/:id", (req, res) => {
db.query(
    "SELECT id, status, rating FROM orders WHERE id = ?",
    [req.params.id],
    (err, result) => {
if (err) return serverError(res, err);

if (result.length === 0) {
return res.status(404).json({ message: "Order not found" });
      }

res.json(result[0]);
    }
  );
});


// ===============================
// تغييرحالةالطلب (أدمنبس)
// ===============================
router.put("/orders/:id", auth, isAdmin, (req, res) => {
const { status } = req.body;

if (!STATUSES.includes(status)) {
return res.status(400).json({ success: false, message: "Invalid status" });
  }

db.query(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err, result) => {
if (err) return serverError(res, err);

res.json({ success: true, result });
    }
  );
});


// ===============================
// تقييمالطلب (بعدالتوصيلومرةواحدةبس)
// ===============================
router.put("/orders/:id/rating", (req, res) => {
const rating = Number(req.body.rating);

if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
return res.status(400).json({ success: false, message: "Invalid rating" });
  }

db.query(
    "UPDATE orders SET rating = ? WHERE id = ? AND status = 'Delivered' AND (rating IS NULL OR rating = 0)",
    [rating, req.params.id],
    (err, result) => {
if (err) return serverError(res, err);

if (result.affectedRows === 0) {
return res
          .status(400)
          .json({ success: false, message: "Order can't be rated" });
      }

res.json({ success: true });
    }
  );
});


module.exports = router;
