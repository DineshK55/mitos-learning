// =====================================================
// DATABASE CONNECTION
// =====================================================

const db = require("../config/db");

// =====================================================
// JWT
// =====================================================

const jwt = require("jsonwebtoken");

// =====================================================
// SEND EMAIL UTILITY
// =====================================================

const sendEmail = require("../utils/sendEmail");

// =====================================================
// REGISTER USER
// =====================================================

const registerUser = async (req, res) => {

  try {

    const {
      name,
      phone,
      email,
      state,
      studentClass,
    } = req.body;

    // CHECK EXISTING USER

    const [existingUser] = await db.query(

      `SELECT * FROM users
       WHERE email = ? OR phone = ?`,

      [email, phone]
    );

    if (existingUser.length > 0) {

      return res.status(400).json({
        message: "Email or Phone Already Registered",
      });
    }

    // INSERT USER

    await db.query(

      `INSERT INTO users
      (
        name,
        phone,
        email,
        state,
        studentClass
      )
      VALUES (?, ?, ?, ?, ?)`,

      [
        name,
        phone,
        email,
        state,
        studentClass,
      ]
    );

    return res.status(201).json({
      message: "Registration Successful",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// SEND LOGIN OTP
// =====================================================

const sendLoginOTP = async (req, res) => {

  try {

    const { loginId } = req.body;

    // FIND USER

    const [users] = await db.query(

      `SELECT * FROM users
       WHERE email = ? OR phone = ?`,

      [loginId, loginId]
    );

    // USER NOT FOUND

    if (users.length === 0) {

      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const user = users[0];

    // GENERATE OTP

    const otp = Math.floor(

      100000 + Math.random() * 900000

    ).toString();

    // OTP EXPIRY

    const expiry = new Date(

      Date.now() + 10 * 60 * 1000

    );

    // SAVE OTP

    await db.query(

      `UPDATE users
       SET otp = ?,
           otpExpiry = ?
       WHERE id = ?`,

      [otp, expiry, user.id]
    );

    // EMAIL HTML

    const htmlContent = `

      <div style="font-family: Arial; padding: 20px;">

        <h2>Mitos Learning Login OTP</h2>

        <h1 style="color: #2563eb;">
          ${otp}
        </h1>

        <p>
          This OTP expires in 10 minutes.
        </p>

      </div>
    `;

    // SEND EMAIL

    await sendEmail(

      user.email,
      "Mitos Learning Login OTP",
      htmlContent
    );

    return res.status(200).json({
      message: "OTP Sent Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =====================================================
// VERIFY LOGIN OTP
// =====================================================

const verifyLoginOTP = async (req, res) => {

  try {

    const { loginId, otp } = req.body;

    // FIND USER

    const [users] = await db.query(

      `SELECT * FROM users
       WHERE email = ? OR phone = ?`,

      [loginId, loginId]
    );

    // USER NOT FOUND

    if (users.length === 0) {

      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const user = users[0];

    // INVALID OTP

    if (user.otp !== otp) {

      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // OTP EXPIRED

    if (new Date(user.otpExpiry) < new Date()) {

      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    // GENERATE JWT

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

    // CLEAR OTP

    await db.query(

      `UPDATE users
       SET otp = NULL,
           otpExpiry = NULL
       WHERE id = ?`,

      [user.id]
    );

    return res.status(200).json({

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

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  registerUser,
  sendLoginOTP,
  verifyLoginOTP,
};