// ======================================================
// DATABASE
// ======================================================

const db =
  require("../config/db");

// ======================================================
// BANNER MODEL
// ======================================================

const bannerModel =
  require("../models/bannerModel");

// ======================================================
// CREATE BANNER
// ======================================================

const createBanner =
  async (req, res) => {

    try {

      const {
        title,
        redirect_url,
        status,
      } = req.body;

      // ======================================================
      // IMAGE
      // ======================================================

      let image = "";

      if (req.file) {

        image =
          req.file.filename;
      }

      // ======================================================
      // VALIDATION
      // ======================================================

      if (
        !title ||
        !image
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Title and image are required",
        });
      }

      // ======================================================
      // CREATE
      // ======================================================

      await bannerModel.createBanner({
        title,
        image,
        redirect_url,
        status,
      });

      res.status(201).json({
        success: true,
        message:
          "Banner created successfully",
      });

    } catch (error) {

      console.log(
        "Create Banner Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// GET ALL BANNERS
// ======================================================

const getAllBanners =
  async (req, res) => {

    try {

      const banners =
        await bannerModel.getAllBanners();

      res.status(200).json({
        success: true,
        banners,
      });

    } catch (error) {

      console.log(
        "Get Banner Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// GET SINGLE BANNER
// ======================================================

const getSingleBanner =
  async (req, res) => {

    try {

      const banner =
        await bannerModel.getBannerById(
          req.params.id
        );

      if (!banner) {

        return res.status(404).json({
          success: false,
          message:
            "Banner not found",
        });
      }

      res.status(200).json({
        success: true,
        banner,
      });

    } catch (error) {

      console.log(
        "Get Single Banner Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// UPDATE BANNER
// ======================================================

const updateBanner =
  async (req, res) => {

    try {

      const existingBanner =
        await bannerModel.getBannerById(
          req.params.id
        );

      if (!existingBanner) {

        return res.status(404).json({
          success: false,
          message:
            "Banner not found",
        });
      }

      // ======================================================
      // IMAGE UPDATE
      // ======================================================

      let image =
        existingBanner.image;

      if (req.file) {

        image =
          req.file.filename;
      }

      // ======================================================
      // UPDATE
      // ======================================================

      await bannerModel.updateBanner(
        req.params.id,
        {
          title:
            req.body.title,

          image,

          redirect_url:
            req.body.redirect_url,

          status:
            req.body.status,
        }
      );

      res.status(200).json({
        success: true,
        message:
          "Banner updated successfully",
      });

    } catch (error) {

      console.log(
        "Update Banner Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// TOGGLE BANNER STATUS
// ======================================================

const toggleBannerStatus =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const [banner] =
        await db.query(
          "SELECT * FROM banners WHERE id = ?",
          [id]
        );

      if (
        banner.length === 0
      ) {

        return res.status(404).json({
          success: false,
          message:
            "Banner Not Found",
        });
      }

      const currentStatus =
        banner[0].status;

      const newStatus =
        currentStatus === "active"
          ? "inactive"
          : "active";

      await db.query(
        "UPDATE banners SET status = ? WHERE id = ?",
        [newStatus, id]
      );

      res.status(200).json({
        success: true,
        message:
          "Banner Status Updated",
      });

    } catch (error) {

      console.log(
        "Toggle Banner Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// DELETE BANNER
// ======================================================

const deleteBanner =
  async (req, res) => {

    try {

      const existingBanner =
        await bannerModel.getBannerById(
          req.params.id
        );

      if (!existingBanner) {

        return res.status(404).json({
          success: false,
          message:
            "Banner not found",
        });
      }

      await bannerModel.deleteBanner(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Banner deleted successfully",
      });

    } catch (error) {

      console.log(
        "Delete Banner Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  toggleBannerStatus,
  deleteBanner,
};