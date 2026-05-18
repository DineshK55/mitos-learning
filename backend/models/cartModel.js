// Database Connection
const db = require("../config/db");




// Add To Cart
const addToCart = async (
  user_id,
  product_id,
  quantity
) => {

  const query = `
    INSERT INTO carts
    (
      user_id,
      product_id,
      quantity
    )
    VALUES (?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    user_id,
    product_id,
    quantity,
  ]);

  return result;
};




// Get User Cart
const getUserCart = async (user_id) => {

  const query = `
    SELECT
      carts.id,
      carts.product_id,
      carts.quantity,

      products.title,
      products.price,
      products.thumbnail

    FROM carts

    JOIN products
    ON carts.product_id = products.id

    WHERE carts.user_id = ?
  `;

  const [cartItems] = await db.execute(query, [
    user_id,
  ]);

  return cartItems;
};




// Remove Cart Item
const removeCartItem = async (id) => {

  const query = `
    DELETE FROM carts
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [id]);

  return result;
};




// Export Functions
module.exports = {
  addToCart,
  getUserCart,
  removeCartItem,
};