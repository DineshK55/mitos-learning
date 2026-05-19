// ================= DATABASE CONNECTION =================

const db = require("../config/db");

// =====================================================
// CREATE ORDER
// =====================================================

const createOrder = async (
  user_id,
  total_amount,
  payment_method,
  shipping_address
) => {

  const query = `
    INSERT INTO orders
    (
      user_id,
      total_amount,
      payment_method,
      shipping_address
    )
    VALUES (?, ?, ?, ?)
  `;

  const [result] =
    await db.execute(
      query,
      [
        user_id,
        total_amount,
        payment_method,
        shipping_address,
      ]
    );

  return result;
};

// =====================================================
// ADD ORDER ITEM
// =====================================================

const addOrderItem = async (
  order_id,
  product_id,
  quantity,
  price
) => {

  const query = `
    INSERT INTO order_items
    (
      order_id,
      product_id,
      quantity,
      price
    )
    VALUES (?, ?, ?, ?)
  `;

  const [result] =
    await db.execute(
      query,
      [
        order_id,
        product_id,
        quantity,
        price,
      ]
    );

  return result;
};

// =====================================================
// GET USER ORDERS
// =====================================================

const getUserOrders = async (
  user_id
) => {

  const query = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  const [orders] =
    await db.execute(
      query,
      [user_id]
    );

  return orders;
};

// =====================================================
// GET SINGLE ORDER
// =====================================================

const getSingleOrder = async (
  order_id
) => {

  const query = `
    SELECT *
    FROM orders
    WHERE id = ?
  `;

  const [orders] =
    await db.execute(
      query,
      [order_id]
    );

  return orders[0];
};

// =====================================================
// GET ALL ORDERS (ADMIN)
// =====================================================

const getAllOrders = async () => {

  const query = `
    SELECT *
    FROM orders
    ORDER BY created_at DESC
  `;

  const [orders] =
    await db.execute(query);

  return orders;
};

// =====================================================
// UPDATE ORDER STATUS
// =====================================================

const updateOrderStatus =
  async (
    order_id,
    order_status
  ) => {

    const query = `
      UPDATE orders
      SET order_status = ?
      WHERE id = ?
    `;

    const [result] =
      await db.execute(
        query,
        [
          order_status,
          order_id,
        ]
      );

    return result;
  };

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

module.exports = {
  createOrder,
  addOrderItem,
  getUserOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
};