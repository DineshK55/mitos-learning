// =====================================================
// IMPORTS
// =====================================================

const express = require("express");

const cors = require("cors");

const path = require("path");

require("dotenv").config();

// =====================================================
// DATABASE CONNECTION
// =====================================================

const db = require("./config/db");

// =====================================================
// ROUTE IMPORTS
// =====================================================

const userRoutes = require("./routes/userRoutes");

const otpRoutes = require("./routes/otpRoutes");

const productRoutes = require("./routes/productRoutes");

const cartRoutes = require("./routes/cartRoutes");

const orderRoutes = require("./routes/orderRoutes");

const adminRoutes = require("./routes/adminRoutes");

const authRoutes = require("./routes/authRoutes");

const bannerRoutes = require("./routes/bannerRoutes");

// =====================================================
// EXPRESS APP
// =====================================================

const app = express();

// =====================================================
// MIDDLEWARES
// =====================================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =====================================================
// STATIC FOLDER SERVING
// =====================================================

const uploadsPath = path.join(
  __dirname,
  "uploads"
);

app.use(
  "/uploads",
  express.static(uploadsPath)
);

console.log("UPLOAD PATH:", uploadsPath);


app.get("/check-upload", (req, res) => {

  res.send("UPLOAD ROUTE WORKING");

});

// =====================================================
// API ROUTES
// =====================================================

// USER ROUTES

app.use(
  "/api/users",
  userRoutes
);

// AUTH ROUTES

app.use(
  "/api/auth",
  authRoutes
);

// OTP ROUTES

app.use(
  "/api/otp",
  otpRoutes
);

// PRODUCT ROUTES

app.use(
  "/api/products",
  productRoutes
);

// CART ROUTES

app.use(
  "/api/cart",
  cartRoutes
);

// ORDER ROUTES

app.use(
  "/api/orders",
  orderRoutes
);

// ADMIN ROUTES

app.use(
  "/api/admin",
  adminRoutes
);

// BANNER ROUTES

app.use(
  "/api/banners",
  bannerRoutes
);

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

  res.send(
    "Mitos Learning Backend Running..."
  );

});

// =====================================================
// IMAGE TEST ROUTE
// =====================================================

app.get(
  "/test-image",
  (req, res) => {

    res.sendFile(
      path.join(
        __dirname,
        "uploads",
        "test.jpg"
      )
    );

  }
);

// =====================================================
// 404 ROUTE HANDLER
// =====================================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: "Route Not Found",

  });

});

// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});