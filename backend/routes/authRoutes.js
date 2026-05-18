// =====================================================
// EXPRESS
// =====================================================

const express = require("express");

const router = express.Router();

// =====================================================
// AUTH CONTROLLER
// =====================================================

const authController = require("../controllers/authController");

// =====================================================
// ROUTES
// =====================================================

// REGISTER USER

router.post(
  "/register",
  authController.registerUser
);

// SEND LOGIN OTP

router.post(
  "/send-otp",
  authController.sendLoginOTP
);

// VERIFY LOGIN OTP

router.post(
  "/verify-otp",
  authController.verifyLoginOTP
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;