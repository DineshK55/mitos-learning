// ======================================================
// EXPRESS ROUTER
// ======================================================

const express = require("express");

const router = express.Router();

// ======================================================
// MULTER
// ======================================================


const upload =
  require("../middlewares/uploadMiddleware");

// ======================================================
// CONTROLLER
// ======================================================

const {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
} = require("../controllers/bannerController");

// ======================================================
// ADMIN MIDDLEWARE
// ======================================================

const {
  protect,
  adminOnly,
} = require("../middlewares/authMiddleware");

// ======================================================
// MULTER STORAGE
// ======================================================



// ======================================================
// ROUTES
// ======================================================

// ======================================================
// CREATE BANNER
// ======================================================

router.post(
  "/create",
  protect,
  adminOnly,
  upload.single("image"),
  createBanner
);

// ======================================================
// GET ALL BANNERS
// ======================================================

router.get(
  "/",
  getAllBanners
);

// ======================================================
// GET SINGLE BANNER
// ======================================================

router.get(
  "/:id",
  getSingleBanner
);

// ======================================================
// UPDATE BANNER
// ======================================================

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateBanner
);

// ======================================================
// TOGGLE BANNER STATUS
// ======================================================

router.put(
  "/toggle/:id",
  protect,
  adminOnly,
  toggleBannerStatus
);

// ======================================================
// DELETE BANNER
// ======================================================

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteBanner
);

// ======================================================
// EXPORT
// ======================================================

module.exports = router;