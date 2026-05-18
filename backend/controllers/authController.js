// Database Connection
const db = require("../config/db");

// Nodemailer
const nodemailer = require("nodemailer");



// JWT
const jwt = require("jsonwebtoken");

// ================= REGISTER USER =================

exports.registerUser = async (req, res) => {
  try {
    // Get Data
    const {
      name,
      phone,
      email,
      state,
      studentClass,
    } = req.body;

    // Check Existing User
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );

    // User Exists
    if (existingUser.length > 0) {
      return res.status(400).json({
        message:
          "Email or Phone Already Registered",
      });
    }

    // Insert User
    await db.query(
      `INSERT INTO users 
      (name, phone, email, state, studentClass) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        email,
        state,
        studentClass,
      ]
    );

    // Success
    res.status(201).json({
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= SEND LOGIN OTP =================

exports.sendLoginOTP = async (req, res) => {
  try {
    // Get Email Or Phone
    const { loginId } = req.body;

    // Find User
    const [users] = await db.query(
      `SELECT * FROM users 
       WHERE email = ? OR phone = ?`,
      [loginId, loginId]
    );

    // User Not Found
    if (users.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // User Data
    const user = users[0];

    // Generate OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Expiry Time (10 Minutes)
    const expiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Save OTP In Database
    await db.query(
      `UPDATE users 
       SET otp = ?, otpExpiry = ?
       WHERE id = ?`,
      [otp, expiry, user.id]
    );

    // Send OTP Email
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail Options
    const mailOptions = {
      from: process.env.EMAIL_USER,

      to: user.email,

      subject: "Mitos Learning Login OTP",

      html: `
        <h2>Your Login OTP</h2>

        <h1>${otp}</h1>

        <p>This OTP expires in 10 minutes.</p>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    // Success
    res.status(200).json({
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= VERIFY LOGIN OTP =================

exports.verifyLoginOTP = async (req, res) => {
  try {
    // Get Data
    const { loginId, otp } = req.body;

    // Find User
    const [users] = await db.query(
      `SELECT * FROM users 
       WHERE email = ? OR phone = ?`,
      [loginId, loginId]
    );

    // User Not Found
    if (users.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // User Data
    const user = users[0];

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Check Expiry
    if (new Date(user.otpExpiry) < new Date()) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Clear OTP
    await db.query(
      `UPDATE users 
       SET otp = NULL,
           otpExpiry = NULL
       WHERE id = ?`,
      [user.id]
    );

    // Success
    res.status(200).json({
      message: "Login Successful",

      token,

      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        state: user.state,
        studentClass: user.studentClass,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};