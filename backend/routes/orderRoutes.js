// ================= EXPRESS =================

const express = require("express");

// ================= ROUTER =================

const router = express.Router();

// ================= CONTROLLERS =================

const {
  placeOrder,
  fetchMyOrders,
} = require("../controllers/orderController");

// ================= MIDDLEWARES =================

const {
  protect,
} = require(
  "../middlewares/authMiddleware"
);

const adminMiddleware =
  require("../middlewares/adminMiddleware");

// =====================================================
// CREATE ORDER
// POST /api/orders
// =====================================================

router.post(
  "/",
  protect,
  placeOrder
);

// =====================================================
// GET MY ORDERS
// GET /api/orders/my-orders
// =====================================================

router.get(
  "/my-orders",
  protect,
  fetchMyOrders
);

// =====================================================
// FUTURE ADMIN ROUTES
// =====================================================

// Example:
// router.get(
//   "/",
//   protect,
//   adminMiddleware,
//   getAllOrders
// );

// Example:
// router.put(
//   "/:id",
//   protect,
//   adminMiddleware,
//   updateOrderStatus
// );

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;