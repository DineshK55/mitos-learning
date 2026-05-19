// routes/otpRoutes.js

const express = require("express");

const router = express.Router();

const {
    sendOTP,
    verifyOTP,
    forgotPasswordOTP,
    resetPassword
} = require("../controllers/otpController");

// Send OTP Route
router.post("/send-otp", sendOTP);

// Verify OTP Route
router.post("/verify-otp", verifyOTP);

// Forgot Password OTP Route
router.post("/forgot-password", forgotPasswordOTP);

// Reset Password Route
router.post("/reset-password", resetPassword);


module.exports = router;