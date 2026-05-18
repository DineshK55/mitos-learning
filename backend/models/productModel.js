// =====================================================
// DATABASE CONNECTION
// =====================================================

const db = require("../config/db");

// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (
  productData
) => {
  const {
    title,
    description,
    original_price,
    discount_price,
    category,
    featured,
    status,
    thumbnail,
  } = productData;

  const query = `
    INSERT INTO products
    (
      title,
      description,
      original_price,
      discount_price,
      category,
      featured,
      status,
      thumbnail
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(
    query,
    [
      title,
      description,
      original_price,
      discount_price,
      category,
      featured,
      status,
      thumbnail,
    ]
  );

  return result;
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

const getAllProducts = async () => {
  const query = `
    SELECT * FROM products
    ORDER BY created_at DESC
  `;

  const [products] =
    await db.execute(query);

  return products;
};

// =====================================================
// GET PRODUCT BY ID
// =====================================================

const getProductById = async (
  id
) => {
  const query = `
    SELECT * FROM products
    WHERE id = ?
  `;

  const [product] =
    await db.execute(query, [id]);

  return product[0];
};

// =====================================================
// UPDATE PRODUCT
// =====================================================

const updateProduct = async (
  id,
  productData
) => {
  const {
    title,
    description,
    original_price,
    discount_price,
    category,
    featured,
    status,
    thumbnail,
  } = productData;

  const query = `
    UPDATE products

    SET
      title = ?,
      description = ?,
      original_price = ?,
      discount_price = ?,
      category = ?,
      featured = ?,
      status = ?,
      thumbnail = ?

    WHERE id = ?
  `;

  const [result] = await db.execute(
    query,
    [
      title,
      description,
      original_price,
      discount_price,
      category,
      featured,
      status,
      thumbnail,
      id,
    ]
  );

  return result;
};

// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (
  id
) => {
  const query = `
    DELETE FROM products
    WHERE id = ?
  `;

  const [result] =
    await db.execute(query, [id]);

  return result;
};

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};