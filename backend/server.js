require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes =
require("./routes/paymentRoutes");


const settingsRoutes = require("./routes/settingsRoutes");





const app = express();

// ✅ 1. Middlewares (فيالأول)
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// ✅ 2. Routes
app.use("/api", foodRoutes);                                   // 👈الأفضلتضيف /api

app.use("/api", userRoutes);

app.use("/api", orderRoutes);

app.use("/api", authRoutes);

app.use("/api", paymentRoutes);

app.use("/api/admin", foodRoutes);


app.use("/api/settings", settingsRoutes);




// ✅ 3. Test Route
app.get("/", (req, res) => {
res.send("Restaurant API Running");
});

// ✅ 4. تشغيلالسيرفر
const PORT = process.env.PORT || 5000; // 👈لومفيشPORTفي .envاستخدم 5000
app.listen(PORT, () => {
console.log(`Server Running On Port ${PORT}`);
});

