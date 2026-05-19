import axios from "axios";

// =====================================================
// API URL
// =====================================================

const API_URL =
  "http://localhost:5000/api/banners";

// =====================================================
// TOKEN
// =====================================================

const getToken = () => {

 return localStorage.getItem(
  "token"
);
};

// =====================================================
// CREATE BANNER
// =====================================================

export const createBanner =
  async (formData) => {

    const response =
      await axios.post(
        `${API_URL}/create`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

// =====================================================
// GET ALL BANNERS
// =====================================================

export const getAllBanners =
  async () => {

    const response =
      await axios.get(
        API_URL
      );

    return response.data;
  };

// =====================================================
// GET SINGLE BANNER
// =====================================================

export const getSingleBanner =
  async (bannerId) => {

    const response =
      await axios.get(
        `${API_URL}/${bannerId}`
      );

    return response.data;
  };

// =====================================================
// UPDATE BANNER
// =====================================================

export const updateBanner =
  async (
    bannerId,
    formData
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${bannerId}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

// =====================================================
// TOGGLE BANNER STATUS
// =====================================================

export const toggleBannerStatus =
  async (bannerId) => {

    const response =
      await axios.put(
        `${API_URL}/toggle/${bannerId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

// =====================================================
// DELETE BANNER
// =====================================================

export const deleteBanner =
  async (bannerId) => {

    const response =
      await axios.delete(
        `${API_URL}/${bannerId}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };