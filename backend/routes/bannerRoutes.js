// ======================================================
// EXPRESS ROUTER
// ======================================================

const express = require("express");

const router = express.Router();

// ======================================================
// MULTER
// ======================================================

const multer = require("multer");

const path = require("path");

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "uploads/banners");

  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },
});

// ======================================================
// FILE FILTER
// ======================================================

const fileFilter =
  (req, file, cb) => {

    const allowedTypes =
      /jpg|jpeg|png|webp/;

    const isValid =
      allowedTypes.test(
        path
          .extname(file.originalname)
          .toLowerCase()
      );

    if (isValid) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only images are allowed"
        )
      );
    }
  };

// ======================================================
// MULTER UPLOAD
// ======================================================

const upload = multer({
  storage,
  fileFilter,
});

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