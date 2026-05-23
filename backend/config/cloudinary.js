// =====================================================
// IMPORT CLOUDINARY
// =====================================================

const cloudinary =
  require("cloudinary")
    .v2;

// =====================================================
// CONFIG CLOUDINARY
// =====================================================

cloudinary.config({

  cloud_name:
    process.env
      .CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env
      .CLOUDINARY_API_KEY,

  api_secret:
    process.env
      .CLOUDINARY_API_SECRET,

});

console.log(
  process.env.CLOUDINARY_CLOUD_NAME
);

// =====================================================
// EXPORT
// =====================================================

module.exports =
  cloudinary;