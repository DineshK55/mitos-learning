// API
import api from "./api";

// ================= CREATE ORDER =================

export const createOrder = async (
  orderData
) => {
  try {

    const response =
      await api.post(
        "/orders",
        orderData
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || error
    );
  }
};

// ================= GET USER ORDERS =================

export const getUserOrders =
  async () => {

    try {

      const response =
        await api.get(
          "/orders/my-orders"
        );

      return response.data;

    } catch (error) {

      throw (
        error.response?.data || error
      );
    }
  };

// ================= GET SINGLE ORDER =================

export const getSingleOrder =
  async (orderId) => {

    try {

      const response =
        await api.get(
          `/orders/${orderId}`
        );

      return response.data;

    } catch (error) {

      throw (
        error.response?.data || error
      );
    }
  };

// ================= ADMIN GET ALL ORDERS =================

export const getAllOrders =
  async () => {

    try {

      const response =
        await api.get("/orders");

      return response.data;

    } catch (error) {

      throw (
        error.response?.data || error
      );
    }
  };

// ================= UPDATE ORDER STATUS =================

export const updateOrderStatus =
  async (
    orderId,
    statusData
  ) => {

    try {

      const response =
        await api.put(
          `/orders/${orderId}`,
          statusData
        );

      return response.data;

    } catch (error) {

      throw (
        error.response?.data || error
      );
    }
  };