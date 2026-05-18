import { useContext, useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Context
import { AuthContext } from "../context/AuthContext";

// Services
import {
  sendLoginOTP,
  verifyLoginOTP,
} from "../services/authService";

const Login = () => {
  // Navigate
  const navigate = useNavigate();

  // Context
  const { login } =
    useContext(AuthContext);

  // ================= STATES =================

  const [loginType, setLoginType] =
    useState("phone");

  const [loginId, setLoginId] =
    useState("");

  const [otp, setOTP] =
    useState("");

  const [showOTPBox, setShowOTPBox] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ================= SEND OTP =================

  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Validation
    if (!loginId.trim()) {
      return toast.error(
        "Please Enter Login Details"
      );
    }

    try {
      setLoading(true);

      const data =
        await sendLoginOTP({
          loginId: loginId.trim(),
        });

      // Success Toast
      toast.success(
        data.message ||
          "OTP Sent Successfully"
      );

      // Show OTP Box
      setShowOTPBox(true);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.message ||
          "Failed To Send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    // OTP Validation
    if (otp.length !== 6) {
      return toast.error(
        "Enter Valid 6 Digit OTP"
      );
    }

    try {
      setLoading(true);

      const data =
        await verifyLoginOTP({
          loginId: loginId.trim(),
          otp: otp.trim(),
        });

      // Save User + Token
      login(data.user, data.token);

      // Success Toast
      toast.success(
        "Login Successful"
      );

      // Redirect Home
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Student Login
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login To Continue
        </p>

        {/* ================= LOGIN TYPE ================= */}

        {!showOTPBox && (
          <div className="flex items-center justify-center gap-6 mb-6">

            {/* Phone */}
            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                value="phone"
                checked={loginType === "phone"}
                onChange={() =>
                  setLoginType("phone")
                }
              />

              <span>
                Phone Number
              </span>

            </label>

            {/* Email */}
            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                value="email"
                checked={loginType === "email"}
                onChange={() =>
                  setLoginType("email")
                }
              />

              <span>
                Email
              </span>

            </label>

          </div>
        )}

        {/* ================= SEND OTP FORM ================= */}

        {!showOTPBox ? (
          <form
            onSubmit={handleSendOTP}
            className="space-y-5"
          >

            {/* Input */}
            <div>

              <label className="block mb-2 font-medium">

                {loginType === "phone"
                  ? "Phone Number"
                  : "Email Address"}

              </label>

              <input
                type={
                  loginType === "phone"
                    ? "text"
                    : "email"
                }
                value={loginId}
                onChange={(e) =>
                  setLoginId(
                    e.target.value
                  )
                }
                placeholder={
                  loginType === "phone"
                    ? "Enter Phone Number"
                    : "Enter Email Address"
                }
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-70"
            >

              {loading
                ? "Sending OTP..."
                : "Send OTP"}

            </button>

          </form>
        ) : (

          // ================= OTP VERIFY FORM =================

          <form
            onSubmit={handleVerifyOTP}
            className="space-y-5"
          >

            {/* Info */}
            <div className="text-center">

              <p className="text-gray-600 text-sm">
                OTP Sent Successfully
              </p>

              <p className="font-semibold text-purple-700 mt-1">
                {loginId}
              </p>

            </div>

            {/* OTP Input */}
            <div>

              <label className="block mb-2 font-medium">
                Enter OTP
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOTP(
                    e.target.value
                  )
                }
                placeholder="Enter 6 Digit OTP"
                required
                maxLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600 text-center tracking-widest text-xl"
              />

            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-70"
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

            {/* Change Login */}
            <button
              type="button"
              onClick={() => {
                setShowOTPBox(false);
                setOTP("");
              }}
              className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >

              Change Email / Phone

            </button>

          </form>
        )}

      </div>

    </div>
  );
};

export default Login;