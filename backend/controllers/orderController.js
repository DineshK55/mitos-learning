// ================= ORDER MODEL =================

const {
  createOrder,
  addOrderItem,
  getUserOrders,
} = require("../models/orderModel");

// ================= DATABASE =================

const db = require("../config/db");

// =====================================================
// CREATE ORDER CONTROLLER
// =====================================================

const placeOrder = async (
  req,
  res
) => {

  try {

    // ================= REQUEST DATA =================

    const {
      products,
      shippingAddress,
      totalAmount,
    } = req.body;

    // ================= USER =================

    const user_id =
      req.user.id;

    // ================= VALIDATION =================

    if (
      !products ||
      products.length === 0
    ) {
      return res.status(400).json({
        message:
          "No Products Found",
      });
    }

    if (
      !shippingAddress
    ) {
      return res.status(400).json({
        message:
          "Shipping Address Required",
      });
    }

    // ================= SHIPPING ADDRESS =================

    const shipping_address =
      `
        ${shippingAddress.fullName},
        ${shippingAddress.mobile},
        ${shippingAddress.email},
        ${shippingAddress.address},
        ${shippingAddress.city},
        ${shippingAddress.state},
        ${shippingAddress.pincode}
      `;

    // ================= PAYMENT METHOD =================

    const payment_method =
      "PayU";

    // ================= CREATE MAIN ORDER =================

    const orderResult =
      await createOrder(
        user_id,
        totalAmount,
        payment_method,
        shipping_address
      );

    const order_id =
      orderResult.insertId;

    // ================= ADD ORDER ITEMS =================

    for (const item of products) {

      await addOrderItem(
        order_id,
        item.id,
        1,
        item.price
      );
    }

    // ================= CLEAR USER CART =================

    await db.execute(
      "DELETE FROM carts WHERE user_id = ?",
      [user_id]
    );

    // ================= RESPONSE =================

    res.status(201).json({
      success: true,
      message:
        "Order Created Successfully",
      order_id,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

// =====================================================
// GET MY ORDERS
// =====================================================

const fetchMyOrders = async (
  req,
  res
) => {

  try {

    // ================= USER =================

    const user_id =
      req.user.id;

    // ================= GET ORDERS =================

    const orders =
      await getUserOrders(
        user_id
      );

    // ================= RESPONSE =================

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
  placeOrder,
  fetchMyOrders,
};