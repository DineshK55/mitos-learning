// =====================================================
// PRODUCT MODEL
// =====================================================

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../models/productModel");

// =====================================================
// ADD PRODUCT CONTROLLER
// =====================================================

const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      original_price,
      discount_price,
      category,
      featured,
      status,
    } = req.body;

    // =====================================================
    // IMAGE
    // =====================================================

    const thumbnail = req.file
      ? req.file.filename
      : null;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !title ||
      !description ||
      !original_price ||
      !discount_price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    // =====================================================
    // CREATE PRODUCT
    // =====================================================

    await createProduct({
      title,
      description,
      original_price,
      discount_price,
      category,
      featured: featured || "false",
      status: status || "active",
      thumbnail,
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("FETCH PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

const fetchSingleProduct = async (
  req,
  res
) => {
  try {
    const product =
      await getProductById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(
      "FETCH SINGLE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// UPDATE PRODUCT
// =====================================================

const editProduct = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      original_price,
      discount_price,
      category,
      featured,
      status,
    } = req.body;

    // =====================================================
    // CHECK PRODUCT
    // =====================================================

    const existingProduct =
      await getProductById(
        req.params.id
      );

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // =====================================================
    // IMAGE UPDATE
    // =====================================================

    const thumbnail = req.file
      ? req.file.filename
      : existingProduct.thumbnail;

    // =====================================================
    // UPDATE PRODUCT
    // =====================================================

    await updateProduct(
      req.params.id,
      {
        title,
        description,
        original_price,
        discount_price,
        category,
        featured,
        status,
        thumbnail,
      }
    );

    // =====================================================
    // RESPONSE
    // =====================================================

    res.status(200).json({
      success: true,
      message:
        "Product Updated Successfully",
    });
  } catch (error) {
    console.log(
      "UPDATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================

const removeProduct = async (
  req,
  res
) => {
  try {
    const existingProduct =
      await getProductById(
        req.params.id
      );

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    await deleteProduct(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(
      "DELETE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  addProduct,
  fetchProducts,
  fetchSingleProduct,
  editProduct,
  removeProduct,
};