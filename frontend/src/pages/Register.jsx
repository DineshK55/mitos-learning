import { useState } from "react";

// React Router
import {
  Link,
  useNavigate,
} from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Icons
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";

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

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-white flex items-center justify-center px-4 py-10">

      {/* CARD */}

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-[32px] p-6 sm:p-10">

        {/* TOP */}

        <div className="text-center mb-10">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center shadow-xl">

            <GraduationCap
              size={38}
              className="text-white"
            />

          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-5">

            Student Registration

          </h2>

          <p className="text-gray-500 mt-3 text-sm sm:text-base">

            Create Your Premium Learning Account

          </p>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* NAME */}

          <div>

            <label className="block mb-3 text-sm font-semibold text-gray-700">

              Full Name

            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
                className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:border-purple-600 focus:bg-white transition"
              />

            </div>

          </div>

          {/* PHONE + EMAIL */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PHONE */}

            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700">

                Phone Number

              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  required
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:border-purple-600 focus:bg-white transition"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700">

                Email Address

              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:border-purple-600 focus:bg-white transition"
                />

              </div>

            </div>

          </div>

          {/* STATE + CLASS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* STATE */}

            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700">

                State

              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:border-purple-600 focus:bg-white transition appearance-none"
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

            </div>

            {/* CLASS */}

            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700">

                Class

              </label>

              <div className="relative">

                <GraduationCap
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  required
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:border-purple-600 focus:bg-white transition appearance-none"
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

            </div>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 hover:scale-[1.01] hover:shadow-xl transition-all duration-300 text-white font-bold text-lg disabled:opacity-70"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="text-center mt-7 text-gray-600 text-sm sm:text-base">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-purple-700 font-bold hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );
};

export default Register;