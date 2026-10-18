const mysql = require("mysql2");

// Poolبدلconnectionواحد: لوMySQLقفلالاتصالبعدفترةخمول
// الـpoolبيفتحاتصالجديدلوحدووالسيرفرمابيقع.
const db = mysql.createPool({
host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
waitForConnections: true,
connectionLimit: 10,
enableKeepAlive: true,
keepAliveInitialDelay: 0,
});

db.getConnection((err, connection) => {
if (err) {
console.error("Database Error:", err);
  } else {
console.log("MySQL Connected");
connection.release();
  }
});

module.exports = db;

