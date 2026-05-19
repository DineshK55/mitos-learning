// ======================================================
// DATABASE
// ======================================================

const db =
  require("../config/db");

// ======================================================
// CREATE BANNER
// ======================================================

const createBanner =
  async (bannerData) => {

    const {
      title,
      image,
      redirect_url,
      status,
    } = bannerData;

    const query = `
      INSERT INTO banners
      (
        title,
        image,
        redirect_url,
        status
      )
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      title,
      image,
      redirect_url,
      status,
    ];

    const [result] =
      await db.query(
        query,
        values
      );

    return result;
  };

// ======================================================
// GET ALL BANNERS
// ======================================================

const getAllBanners =
  async () => {

    const query = `
      SELECT *
      FROM banners
      ORDER BY created_at DESC
    `;

    const [rows] =
      await db.query(query);

    return rows;
  };

// ======================================================
// GET SINGLE BANNER
// ======================================================

const getBannerById =
  async (bannerId) => {

    const query = `
      SELECT *
      FROM banners
      WHERE id = ?
    `;

    const [rows] =
      await db.query(
        query,
        [bannerId]
      );

    return rows[0];
  };

// ======================================================
// UPDATE BANNER
// ======================================================

const updateBanner =
  async (
    bannerId,
    bannerData
  ) => {

    const {
      title,
      image,
      redirect_url,
      status,
    } = bannerData;

    const query = `
      UPDATE banners
      SET
        title = ?,
        image = ?,
        redirect_url = ?,
        status = ?
      WHERE id = ?
    `;

    const values = [
      title,
      image,
      redirect_url,
      status,
      bannerId,
    ];

    const [result] =
      await db.query(
        query,
        values
      );

    return result;
  };

// ======================================================
// DELETE BANNER
// ======================================================

const deleteBanner =
  async (bannerId) => {

    const query = `
      DELETE FROM banners
      WHERE id = ?
    `;

    const [result] =
      await db.query(
        query,
        [bannerId]
      );

    return result;
  };

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};