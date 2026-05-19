// API Instance
import api from "./api";

// ================= REGISTER USER =================

export const registerUser = async (userData) => {
  try {
    const response = await api.post(
      "/auth/register",
      userData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ================= SEND LOGIN OTP =================

export const sendLoginOTP = async (loginData) => {
  try {
    const response = await api.post(
      "/auth/send-otp",
      loginData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ================= VERIFY LOGIN OTP =================

export const verifyLoginOTP = async (otpData) => {
  try {
    const response = await api.post(
      "/auth/verify-otp",
      otpData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ================= FORGOT PASSWORD OTP =================

export const forgotPasswordOTP = async (emailData) => {
  try {
    const response = await api.post(
      "/auth/forgot-password",
      emailData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ================= RESET PASSWORD =================

export const resetPassword = async (resetData) => {
  try {
    const response = await api.post(
      "/auth/reset-password",
      resetData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};