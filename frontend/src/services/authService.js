// =====================================================
// API INSTANCE
// =====================================================

import api from "./api";

// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (
  userData
) => {

  try {

    const response =
      await api.post(
        "/auth/register",
        userData
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message:
          "Registration Failed",
      }
    );
  }
};

// =====================================================
// SEND LOGIN OTP
// =====================================================

export const sendLoginOTP = async (
  loginData
) => {

  try {

    const response =
      await api.post(
        "/auth/send-otp",
        loginData
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message:
          "OTP Send Failed",
      }
    );
  }
};

// =====================================================
// VERIFY LOGIN OTP
// =====================================================

export const verifyLoginOTP = async (
  otpData
) => {

  try {

    const response =
      await api.post(
        "/auth/verify-otp",
        otpData
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message:
          "OTP Verification Failed",
      }
    );
  }
};

// =====================================================
// FORGOT PASSWORD OTP
// =====================================================

export const forgotPasswordOTP =
  async (emailData) => {

    try {

      const response =
        await api.post(
          "/auth/forgot-password",
          emailData
        );

      return response.data;

    } catch (error) {

      throw (
        error.response?.data || {
          message:
            "Forgot Password Failed",
        }
      );
    }
  };

// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword = async (
  resetData
) => {

  try {

    const response =
      await api.post(
        "/auth/reset-password",
        resetData
      );

    return response.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message:
          "Reset Password Failed",
      }
    );
  }
};