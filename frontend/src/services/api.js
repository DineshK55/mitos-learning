// =====================================================
// AXIOS
// =====================================================

import axios from "axios";

// =====================================================
// AXIOS INSTANCE
// =====================================================

const api = axios.create({
baseURL:
"https://mitos-learning-backend.onrender.com/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

api.interceptors.request.use(
  (config) => {

    // =====================================================
    // GET TOKEN
    // =====================================================

    const token =
      localStorage.getItem(
        "token"
      );

    // =====================================================
    // ATTACH TOKEN
    // =====================================================

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.response.use(
  (response) => {

    return response;
  },

  (error) => {

    // =====================================================
    // UNAUTHORIZED
    // =====================================================

    if (
      error.response?.status ===
      401
    ) {

      // REMOVE TOKEN

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      // =====================================================
      // CHECK ADMIN ROUTE
      // =====================================================

      const isAdminRoute =
        window.location.pathname.startsWith(
          "/admin"
        );

      // =====================================================
      // REDIRECT
      // =====================================================

      if (isAdminRoute) {

        window.location.href =
          "/admin/login";

      } else {

        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  }
);

// =====================================================
// EXPORT
// =====================================================

export default api;