// Express
const express = require("express");


// Router
const router = express.Router();


// Cart Controllers
const {
  addCartItem,
  fetchUserCart,
  deleteCartItem,
} = require("../controllers/cartController");


// Auth Middleware
const {
  protect,
} = require("../middlewares/authMiddleware");




// Add To Cart
router.post(
  "/add",
  protect,
  addCartItem
);




// Get User Cart
router.get(
  "/my-cart",
  protect,
  fetchUserCart
);




// Remove Cart Item
router.delete(
  "/remove/:id",
  protect,
  deleteCartItem
);






// Export Router
module.exports = router;