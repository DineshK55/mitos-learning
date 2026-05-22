// =====================================================
// IMPORTS
// =====================================================

const multer = require("multer");

const path = require("path");

const fs = require("fs");

// =====================================================
// CREATE UPLOADS FOLDER
// =====================================================

const uploadPath = path.join(
  __dirname,
  "../uploads"
);

if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath, {
    recursive: true,
  });

}

// =====================================================
// STORAGE CONFIG
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

      cb(null, uploadPath);

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

  const allowedTypes =
    /jpg|jpeg|png|webp/;

  const extname =
    allowedTypes.test(
      path
        .extname(
          file.originalname
        )
        .toLowerCase()
    );

  const mimetype =
    allowedTypes.test(
      file.mimetype
    );

  if (
    extname &&
    mimetype
  ) {

    return cb(null, true);

  }

  cb(
    new Error(
      "Only Images Allowed"
    )
  );

};

// =====================================================
// UPLOAD
// =====================================================

const upload = multer({

  storage,

  fileFilter,

});

// =====================================================
// EXPORT
// =====================================================

module.exports = upload;