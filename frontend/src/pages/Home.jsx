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
  finalCartItems,
  addToCart,
  removeFromCart,
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
      finalCartItems.map(
        (item) => item.id
      );

    setSelectedProducts(
      selectedIds
    );

  }, [finalCartItems]);

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
{/* STICKY CHECKOUT BAR */}
{/* ===================================================== */}

{/* ===================================================== */}
{/* ULTRA PREMIUM FLOATING CHECKOUT BAR */}
{/* ===================================================== */}

{selectedProducts.length > 0 && (

  <div
    className="
    fixed
    bottom-5
    left-1/2
    -translate-x-1/2
    z-50
    w-[92%]
    max-w-2xl
    "
  >

    <div
      className="
      bg-white/75
      backdrop-blur-2xl
      border
      border-white/40
      shadow-[0_8px_40px_rgba(124,58,237,0.18)]
      rounded-full
      px-4
      py-3
      flex
      items-center
      justify-between
      "
    >

      {/* LEFT SIDE */}

      <div className="flex items-center gap-3">

        {/* ICON */}

        <div
          className="
          w-11
          h-11
          rounded-full
          bg-gradient-to-br
          from-purple-700
          to-purple-500
          flex
          items-center
          justify-center
          shadow-lg
          shrink-0
          "
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.293 1.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />

          </svg>

        </div>

        {/* TEXT */}

        <div>

          <p
            className="
            text-xs
            md:text-sm
            text-gray-500
            font-medium
            "
          >

            {selectedProducts.length}
            {" "}
            Selected

          </p>

          <h2
            className="
            text-lg
            md:text-xl
            font-black
            text-gray-900
            leading-none
            mt-1
            "
          >

            ₹ {totalPrice}

          </h2>

        </div>

      </div>

      {/* BUTTON */}

      <button
  onClick={() => {

    // ============================================
    // REMOVE OLD BUY NOW PRODUCT
    // ============================================

    localStorage.removeItem(
      "checkoutProduct"
    );

    // ============================================
    // NAVIGATE TO CHECKOUT
    // ============================================

    navigate("/checkout");

  }}
  className="
  bg-gradient-to-r
  from-purple-700
  to-purple-600
  hover:scale-105
  active:scale-95
  text-white
  px-5
  md:px-6
  py-3
  rounded-full
  font-bold
  text-sm
  transition-all
  duration-300
  shadow-lg
  whitespace-nowrap
  "
>

        Checkout →

      </button>

    </div>

  </div>

)}

      </div>

        <Footer />

    </div>

    

  );
}

export default Home;