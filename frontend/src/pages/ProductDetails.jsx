import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

// Navbar
import Navbar from "../components/Navbar";

// Cart Context
import {
  useCart,
} from "../context/CartContext";

// Product Service
import {
  getSingleProduct,
} from "../services/productService";

function ProductDetails() {

  // ================= ROUTER =================

  const { id } = useParams();

  const navigate = useNavigate();

  // ================= STATES =================

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ================= CART =================

  const {
    addToCart,
    cartItems,
  } = useCart();

  // ================= FETCH PRODUCT =================

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data =
          await getSingleProduct(id);

        setProduct(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchProduct();

  }, [id]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-purple-700">
          Loading Product...
        </h1>

      </div>
    );
  }

  // ================= PRODUCT NOT FOUND =================

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-red-600">
          Product Not Found
        </h1>

      </div>
    );
  }

  // ================= CHECK CART =================

  const alreadyAdded =
    cartItems.find(
      (item) =>
        item.id === product.id
    );

  // ================= ADD TO CART =================

  const handleAddToCart = () => {

    if (!alreadyAdded) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ================= LEFT SIDE ================= */}

          <div>

            <img
              src={`http://localhost:5000/uploads/${product.thumbnail}`}
              alt={product.title}
              className="w-full h-[300px] sm:h-[450px] object-cover rounded-3xl shadow-lg"
            />

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div>

            {/* Title */}

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">

              {product.title}

            </h1>

            {/* Price */}

            <p className="text-3xl font-bold text-purple-700 mt-5">

              ₹ {product.price}

            </p>

            {/* Description */}

            <p className="text-gray-600 text-base mt-6 leading-relaxed">

              {product.description}

            </p>

            {/* Features */}

            <div className="mt-8 space-y-4">

              <div className="bg-white shadow-md rounded-xl p-4 text-sm">
                Chapter-wise Printed Tests
              </div>

              <div className="bg-white shadow-md rounded-xl p-4 text-sm">
                Detailed NEET Solutions
              </div>

              <div className="bg-white shadow-md rounded-xl p-4 text-sm">
                Fast Delivery Across India
              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              {/* Add To Cart */}

              <button
                onClick={handleAddToCart}
                disabled={alreadyAdded}
                className={`px-8 py-3 rounded-xl font-semibold transition duration-300 ${
                  alreadyAdded
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-purple-700 text-white hover:bg-purple-800"
                }`}
              >

                {alreadyAdded
                  ? "Added To Cart"
                  : "Add To Cart"}

              </button>

              {/* Buy Now */}

              <button
                onClick={() => {

                  handleAddToCart();

                  navigate("/checkout");
                }}
                className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition duration-300"
              >

                Buy Now

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;