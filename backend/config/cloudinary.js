// =====================================================
// IMPORTS
// =====================================================

const multer =
  require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary =
  require(
    "../config/cloudinary"
  );

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

        public_id:
          Date.now() +
          "-" +
          file.originalname
            .split(".")[0],

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

  const mimetype =
    allowedTypes.test(
      file.mimetype
    );

  if (mimetype) {

    return cb(
      null,
      true
    );

  }

  cb(
    new Error(
      "Only Images Allowed"
    )
  );

};

// =====================================================
// MULTER UPLOAD
// =====================================================

const upload =
  multer({

    storage,

    fileFilter,

  });

// =====================================================
// EXPORT
// =====================================================

module.exports =
  upload;