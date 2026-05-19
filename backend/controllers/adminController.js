// ================= DATABASE CONNECTION =================

const db =
  require("../config/db");

// ================= BCRYPT =================

const bcrypt =
  require("bcryptjs");

// ================= JWT =================

const jwt =
  require("jsonwebtoken");

// ======================================================
// ADMIN LOGIN
// ======================================================

const adminLogin =
  async (req, res) => {

    try {

      // ======================================================
      // GET DATA
      // ======================================================

      const {
        email,
        password,
      } = req.body;

      // ======================================================
      // CHECK EMAIL
      // ======================================================

      const [users] =
        await db.execute(
          `
          SELECT *
          FROM users
          WHERE email = ?
          `,
          [email]
        );

      // ======================================================
      // ADMIN NOT FOUND
      // ======================================================

      if (
        users.length === 0
      ) {

        return res.status(404).json({
          message:
            "Admin Not Found",
        });
      }

      // ======================================================
      // ADMIN DATA
      // ======================================================

      const admin =
        users[0];

      // ======================================================
      // CHECK ROLE
      // ======================================================

      if (
        admin.role !==
        "admin"
      ) {

        return res.status(403).json({
          message:
            "Access Denied. Admin Only",
        });
      }

      // ======================================================
      // CHECK PASSWORD
      // ======================================================

      const isMatch =
        await bcrypt.compare(
          password,
          admin.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Credentials",
        });
      }

      // ======================================================
      // GENERATE TOKEN
      // ======================================================

      const token =
        jwt.sign(

          {
            id: admin.id,
            role: admin.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      // ======================================================
      // SUCCESS RESPONSE
      // ======================================================

      res.status(200).json({

        message:
          "Admin Login Successful",

        token,

        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// DASHBOARD STATS
// ======================================================

const getDashboardStats =
  async (req, res) => {

    try {

      // TOTAL USERS

      const [users] =
        await db.execute(
          `
          SELECT COUNT(*)
          AS totalUsers
          FROM users
          `
        );

      // TOTAL PRODUCTS

      const [products] =
        await db.execute(
          `
          SELECT COUNT(*)
          AS totalProducts
          FROM products
          `
        );

      // TOTAL ORDERS

      const [orders] =
        await db.execute(
          `
          SELECT COUNT(*)
          AS totalOrders
          FROM orders
          `
        );

      // TOTAL REVENUE

      const [revenue] =
        await db.execute(
          `
          SELECT
          IFNULL(
            SUM(total_amount),
            0
          )
          AS totalRevenue
          FROM orders
          `
        );

      // ======================================================
      // RESPONSE
      // ======================================================

      res.status(200).json({

        totalUsers:
          users[0].totalUsers,

        totalProducts:
          products[0].totalProducts,

        totalOrders:
          orders[0].totalOrders,

        totalRevenue:
          revenue[0].totalRevenue,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// GET ALL USERS
// ======================================================

const getAllUsers =
  async (req, res) => {

    try {

      const [users] =
        await db.execute(
          `
          SELECT
            id,
            name,
            email,
            phone,
            state,
            student_class,
            role
          FROM users
          ORDER BY id DESC
          `
        );

      // ======================================================
      // RESPONSE
      // ======================================================

      res.status(200).json({
        users,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// GET SINGLE USER
// ======================================================

const getSingleUser =
  async (req, res) => {

    try {

      // ======================================================
      // USER ID
      // ======================================================

      const { id } =
        req.params;

      // ======================================================
      // GET USER
      // ======================================================

      const [users] =
        await db.execute(
          `
          SELECT
            id,
            name,
            email,
            phone,
            state,
            student_class,
            role,
            created_at
          FROM users
          WHERE id = ?
          `,
          [id]
        );

      // ======================================================
      // USER NOT FOUND
      // ======================================================

      if (
        users.length === 0
      ) {

        return res.status(404).json({
          message:
            "User Not Found",
        });
      }

      // ======================================================
      // RESPONSE
      // ======================================================

      res.status(200).json({
        user: users[0],
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// GET PREMIUM USERS
// ======================================================

const getPremiumUsers =
  async (req, res) => {

    try {

      const [users] =
        await db.execute(
          `
          SELECT DISTINCT
            users.id,
            users.name,
            users.email
          FROM users
          JOIN orders
          ON users.id = orders.user_id
          `
        );

      // ======================================================
      // RESPONSE
      // ======================================================

      res.status(200).json({
        users,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  getSingleUser,
  getPremiumUsers,
};