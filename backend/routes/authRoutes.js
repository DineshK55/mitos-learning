// Express
const express = require("express");

const router = express.Router();

// Auth Controller
const {
  registerUser,
  sendLoginOTP,
  verifyLoginOTP,
} = require("../controllers/authController");

// ================= ROUTES =================

// Register
router.post("/register", registerUser);

// Send OTP
router.post("/send-otp", sendLoginOTP);

// Verify OTP
router.post("/verify-otp", verifyLoginOTP);

// Export
module.exports = router;