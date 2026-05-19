import {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

// Context
import {
  AuthContext,
} from "../../context/AuthContext";

// API
import api from "../../services/api";

function AdminLogin() {

  // Navigate
  const navigate =
    useNavigate();

  // Context
  const { login } =
    useContext(AuthContext);

  // ================= STATES =================

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================================
  // HANDLE LOGIN
  // =====================================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    // Validation
    if (
      !formData.email ||
      !formData.password
    ) {
      return toast.error(
        "Please Fill All Fields"
      );
    }

    try {

      setLoading(true);

      // API
      const response =
        await api.post(
          "/admin/login",
          formData
        );

      // Save Auth
      login(
        response.data.admin,
        response.data.token
      );

      // Success
      toast.success(
        "Admin Login Successful"
      );

      // Redirect
      navigate(
        "/admin/dashboard"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        {/* ================= HEADING ================= */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-purple-700">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Mitos Learning Admin Panel
          </p>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Admin Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Admin Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
            />

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-purple-800 transition disabled:opacity-70"
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;