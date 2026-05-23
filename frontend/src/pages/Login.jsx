import { useContext, useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Icons
import {Mail,ShieldCheck,ArrowLeft,} from "lucide-react";

// Context
import { AuthContext } from "../context/AuthContext";

// Services
import { sendLoginOTP,verifyLoginOTP,} from "../services/authService";

import {useEffect,} from "react";

const Login = () => {

  // Navigate
  const navigate = useNavigate();

  // Context
 const { login, token,} = useContext(AuthContext);

  // ================= STATES =================

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
        "Please Enter Email Address"
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

  // ================= AUTO REDIRECT =================

useEffect(() => {

  if (token) {

    navigate("/");
  }

}, [token, navigate]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-white flex items-center justify-center px-4 py-10">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-[32px] p-6 sm:p-10">

        {/* TOP ICON */}
        <div className="flex justify-center mb-5">

          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-xl">

            {showOTPBox ? (

              <ShieldCheck
                size={38}
                className="text-white"
              />

            ) : (

              <Mail
                size={38}
                className="text-white"
              />
            )}

          </div>

        </div>

        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 leading-tight">

          {showOTPBox
            ? "Verify OTP"
            : "Student Login"}

        </h2>

        <p className="text-center text-gray-500 mt-3 mb-8 text-sm sm:text-base">

          {showOTPBox
            ? "Enter the OTP sent to your email"
            : "Secure Login Using Email OTP"}

        </p>

        {/* ================= SEND OTP FORM ================= */}

        {!showOTPBox ? (

          <form
            onSubmit={handleSendOTP}
            className="space-y-6"
          >

            {/* EMAIL INPUT */}
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
                  value={loginId}
                  onChange={(e) =>
                    setLoginId(
                      e.target.value
                    )
                  }
                  placeholder="Enter Your Email"
                  required
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-800 outline-none focus:border-purple-600 focus:bg-white transition"
                />

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 text-white font-bold text-lg disabled:opacity-70"
            >

              {loading
                ? "Sending OTP..."
                : "Send OTP"}

            </button>

            {/* REGISTER LINK */}

<div className="text-center">

  <p className="text-sm text-gray-500">

    Don’t have an account?

    <button
      type="button"
      onClick={() =>
        navigate("/register")
      }
      className="
      ml-2
      text-purple-700
      font-bold
      hover:underline
      "
    >

      Create Account

    </button>

  </p>

</div>


          </form>

        ) : (

          // ================= OTP VERIFY FORM =================

          <form
            onSubmit={handleVerifyOTP}
            className="space-y-6"
          >

            {/* EMAIL INFO */}
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-center">

              <p className="text-sm text-gray-600">
                OTP Sent To
              </p>

              <p className="text-purple-700 font-bold mt-1 break-all">

                {loginId}

              </p>

            </div>

            {/* OTP INPUT */}
            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700">

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
                placeholder="------"
                required
                maxLength={6}
                className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 text-center text-2xl tracking-[10px] font-bold outline-none focus:border-purple-600 focus:bg-white transition"
              />

            </div>

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 text-white font-bold text-lg disabled:opacity-70"
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={() => {

                setShowOTPBox(false);

                setOTP("");
              }}
              className="w-full h-14 rounded-2xl border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center gap-2 font-semibold text-gray-700"
            >

              <ArrowLeft size={18} />

              Change Email

            </button>

            <div className="text-center">

  <p className="text-sm text-gray-500">

    New Student?

    <button
      type="button"
      onClick={() =>
        navigate("/register")
      }
      className="
      ml-2
      text-purple-700
      font-bold
      hover:underline
      "
    >

      Register Here

    </button>

  </p>

</div>

          </form>
        )}

      </div>

    </div>
  );
};

export default Login;