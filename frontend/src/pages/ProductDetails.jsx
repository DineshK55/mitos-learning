import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

// =====================================================
// COMPONENTS
// =====================================================

import Navbar from "../components/Navbar";

// =====================================================
// SERVICES
// =====================================================

import {
  getSingleProduct,
} from "../services/productService";

// =====================================================
// ICONS
// =====================================================

import {
  FaCheckCircle,
  FaShippingFast,
  FaBookOpen,
  FaClipboardList,
} from "react-icons/fa";

function ProductDetails() {

  // =====================================================
  // ROUTER
  // =====================================================

  const { id } = useParams();

  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const response =
            await getSingleProduct(id);

          setProduct(
            response.product
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchProduct();

  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-purple-700
          "
        >

          Loading Product...

        </h1>

      </div>

    );
  }

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-red-600
          "
        >

          Product Not Found

        </h1>

      </div>

    );
  }

  // =====================================================
  // PRICE
  // =====================================================

  const originalPrice =
    Number(
      product.original_price || 0
    );

  const discountPrice =
    Number(
      product.discount_price || 0
    );

  const discountPercentage =
    originalPrice > 0
      ? Math.round(
          (
            (
              originalPrice -
              discountPrice
            ) /
            originalPrice
          ) * 100
        )
      : 0;

  // =====================================================
  // IMAGE URL
  // =====================================================

  const imageUrl =
    product.thumbnail &&
    product.thumbnail.startsWith("http")
      ? product.thumbnail
      : "https://via.placeholder.com/600x600?text=No+Image";

  // =====================================================
  // BUY NOW
  // =====================================================

const handleBuyNow = () => {

  // ============================================
  // CLEAR OLD CHECKOUT PRODUCTS
  // ============================================

  localStorage.removeItem(
    "checkoutProduct"
  );

  // ============================================
  // SINGLE PRODUCT CHECKOUT
  // ============================================

  const checkoutProduct = {

    id: product.id,

    title: product.title,

    thumbnail:
      product.thumbnail,

    discount_price:
      product.discount_price,

    original_price:
      product.original_price,

  };

  // ============================================
  // SAVE NEW PRODUCT
  // ============================================

  localStorage.setItem(

    "checkoutProduct",

    JSON.stringify([
      checkoutProduct,
    ])

  );

  // ============================================
  // NAVIGATE
  // ============================================

  navigate("/checkout");

};

  // =====================================================
  // JSX
  // =====================================================

  return (

    <div
      className="
      bg-gray-100
      min-h-screen
      "
    >

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <Navbar />

      {/* ================================================= */}
      {/* MAIN CONTAINER */}
      {/* ================================================= */}

      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-10
        "
      >

        {/* ================================================= */}
        {/* TOP SECTION */}
        {/* ================================================= */}

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          items-start
          "
        >

          {/* ================================================= */}
          {/* LEFT IMAGE */}
          {/* ================================================= */}

          <div>

            <div
              className="
              bg-white
              rounded-[35px]
              shadow-2xl
              overflow-hidden
              "
            >

              <img
                src={imageUrl}
                alt={product.title}
                className="
                w-full
                h-[320px]
                sm:h-[600px]
                object-cover
                "
              />

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT DETAILS */}
          {/* ================================================= */}

          <div>

            {/* CATEGORY */}

            <div
              className="
              inline-block
              bg-purple-100
              text-purple-700
              font-bold
              px-5
              py-2
              rounded-full
              text-sm
              "
            >

              Premium NEET Test Series

            </div>

            {/* TITLE */}

            <h1
              className="
              text-4xl
              md:text-6xl
              font-black
              text-gray-900
              leading-tight
              mt-5
              "
            >

              {product.title}

            </h1>

            {/* DESCRIPTION */}

            <p
              className="
              text-gray-600
              text-xl
              leading-relaxed
              mt-6
              "
            >

              {product.description}

            </p>

            {/* PRICE */}

            <div
              className="
              flex
              items-center
              gap-4
              mt-8
              flex-wrap
              "
            >

              <h2
                className="
                text-6xl
                font-black
                text-purple-700
                "
              >

                ₹ {discountPrice}

              </h2>

              <p
                className="
                text-3xl
                text-gray-400
                line-through
                font-semibold
                "
              >

                ₹ {originalPrice}

              </p>

              <span
                className="
                bg-green-100
                text-green-700
                px-5
                py-2
                rounded-full
                text-sm
                font-bold
                "
              >

                {discountPercentage}% OFF

              </span>

            </div>

            {/* ================================================= */}
            {/* FEATURES */}
            {/* ================================================= */}

            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-5
              mt-10
              "
            >

              {/* FEATURE 1 */}

              <div
                className="
                bg-white
                p-6
                rounded-3xl
                shadow-md
                "
              >

                <FaClipboardList
                  className="
                  text-purple-700
                  text-2xl
                  mb-3
                  "
                />

                <h3
                  className="
                  font-bold
                  text-2xl
                  "
                >

                  Chapter-wise Tests

                </h3>

                <p
                  className="
                  text-gray-600
                  mt-2
                  "
                >

                  Complete syllabus structured
                  NEET practice.

                </p>

              </div>

              {/* FEATURE 2 */}

              <div
                className="
                bg-white
                p-6
                rounded-3xl
                shadow-md
                "
              >

                <FaBookOpen
                  className="
                  text-purple-700
                  text-2xl
                  mb-3
                  "
                />

                <h3
                  className="
                  font-bold
                  text-2xl
                  "
                >

                  Detailed Solutions

                </h3>

                <p
                  className="
                  text-gray-600
                  mt-2
                  "
                >

                  NCERT-based explained
                  answers for every test.

                </p>

              </div>

              {/* FEATURE 3 */}

              <div
                className="
                bg-white
                p-6
                rounded-3xl
                shadow-md
                "
              >

                <FaCheckCircle
                  className="
                  text-purple-700
                  text-2xl
                  mb-3
                  "
                />

                <h3
                  className="
                  font-bold
                  text-2xl
                  "
                >

                  Printed Material

                </h3>

                <p
                  className="
                  text-gray-600
                  mt-2
                  "
                >

                  Premium printed quality
                  delivered to your home.

                </p>

              </div>

              {/* FEATURE 4 */}

              <div
                className="
                bg-white
                p-6
                rounded-3xl
                shadow-md
                "
              >

                <FaShippingFast
                  className="
                  text-purple-700
                  text-2xl
                  mb-3
                  "
                />

                <h3
                  className="
                  font-bold
                  text-2xl
                  "
                >

                  Fast Delivery

                </h3>

                <p
                  className="
                  text-gray-600
                  mt-2
                  "
                >

                  Quick shipping available
                  across India.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* FULL WIDTH PREMIUM CTA */}
        {/* ================================================= */}

        <div
          className="
          mt-14
          bg-gradient-to-r
          from-purple-700
          via-purple-800
          to-purple-900
          rounded-[35px]
          p-8
          md:p-10
          shadow-2xl
          overflow-hidden
          relative
          "
        >

          {/* GLOW */}

          <div
            className="
            absolute
            -top-10
            -right-10
            w-52
            h-52
            bg-white/10
            rounded-full
            blur-3xl
            "
          ></div>

          <div
            className="
            relative
            z-10
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
            "
          >

            {/* LEFT */}

            <div>

              <p
                className="
                text-purple-200
                font-semibold
                uppercase
                tracking-wider
                text-sm
                "
              >

                Premium NEET Preparation

              </p>

              <h2
                className="
                text-3xl
                md:text-5xl
                font-black
                text-white
                mt-3
                leading-tight
                "
              >

                Crack NEET With
                Structured Practice

              </h2>

              <p
                className="
                text-purple-100
                text-lg
                mt-5
                max-w-2xl
                leading-relaxed
                "
              >

                Chapter-wise printed tests,
                PYQs, detailed NCERT solutions,
                mock exams, and premium study
                materials designed for serious
                NEET aspirants.

              </p>

            </div>

            {/* RIGHT */}

            <div
              className="
              flex
              flex-col
              items-start
              lg:items-end
              gap-5
              "
            >

              <div>

                <p
                  className="
                  text-purple-200
                  text-sm
                  font-medium
                  "
                >

                  Final Price

                </p>

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  mt-2
                  "
                >

                  <h2
                    className="
                    text-5xl
                    font-black
                    text-white
                    "
                  >

                    ₹ {discountPrice}

                  </h2>

                  <span
                    className="
                    bg-green-400
                    text-green-900
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                    "
                  >

                    {discountPercentage}% OFF

                  </span>

                </div>

              </div>

              <button
                onClick={handleBuyNow}
                className="
                bg-white
                text-purple-700
                px-10
                py-5
                rounded-2xl
                font-black
                text-lg
                hover:scale-105
                transition-all
                duration-300
                shadow-2xl
                "
              >

                Proceed To Checkout →

              </button>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* EXTRA DETAILS */}
        {/* ================================================= */}

        <div
          className="
          mt-20
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          "
        >

          {/* CARD 1 */}

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow-lg
            "
          >

            <h3
              className="
              text-3xl
              font-black
              mb-6
              "
            >

              What You Will Get

            </h3>

            <ul
              className="
              space-y-5
              text-gray-700
              text-lg
              "
            >

              <li>
                ✔ Full syllabus test series
              </li>

              <li>
                ✔ Previous year NEET questions
              </li>

              <li>
                ✔ Detailed NCERT solutions
              </li>

              <li>
                ✔ Printed study material
              </li>

              <li>
                ✔ Fast delivery across India
              </li>

            </ul>

          </div>

          {/* CARD 2 */}

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow-lg
            "
          >

            <h3
              className="
              text-3xl
              font-black
              mb-6
              "
            >

              Why Students Choose Us

            </h3>

            <p
              className="
              text-gray-600
              leading-relaxed
              text-lg
              "
            >

              Thousands of NEET aspirants
              trust Mitos Learning for
              high-quality printed test
              series designed strictly based
              on latest NEET trends.

            </p>

          </div>

          {/* CARD 3 */}

          <div
            className="
            bg-gradient-to-br
            from-black
            to-gray-900
            rounded-3xl
            p-8
            shadow-lg
            text-white
            "
          >

            <h3
              className="
              text-3xl
              font-black
              mb-6
              "
            >

              Need Help?

            </h3>

            <p
              className="
              text-gray-300
              leading-relaxed
              text-lg
              "
            >

              Contact our support team for
              order help and guidance.

            </p>

            <button
              className="
              mt-8
              bg-purple-700
              hover:bg-purple-800
              px-6
              py-4
              rounded-2xl
              font-bold
              transition-all
              duration-300
              "
            >

              Contact Support

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProductDetails;