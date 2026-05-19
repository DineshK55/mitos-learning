import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  // ================= LOCATION =================

  const location =
    useLocation();

  // ================= NAVIGATE =================

  const navigate =
    useNavigate();

  return (

    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Link to="/">

          <h1 className="text-3xl font-bold text-purple-700">

            Mitos Learning

          </h1>

        </Link>

        {/* ================= MENU ================= */}

        <div className="flex items-center gap-8 font-medium">

          {/* HOME */}

          <Link
            to="/"
            className={`transition duration-300 ${
              location.pathname === "/"
                ? "text-purple-700"
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
            className={`transition duration-300 ${
              location.pathname === "/checkout"
                ? "text-purple-700"
                : "text-gray-700 hover:text-purple-700"
            }`}
          >

            Checkout

          </button>

          {/* LOGIN */}

          <Link
            to="/login"
            className={`transition duration-300 ${
              location.pathname === "/login"
                ? "text-purple-700"
                : "text-gray-700 hover:text-purple-700"
            }`}
          >

            Login

          </Link>

          {/* REGISTER */}

          <Link
            to="/register"
            className={`transition duration-300 ${
              location.pathname === "/register"
                ? "text-purple-700"
                : "text-gray-700 hover:text-purple-700"
            }`}
          >

            Register

          </Link>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;