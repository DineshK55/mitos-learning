// =====================================================
// JWT
// =====================================================

const jwt =
  require("jsonwebtoken");

// =====================================================
// PROTECT MIDDLEWARE
// =====================================================

const protect = (
  req,
  res,
  next
) => {

  let token =
    req.headers.authorization;

  // =====================================================
  // TOKEN CHECK
  // =====================================================

  if (!token) {

    return res.status(401).json({
      success: false,
      message: "No Token Provided",
    });
  }

  // =====================================================
  // GET TOKEN
  // =====================================================

  token =
    token.split(" ")[1];

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// =====================================================
// ADMIN ONLY
// =====================================================

const adminOnly = (
  req,
  res,
  next
) => {

  if (
    req.user &&
    req.user.role === "admin"
  ) {

    next();

  } else {

    return res.status(403).json({
      success: false,
      message:
        "Admin Access Only",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  protect,
  adminOnly,
};