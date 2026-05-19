// ======================================================
// EXPRESS
// ======================================================

const express =
  require("express");

const router =
  express.Router();

// ======================================================
// CONTROLLERS
// ======================================================

const {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  getSingleUser,
  getPremiumUsers,
} = require(
  "../controllers/adminController"
);

// ======================================================
// MIDDLEWARES
// ======================================================

const {
  protect,
  adminOnly,
} = require(
  "../middlewares/authMiddleware"
);

// ======================================================
// ADMIN LOGIN
// ======================================================

router.post(
  "/login",
  adminLogin
);

// ======================================================
// DASHBOARD STATS
// ======================================================

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStats
);

// ======================================================
// GET ALL USERS
// ======================================================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

// ======================================================
// GET SINGLE USER
// ======================================================

router.get(
  "/users/:id",
  protect,
  adminOnly,
  getSingleUser
);

// ======================================================
// GET PREMIUM USERS
// ======================================================

router.get(
  "/premium-users",
  protect,
  adminOnly,
  getPremiumUsers
);

// ======================================================
// EXPORT
// ======================================================

module.exports =
  router;