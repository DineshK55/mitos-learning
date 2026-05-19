// =====================================================
// API
// =====================================================

import api from "./api";

// =====================================================
// GET TOKEN
// =====================================================

const getToken = () => {
  return localStorage.getItem("token");
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

export const getAllProducts = async () => {
  try {
    const response =
      await api.get("/products");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || error
    );
  }
};

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

export const getSingleProduct = async (
  productId
) => {
  try {
    const response =
      await api.get(
        `/products/${productId}`
      );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || error
    );
  }
};

// =====================================================
// CREATE PRODUCT
// =====================================================

export const createProduct = async (
  productData
) => {
  try {
    const token = getToken();

    const response =
      await api.post(
        "/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || error
    );
  }
};

// =====================================================
// UPDATE PRODUCT
// =====================================================

export const updateProduct = async (
  productId,
  productData
) => {
  try {
    const token = getToken();

    const response =
      await api.put(
        `/products/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || error
    );
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================

export const deleteProduct = async (
  productId
) => {
  try {
    const token = getToken();

    const response =
      await api.delete(
        `/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || error
    );
  }
};