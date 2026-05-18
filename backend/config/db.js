// config/db.js

const mysql = require("mysql2/promise");


// ================= MYSQL CONNECTION =================

const db = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: process.env.DB_PORT,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    ssl: {
        rejectUnauthorized: false
    }
});


// ================= TEST DATABASE CONNECTION =================

const connectDB = async () => {

    try {

        const connection = await db.getConnection();

        console.log("Aiven MySQL Connected Successfully");

        connection.release();

    } catch (error) {

        console.log("Database Connection Error:", error);
    }
};


connectDB();

module.exports = db;