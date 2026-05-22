import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

// Navbar
import Navbar from "../components/Navbar";

// Footer
import Footer from "../components/Footer";

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

            console.log(response.products);

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

        <h1 className="text-2xl md:text-3xl font-bold text-purple-700">

          Loading Products...

        </h1>

      </div>

    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (

    <div className="bg-[#F8FAFC] min-h-screen overflow-x-hidden">

      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 py-5 md:py-7">

        {/* ===================================================== */}
        {/* HEADING */}
        {/* ===================================================== */}

        <div className="text-center mb-8 md:mb-10">

          <h1
            className="
            text-2xl
            sm:text-4xl
            md:text-5xl
            font-black
            text-gray-900
            leading-tight
            "
          >

            Our Printed Test Series

          </h1>

          <p
            className="
            text-gray-500
            mt-3
            text-sm
            sm:text-base
            "
          >

            Premium Printed NEET Test Series For Students

          </p>

        </div>

        {/* ===================================================== */}
        {/* BANNER */}
        {/* ===================================================== */}

        <div className="mb-10 md:mb-14">

          <HomeBanner />

        </div>

        {/* ===================================================== */}
        {/* PRODUCT GRID */}
        {/* ===================================================== */}

        <div
  className="
  grid
  grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
gap-5
md:gap-6
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
  image={product.thumbnail}
  title={product.title}
  price={product.discount_price}
  originalPrice={product.original_price}
  description={product.description}
  isSelected={isSelected}
  onSelect={() =>
    handleSelectProduct(product)
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
            mt-12 md:mt-16
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-gray-100
            p-5
            md:p-7
            "
          >

            {/* HEADER */}

            <div
              className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              mb-6
              "
            >

              <div>

                <h2
                  className="
                  text-2xl
                  md:text-3xl
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
                w-fit
                "
              >

                {selectedProducts.length} Selected

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="space-y-4">

              {selectedProductsData.map(
                (product, index) => (

                  <div
                    key={product.id}
                    className="
                    bg-[#F8FAFC]
                    rounded-2xl
                    p-4
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
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

                     <img src={`http://localhost:5000/uploads/${product.thumbnail}`}
                        alt={product.title}
                        className="
                        w-14
                        h-14
                        md:w-16
                        md:h-16
                        rounded-xl
                        object-cover
                        border
                        "
                      />

                      {/* DETAILS */}

                      <div>

                        <h3
                          className="
                          text-base
                          md:text-lg
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

                    {/* REMOVE 

                    //<button
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
                      w-full
                      md:w-auto
                      "
                    >

                      Remove

                    </button>*/}

                  </div>

                )
              )}

            </div>

            {/* TOTAL */}

            <div
              className="
              mt-8
              pt-6
              border-t
              border-gray-200
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
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
                text-2xl
                md:text-3xl
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
              w-full
              md:w-auto
              mt-6
              bg-purple-700
              hover:bg-purple-800
              text-white
              px-6
              md:px-8
              py-3
              md:py-3.5
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

        <Footer />

    </div>

    

  );
}

export default Home;