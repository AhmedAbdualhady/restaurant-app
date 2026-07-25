const express = require("express");
const router = express.Router();
const db = require("../config/database");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");





// GET all foods

router.get("/foods", (req, res) => {

const sql = "SELECT * FROM foods ORDER BY id ASC";

db.query(sql, (err, result) => {

if (err) return res.json(err);

res.json(result);

});

});




router.post("/foods", auth, isAdmin, upload.single("image"), (req, res) => {


const {
name,
price,
oldprice,
category,
rating,
popular,
hero,
discount
} = req.body;



const image = req.file
  ? req.file.filename
  : "";



if (hero == 1) {

db.query(
"UPDATE foods SET hero = 0",
(err) => {

if (err) return res.json(err);

const sql =

"INSERT INTO foods (name,price,oldprice,category,rating,image,popular,hero,discount) VALUES (?,?,?,?,?,?,?,?,?)";

db.query(
sql,

[
name,
price,
oldprice,
category,
rating,
image,
popular,
hero,
discount
],


(err) => {

if (err) return res.json(err);

res.json({
message:"Food added successfully"
});

});

});

} else {

const sql =

"INSERT INTO foods (name,price,oldprice,category,rating,image,popular,hero,discount) VALUES (?,?,?,?,?,?,?,?,?)";

db.query(
sql,

[
name,
price,
oldprice,
category,
rating,
image,
popular,
hero,
discount
],


(err) => {

if (err) return res.json(err);

res.json({
message:"Food added successfully"
});

});

}

});





router.put("/foods/:id", auth, isAdmin, upload.single("image"), (req, res) => {

const { id } = req.params;


const {
name,
price,
oldprice,
category,
rating,
popular,
hero,
discount
} = req.body;



const image = req.file
  ? req.file.filename
  : req.body.image;



if (hero == 1) {

db.query(
"UPDATE foods SET hero = 0",
(err) => {

if (err) return res.json(err);

const sql =

"UPDATE foods SET name=?, price=?, oldprice=?, category=?, rating=?, image=?, popular=?, hero=?, discount=? WHERE id=?";


db.query(
sql,

[
name,
price,
oldprice,
category,
rating,
image,
popular,
hero,
discount,
id
],


(err) => {

if (err) return res.json(err);

res.json({
message: "Food updated successfully",
});

}
);

}
);

} else {

const sql =

"UPDATE foods SET name=?, price=?, oldprice=?, category=?, rating=?, image=?, popular=?, hero=?, discount=? WHERE id=?";



db.query(
sql,

[
name,
price,
oldprice,
category,
rating,
image,
popular,
hero,
discount,
id
],


(err) => {

if (err) return res.json(err);

res.json({
message: "Food updated successfully",
});

}
);

}

});



router.delete("/foods/:id", auth, isAdmin, (req, res) => {

const { id } = req.params;

const sql = "DELETE FROM foods WHERE id=?";

db.query(sql, [id], (err, result) => {
if (err) return res.json(err);
res.json({ message: "Food deleted successfully" });
  });
});



module.exports = router;
