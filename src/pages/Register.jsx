import { useState } from "react";

// React Router
import {
  Link,
  useNavigate,
} from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Service
import {
  registerUser,
} from "../services/authService";

const Register = () => {
  // Navigate
  const navigate = useNavigate();

  // ================= FORM STATE =================

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      email: "",
      state: "",
      studentClass: "",
    });

  // Loading
  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.state ||
      !formData.studentClass
    ) {
      return toast.error(
        "Please Fill All Fields"
      );
    }

    try {
      setLoading(true);

      // Register API
      const data =
        await registerUser({
          name:
            formData.name.trim(),

          phone:
            formData.phone.trim(),

          email:
            formData.email.trim(),

          state:
            formData.state,

          studentClass:
            formData.studentClass,
        });

      // Success Toast
      toast.success(
        data.message ||
          "Registration Successful"
      );

      // Redirect Login
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Student Registration
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Create Your Account
        </p>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
            />

          </div>

          {/* Phone */}
          <div>

            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
            />

          </div>

          {/* Email */}
          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
            />

          </div>

          {/* State */}
          <div>

            <label className="block mb-2 font-medium">
              State
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
            >

              <option value="">
                Select State
              </option>

              <option value="Tamil Nadu">
                Tamil Nadu
              </option>

              <option value="Kerala">
                Kerala
              </option>

              <option value="Karnataka">
                Karnataka
              </option>

              <option value="Andhra Pradesh">
                Andhra Pradesh
              </option>

              <option value="Telangana">
                Telangana
              </option>

              <option value="Maharashtra">
                Maharashtra
              </option>

              <option value="Delhi">
                Delhi
              </option>

              <option value="West Bengal">
                West Bengal
              </option>

              <option value="Uttar Pradesh">
                Uttar Pradesh
              </option>

              <option value="Gujarat">
                Gujarat
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* Class */}
          <div>

            <label className="block mb-2 font-medium">
              Class
            </label>

            <select
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
            >

              <option value="">
                Select Class
              </option>

              <option value="11">
                Class 11
              </option>

              <option value="12">
                Class 12
              </option>

              <option value="Repeater">
                Repeater
              </option>

            </select>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-70"
          >

            {loading
              ? "Creating Account..."
              : "Register"}

          </button>

        </form>

        {/* Login Link */}
        <p className="text-center mt-5 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-purple-700 font-semibold hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;