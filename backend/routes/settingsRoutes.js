const express = require("express");
const router = express.Router();

const db = require("../config/database");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");



// GET Settings
router.get("/", (req, res) => {

db.query(
"SELECT * FROM website_settings WHERE id=1",
(err, result) => {

if (err) return res.json(err);

res.json(result[0]);

}

);

});



// UPDATE Settings
router.put("/", auth, isAdmin, (req, res) => {

const {

restaurant_name,

about,

phone,

email,

address,

facebook,

instagram,

whatsapp,

hero_title,

hero_description,

hero_button,

discount_title,

discount_description,

bank_name,
account_name,
account_number,

wallet_name,
wallet_number,

delivery_time,


} = req.body;


db.query(

`UPDATE website_settings
SET

restaurant_name=?,
about=?,

phone=?,
email=?,
address=?,

facebook=?,
instagram=?,
whatsapp=?,

hero_title=?,
hero_description=?,
hero_button=?,

discount_title=?,
discount_description=?,


bank_name=?,
account_name=?,
account_number=?,

wallet_name=?,
wallet_number=?,

delivery_time=?

WHERE id=1`,

[
restaurant_name,

about,

phone,
email,
address,

facebook,
instagram,
whatsapp,

hero_title,
hero_description,
hero_button,

discount_title,
discount_description,

bank_name,
account_name,
account_number,

wallet_name,
wallet_number,

delivery_time,

],


(err) => {

if (err) return res.json(err);

res.json({
success: true,
message: "Settings Updated",
});

}

);

});

module.exports = router;


