import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

// ================= REACT =================

import {
  useContext,
  useState,
} from "react";

// ================= ICONS =================

import {
  Menu,
  X,
} from "lucide-react";

// ================= AUTH CONTEXT =================

import {
  AuthContext,
} from "../context/AuthContext";

// ================= LOGO =================

import logo from "../assets/logo.png";

function Navbar() {

  // ================= LOCATION =================

  const location =
    useLocation();

  // ================= NAVIGATE =================

  const navigate =
    useNavigate();

  // ================= AUTH =================

  const {
    user,
    logout,
  } = useContext(AuthContext);

  // ================= PROFILE DROPDOWN =================

  const [
    showProfile,
    setShowProfile,
  ] = useState(false);

  // ================= MOBILE MENU =================

  const [
    showMobileMenu,
    setShowMobileMenu,
  ] = useState(false);

  // ================= LOGOUT =================

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* ================= LEFT SIDE ================= */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          {/* LOGO */}

          <img
            src={logo}
            alt="Mitos Learning"
            className="w-11 h-11 sm:w-14 sm:h-14 object-contain rounded-2xl"
          />

          {/* TITLE */}

          <div>

            <h1 className="text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent">

              Mitos Learning

            </h1>

            <p className="hidden sm:block text-xs text-gray-500 mt-1">

              Premium NEET Test Series

            </p>

          </div>

        </Link>

        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden md:flex items-center gap-8 font-medium">

          {/* HOME */}

          <Link
            to="/"
            className={`transition duration-300 text-[15px] ${
              location.pathname === "/"
                ? "text-purple-700 font-semibold"
                : "text-gray-700 hover:text-purple-700"
            }`}
          >

            Home

          </Link>

          {/* CHECKOUT */}

          <button
            onClick={() =>
              navigate("/checkout")
            }
            className={`transition duration-300 text-[15px] ${
              location.pathname === "/checkout"
                ? "text-purple-700 font-semibold"
                : "text-gray-700 hover:text-purple-700"
            }`}
          >

            Checkout

          </button>

          {/* ================= USER PROFILE ================= */}

          {
            user ? (

              <div className="relative">

                {/* PROFILE BUTTON */}

                <button
                  onClick={() =>
                    setShowProfile(!showProfile)
                  }
                  className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-2xl transition"
                >

                  {/* USER ICON */}

                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 text-white flex items-center justify-center text-lg font-bold shadow-lg">

                    {
                      user?.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"
                    }

                  </div>

                  {/* USER TEXT */}

                  <div className="leading-tight text-left">

                    <p className="text-xs text-gray-500">

                      Welcome

                    </p>

                    <h3 className="text-sm font-semibold text-gray-800">

                      {user?.name}

                    </h3>

                  </div>

                </button>

                {/* ================= DROPDOWN ================= */}

                {
                  showProfile && (

                    <div className="absolute right-0 top-16 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 p-5">

                      {/* USER INFO */}

                      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">

                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 text-white flex items-center justify-center text-xl font-bold">

                          {
                            user?.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"
                          }

                        </div>

                        <div>

                          <h2 className="font-bold text-lg text-gray-800">

                            {user?.name}

                          </h2>

                          <p className="text-sm text-gray-500 break-all">

                            {user?.email}

                          </p>

                        </div>

                      </div>

                      {/* MENU */}

                      <div className="mt-4 flex flex-col gap-3">

                        <button
                          onClick={() =>
                            navigate("/profile")
                          }
                          className="w-full text-left px-4 py-3 rounded-2xl hover:bg-gray-100 transition font-medium"
                        >

                          My Profile

                        </button>

                        <button
                          onClick={() =>
                            navigate("/orders")
                          }
                          className="w-full text-left px-4 py-3 rounded-2xl hover:bg-gray-100 transition font-medium"
                        >

                          My Orders

                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition"
                        >

                          Logout

                        </button>

                      </div>

                    </div>

                  )
                }

              </div>

            ) : (

              <div className="flex items-center gap-5">

                {/* LOGIN */}

                <Link
                  to="/login"
                  className={`transition duration-300 ${
                    location.pathname === "/login"
                      ? "text-purple-700 font-semibold"
                      : "text-gray-700 hover:text-purple-700"
                  }`}
                >

                  Login

                </Link>

                {/* REGISTER */}

                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-violet-700 hover:scale-105 transition px-5 py-2.5 rounded-xl text-white font-semibold shadow-lg"
                >

                  Register

                </Link>

              </div>

            )
          }

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          onClick={() =>
            setShowMobileMenu(
              !showMobileMenu
            )
          }
          className="md:hidden w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center"
        >

          {
            showMobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )
          }

        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {
        showMobileMenu && (

          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-5 py-6 flex flex-col gap-5">

            {/* HOME */}

            <Link
              to="/"
              onClick={() =>
                setShowMobileMenu(false)
              }
              className={`font-medium ${
                location.pathname === "/"
                  ? "text-purple-700"
                  : "text-gray-700"
              }`}
            >

              Home

            </Link>

            {/* CHECKOUT */}

            <button
              onClick={() => {

                navigate("/checkout");

                setShowMobileMenu(false);

              }}
              className={`text-left font-medium ${
                location.pathname === "/checkout"
                  ? "text-purple-700"
                  : "text-gray-700"
              }`}
            >

              Checkout

            </button>

            {/* ================= USER SECTION ================= */}

            {
              user ? (

                <>

                  <div className="flex items-center gap-3 pt-3 border-t">

                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 text-white flex items-center justify-center font-bold">

                      {
                        user?.name
                          ? user.name.charAt(0).toUpperCase()
                          : "U"
                      }

                    </div>

                    <div>

                      <p className="font-semibold text-gray-800">

                        {user?.name}

                      </p>

                      <p className="text-sm text-gray-500">

                        {user?.email}

                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => {

                      navigate("/profile");

                      setShowMobileMenu(false);

                    }}
                    className="text-left font-medium text-gray-700"
                  >

                    My Profile

                  </button>

                  <button
                    onClick={() => {

                      navigate("/orders");

                      setShowMobileMenu(false);

                    }}
                    className="text-left font-medium text-gray-700"
                  >

                    My Orders

                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-3 rounded-2xl font-semibold"
                  >

                    Logout

                  </button>

                </>

              ) : (

                <>

                  <Link
                    to="/login"
                    onClick={() =>
                      setShowMobileMenu(false)
                    }
                    className="font-medium text-gray-700"
                  >

                    Login

                  </Link>

                  <Link
                    to="/register"
                    onClick={() =>
                      setShowMobileMenu(false)
                    }
                    className="bg-gradient-to-r from-purple-600 to-violet-700 text-white py-3 rounded-2xl font-semibold text-center"
                  >

                    Register

                  </Link>

                </>

              )
            }

          </div>

        )
      }

    </nav>
  );
}

export default Navbar;