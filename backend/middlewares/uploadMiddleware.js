// =====================================================
// MULTER PACKAGE
// =====================================================

const multer =
  require("multer");

// =====================================================
// PATH PACKAGE
// =====================================================

const path =
  require("path");

// =====================================================
// STORAGE CONFIGURATION
// =====================================================

const storage =
  multer.diskStorage({

    // =====================================================
    // DESTINATION
    // =====================================================

    destination: function (
      req,
      file,
      cb
    ) {

      cb(null, "uploads/");
    },

    // =====================================================
    // FILE NAME
    // =====================================================

    filename: function (
      req,
      file,
      cb
    ) {

      const uniqueName =
        Date.now() +
        path.extname(
          file.originalname
        );

      cb(null, uniqueName);
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

  // =====================================================
  // ALLOWED TYPES
  // =====================================================

  const allowedExtensions =
    /jpg|jpeg|png|webp/;

  const extName =
    allowedExtensions.test(
      path
        .extname(
          file.originalname
        )
        .toLowerCase()
    );

  // =====================================================
  // MIME TYPES
  // =====================================================

  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const mimeType =
    allowedMimeTypes.includes(
      file.mimetype
    );

  // =====================================================
  // VALIDATION
  // =====================================================

  if (
    extName &&
    mimeType
  ) {

    return cb(null, true);

  } else {

    return cb(
      new Error(
        "Only JPG, JPEG, PNG, WEBP Images Allowed"
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