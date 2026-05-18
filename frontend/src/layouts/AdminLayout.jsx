import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaTachometerAlt,
  FaSignOutAlt,
  FaImages,
  FaChevronDown,
  FaPlus,
  FaList,
} from "react-icons/fa";

import {
  useState,
} from "react";

function AdminLayout({
  children,
}) {

  // =====================================================
  // LOCATION + NAVIGATE
  // =====================================================

  const location =
    useLocation();

  const navigate =
    useNavigate();

  // =====================================================
  // DROPDOWN STATE
  // =====================================================

  const [
    bannerDropdown,
    setBannerDropdown,
  ] = useState(true);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate(
      "/admin/login"
    );
  };

  return (

    <div className="bg-gray-100 flex min-h-screen">

      {/* ===================================================== */}
      {/* SIDEBAR */}
      {/* ===================================================== */}

      <div className="w-64 bg-purple-800 text-white fixed left-0 top-0 h-screen flex flex-col shadow-xl z-50">

        {/* ===================================================== */}
        {/* LOGO */}
        {/* ===================================================== */}

        <div className="px-5 py-5 border-b border-purple-700">

          <h1 className="text-3xl font-bold">
            Mitos Admin
          </h1>

          <p className="text-purple-200 text-sm mt-1">
            NEET Test Series Panel
          </p>

        </div>

        {/* ===================================================== */}
        {/* MENUS */}
        {/* ===================================================== */}

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">

          {/* DASHBOARD */}

          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              location.pathname ===
              "/admin/dashboard"
                ? "bg-white text-purple-800 shadow-md"
                : "hover:bg-purple-700"
            }`}
          >

            <FaTachometerAlt />

            Dashboard

          </Link>

          {/* PRODUCTS */}

          <Link
            to="/admin/products"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              location.pathname ===
              "/admin/products"
                ? "bg-white text-purple-800 shadow-md"
                : "hover:bg-purple-700"
            }`}
          >

            <FaBoxOpen />

            Products

          </Link>

          {/* ===================================================== */}
          {/* BANNERS DROPDOWN */}
          {/* ===================================================== */}

          <button
            onClick={() =>
              setBannerDropdown(
                !bannerDropdown
              )
            }
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-all duration-300"
          >

            <div className="flex items-center gap-4">

              <FaImages />

              <span>
                Banners
              </span>

            </div>

            <FaChevronDown
              className={`transition-transform duration-300 ${
                bannerDropdown
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {/* DROPDOWN MENUS */}

          {bannerDropdown && (

            <div className="ml-5 space-y-2">

              {/* ADD BANNER */}

              <Link
                to="/admin/add-banner"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname ===
                  "/admin/add-banner"
                    ? "bg-white text-purple-800"
                    : "hover:bg-purple-700"
                }`}
              >

                <FaPlus />

                Add Banner

              </Link>

              {/* ALL BANNERS */}

              <Link
                to="/admin/banners"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname ===
                  "/admin/banners"
                    ? "bg-white text-purple-800"
                    : "hover:bg-purple-700"
                }`}
              >

                <FaList />

                All Banners

              </Link>

            </div>

          )}

          {/* ORDERS */}

          <Link
            to="/admin/orders"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              location.pathname ===
              "/admin/orders"
                ? "bg-white text-purple-800 shadow-md"
                : "hover:bg-purple-700"
            }`}
          >

            <FaShoppingCart />

            Orders

          </Link>

          {/* USERS */}

          <Link
            to="/admin/users"
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              location.pathname ===
              "/admin/users"
                ? "bg-white text-purple-800 shadow-md"
                : "hover:bg-purple-700"
            }`}
          >

            <FaUsers />

            Users

          </Link>

        </div>

        {/* ===================================================== */}
        {/* LOGOUT */}
        {/* ===================================================== */}

        <div className="p-4 border-t border-purple-700">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-white text-purple-800 py-3 rounded-2xl font-bold hover:bg-gray-100 transition"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <div className="flex-1 ml-64 p-4 overflow-x-hidden">

        {children}

      </div>

    </div>
  );
}

export default AdminLayout;