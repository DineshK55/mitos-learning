// config/db.js

const mysql = require("mysql2/promise");


// Create MySQL Connection
const db = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME
});


// Test Connection
const connectDB = async () => {

    try {

        const connection = await db.getConnection();

        console.log("MySQL Connected");

        connection.release();

    } catch (error) {

        console.log("Database Connection Error:", error);
    }
};


connectDB();


module.exports = db;