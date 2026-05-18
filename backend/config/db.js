// =====================================================
// IMPORT MYSQL2
// =====================================================

const mysql = require("mysql2/promise");

// =====================================================
// CREATE MYSQL CONNECTION POOL
// =====================================================

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: {
    rejectUnauthorized: false,
  },
});

// =====================================================
// TEST DATABASE CONNECTION
// =====================================================

const connectDB = async () => {
  try {
    const connection =
      await pool.getConnection();

    console.log(
      "MYSQL DATABASE CONNECTED ✅"
    );

    connection.release();
  } catch (error) {
    console.log(error);
  }
};

connectDB();

// =====================================================
// EXPORT POOL
// =====================================================

module.exports = pool;