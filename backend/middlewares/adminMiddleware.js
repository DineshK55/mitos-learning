// Admin Middleware
const adminOnly = (req, res, next) => {

  try {

    // Check User Role
    if (req.user.role !== "admin") {

      return res.status(403).json({
        message: "Admin Access Only",
      });
    }





    next();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};




// Export Middleware
module.exports = adminOnly;