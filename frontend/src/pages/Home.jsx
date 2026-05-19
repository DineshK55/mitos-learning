import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

// Navbar
import Navbar from "../components/Navbar";

// API
import {
  getAllProducts,
} from "../services/productService";

// Cart Context
import {
  useCart,
} from "../context/CartContext";

// Banner
import HomeBanner from "../components/HomeBanner";

// Product Card
import ProductCard from "../components/ProductCard";

function Home() {

  // =====================================================
  // NAVIGATE
  // =====================================================

  const navigate =
    useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedProducts,
    setSelectedProducts,
  ] = useState([]);

  // =====================================================
  // CART
  // =====================================================

  const {
    addToCart,
    removeFromCart,
    cartItems,
  } = useCart();

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const response =
            await getAllProducts();

          setProducts(
            response.products || []
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchProducts();

  }, []);

  // =====================================================
  // SYNC SELECTED PRODUCTS
  // =====================================================

  useEffect(() => {

    const selectedIds =
      cartItems.map(
        (item) => item.id
      );

    setSelectedProducts(
      selectedIds
    );

  }, [cartItems]);

  // =====================================================
  // HANDLE SELECT PRODUCT
  // =====================================================

  const handleSelectProduct = (
    product
  ) => {

    const isAlreadySelected =
      selectedProducts.includes(
        product.id
      );

    if (isAlreadySelected) {

      removeFromCart(
        product.id
      );

    } else {

      addToCart(product);

    }
  };

  // =====================================================
  // SELECTED PRODUCTS DATA
  // =====================================================

  const selectedProductsData =
    products.filter((product) =>
      selectedProducts.includes(
        product.id
      )
    );

  // =====================================================
  // TOTAL PRICE
  // =====================================================

  const totalPrice =
    selectedProductsData.reduce(
      (total, product) =>

        total +
        Number(
          product.discount_price || 0
        ),

      0
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <h1 className="text-3xl font-bold text-purple-700">

          Loading Products...

        </h1>

      </div>

    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (

    <div className="bg-[#F8FAFC] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">

        {/* ===================================================== */}
        {/* BANNER */}
        {/* ===================================================== */}

        <HomeBanner />

        {/* ===================================================== */}
        {/* HEADING */}
        {/* ===================================================== */}

        <div className="text-center mt-8 mb-8">

          <h1
            className="
            text-3xl
            md:text-5xl
            font-black
            text-gray-900
            tracking-tight
            "
          >

            Our Printed Test Series

          </h1>

          <p
            className="
            text-gray-500
            mt-2
            text-sm
            md:text-base
            "
          >

            Premium Printed NEET Test Series For Students

          </p>

        </div>

        {/* ===================================================== */}
        {/* PRODUCT GRID */}
        {/* ===================================================== */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-5
          "
        >

          {products.map((product) => {

            const isSelected =
              selectedProducts.includes(
                product.id
              );

            return (

              <ProductCard
                key={product.id}
                id={product.id}
                image={`http://localhost:5000/uploads/${product.thumbnail}`}
                title={product.title}
                price={product.discount_price}
                originalPrice={product.original_price}
                description={product.description}
                isSelected={isSelected}
                onSelect={() =>
                  handleSelectProduct(
                    product
                  )
                }
              />

            );
          })}

        </div>

        {/* ===================================================== */}
        {/* EMPTY PRODUCTS */}
        {/* ===================================================== */}

        {products.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-2xl font-bold text-gray-700">

              No Products Found

            </h2>

          </div>

        )}

        {/* ===================================================== */}
        {/* SELECTED PRODUCTS */}
        {/* ===================================================== */}

        {selectedProducts.length > 0 && (

          <div
            className="
            mt-10
            bg-white
            rounded-[28px]
            shadow-lg
            border
            border-gray-100
            p-5
            "
          >

            {/* HEADER */}

            <div
              className="
              flex
              items-center
              justify-between
              mb-5
              "
            >

              <div>

                <h2
                  className="
                  text-2xl
                  font-black
                  text-gray-900
                  "
                >

                  Selected Test Series

                </h2>

                <p className="text-gray-500 text-sm mt-1">

                  Ready for checkout

                </p>

              </div>

              <div
                className="
                bg-purple-100
                text-purple-700
                px-4
                py-2
                rounded-2xl
                font-bold
                text-sm
                "
              >

                {selectedProducts.length} Selected

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="space-y-3">

              {selectedProductsData.map(
                (product, index) => (

                  <div
                    key={product.id}
                    className="
                    bg-[#F8FAFC]
                    rounded-2xl
                    px-4
                    py-3
                    flex
                    items-center
                    justify-between
                    border
                    border-gray-100
                    "
                  >

                    {/* LEFT */}

                    <div className="flex items-center gap-4">

                      {/* NUMBER */}

                      <div
                        className="
                        w-10
                        h-10
                        rounded-xl
                        bg-purple-700
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                        "
                      >

                        {index + 1}

                      </div>

                      {/* IMAGE */}

                      <img
                        src={`http://localhost:5000/uploads/${product.thumbnail}`}
                        alt={product.title}
                        className="
                        w-16
                        h-16
                        rounded-xl
                        object-cover
                        "
                      />

                      {/* DETAILS */}

                      <div>

                        <h3
                          className="
                          text-lg
                          font-bold
                          text-gray-900
                          "
                        >

                          {product.title}

                        </h3>

                        <p
                          className="
                          text-purple-700
                          font-black
                          text-lg
                          mt-1
                          "
                        >

                          ₹ {product.discount_price}

                        </p>

                      </div>

                    </div>

                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        handleSelectProduct(
                          product
                        )
                      }
                      className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      text-sm
                      font-semibold
                      transition-all
                      duration-300
                      "
                    >

                      Remove

                    </button>

                  </div>

                )
              )}

            </div>

            {/* TOTAL */}

            <div
              className="
              mt-6
              pt-5
              border-t
              border-gray-200
              flex
              items-center
              justify-between
              "
            >

              <div>

                <h3
                  className="
                  text-xl
                  font-black
                  text-gray-900
                  "
                >

                  Total Amount

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  Inclusive of all discounts

                </p>

              </div>

              <h2
                className="
                text-3xl
                font-black
                text-purple-700
                "
              >

                ₹ {totalPrice}

              </h2>

            </div>

            {/* CHECKOUT */}

            <button
              onClick={() =>
                navigate("/checkout")
              }
              className="
              mt-6
              bg-purple-700
              hover:bg-purple-800
              text-white
              px-8
              py-3.5
              rounded-2xl
              font-bold
              text-base
              transition-all
              duration-300
              shadow-lg
              "
            >

              Proceed To Checkout

            </button>

          </div>

        )}

      </div>

    </div>

  );
}

export default Home;