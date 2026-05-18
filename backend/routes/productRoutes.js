// ================= EXPRESS =================

const express = require("express");

// ================= ROUTER =================

const router = express.Router();

// ================= CONTROLLERS =================

const {
  addProduct,
  fetchProducts,
  fetchSingleProduct,
  editProduct,
  removeProduct,
} = require("../controllers/productController");

// ================= MIDDLEWARE =================

const upload =
  require("../middlewares/uploadMiddleware");

const {
  protect,
  adminOnly,
} = require("../middlewares/authMiddleware");

// =====================================================
// CREATE PRODUCT
// POST /api/products
// =====================================================

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("thumbnail"),
  addProduct
);

// =====================================================
// GET ALL PRODUCTS
// GET /api/products
// =====================================================

router.get(
  "/",
  fetchProducts
);

// =====================================================
// GET SINGLE PRODUCT
// GET /api/products/:id
// =====================================================

router.get(
  "/:id",
  fetchSingleProduct
);

// =====================================================
// UPDATE PRODUCT
// PUT /api/products/:id
// =====================================================

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("thumbnail"),
  editProduct
);

// =====================================================
// DELETE PRODUCT
// DELETE /api/products/:id
// =====================================================

router.delete(
  "/:id",
  protect,
  adminOnly,
  removeProduct
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;