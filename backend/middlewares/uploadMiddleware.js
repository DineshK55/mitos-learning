// =====================================================
// IMPORTS
// =====================================================

const multer = require("multer");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

// =====================================================
// CLOUDINARY STORAGE
// =====================================================

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (
      req,
      file
    ) => {

      return {

        folder:
          "mitos-learning",

        allowed_formats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
        ],

      };

    },

  });

// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes =
    /jpg|jpeg|png|webp/;

  const isValid =
    allowedTypes.test(
      file.mimetype
    );

  if (isValid) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only Image Files Allowed"
      )
    );

  }

};

// =====================================================
// MULTER UPLOAD
// =====================================================

const upload = multer({

  storage,

  fileFilter,

});

// =====================================================
// EXPORT
// =====================================================

module.exports = upload;