const express = require("express");
const router = express.Router();

// Middleware
const {
  protect,
} = require("../middlewares/authMiddleware");

// Controllers
const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/userController");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

module.exports = router;