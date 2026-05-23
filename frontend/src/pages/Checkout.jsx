import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

// ======================================================
// ICONS
// ======================================================

import {
  MapPin,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

// ======================================================
// ORDER SERVICE
// ======================================================

import {
  createOrder,
} from "../services/orderService";

// ======================================================
// COMPONENTS
// ======================================================

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

// ======================================================
// CART CONTEXT
// ======================================================

import {
  useCart,
} from "../context/CartContext";

function Checkout() {

  // ======================================================
  // NAVIGATE
  // ======================================================

  const navigate =
    useNavigate();

  // ======================================================
  // CART CONTEXT
  // ======================================================

  const {

    finalCartItems:
      contextCartItems,

    totalPrice:
      contextTotalPrice,

  } = useCart();

  // ======================================================
  // STATES
  // ======================================================

  const [
    finalCartItems,
    setFinalCartItems,
  ] = useState([]);

  const [
    finalTotalPrice,
    setFinalTotalPrice,
  ] = useState(0);

  // ======================================================
  // LOAD PRODUCTS
  // ======================================================

  useEffect(() => {

    const savedProducts =
      JSON.parse(
        localStorage.getItem(
          "checkoutProduct"
        )
      ) || [];

    // ======================================================
    // BUY NOW FLOW
    // ======================================================

    if (
      savedProducts.length > 0
    ) {

      setFinalCartItems(
        savedProducts
      );

      const total =
        savedProducts.reduce(

          (
            total,
            item
          ) =>

            total +
            Number(
              item.discount_price || 0
            ),

          0
        );

      setFinalTotalPrice(
        total
      );

    }

    // ======================================================
    // CART FLOW
    // ======================================================

    else {

      setFinalCartItems(
        contextCartItems
      );

      setFinalTotalPrice(
        contextTotalPrice
      );

    }

  }, [
    contextCartItems,
    contextTotalPrice,
  ]);

  // ======================================================
  // SHIPPING STATE
  // ======================================================

  const [
    shippingData,
    setShippingData,
  ] = useState({

    fullName: "",

    mobile: "",

    email: "",

    address: "",

    city: "",

    state: "",

    pincode: "",

  });

  // ======================================================
  // LOADING
  // ======================================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  // ======================================================
  // HANDLE CHANGE
  // ======================================================

  const handleChange =
    (e) => {

      setShippingData({

        ...shippingData,

        [e.target.name]:
          e.target.value,

      });

    };

  // ======================================================
  // HANDLE PAYMENT
  // ======================================================

  const handlePayment =
    async () => {

      // ======================================================
      // EMPTY CART
      // ======================================================

      if (
        finalCartItems.length === 0
      ) {

        return toast.error(
          "Your Cart Is Empty"
        );

      }

      // ======================================================
      // VALIDATION
      // ======================================================

      if (

        !shippingData.fullName.trim() ||

        !shippingData.mobile.trim() ||

        !shippingData.email.trim() ||

        !shippingData.address.trim() ||

        !shippingData.city.trim() ||

        !shippingData.state.trim() ||

        !shippingData.pincode.trim()

      ) {

        return toast.error(
          "Please Fill All Address Details"
        );

      }

      try {

        setLoading(true);

        // ======================================================
        // ORDER DATA
        // ======================================================

        const orderData = {

          products:
            finalCartItems,

          shippingAddress:
            shippingData,

          totalAmount:
            finalTotalPrice,

        };

        // ======================================================
        // CREATE ORDER
        // ======================================================

        const data =
          await createOrder(
            orderData
          );

        console.log(data);

        toast.success(
          "Order Created Successfully"
        );

        // ======================================================
        // CLEAR BUY NOW STORAGE
        // ======================================================

        localStorage.removeItem(
          "checkoutProduct"
        );

        // ======================================================
        // SUCCESS PAGE
        // ======================================================

        navigate(
          "/order-success"
        );

      } catch (error) {

        console.log(error);

        toast.error(

          error?.message ||

          "Order Failed"

        );

      } finally {

        setLoading(false);

      }

    };

  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-purple-50 to-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* ====================================================== */}
        {/* HEADING */}
        {/* ====================================================== */}

        <div className="text-center mb-12">

          <div
            className="
            w-24
            h-24
            mx-auto
            rounded-full
            bg-gradient-to-r
            from-purple-700
            to-violet-500
            flex
            items-center
            justify-center
            shadow-[0_12px_40px_rgba(124,58,237,0.30)]
            "
          >

            <ShoppingBag
              size={40}
              className="text-white"
            />

          </div>

          <h1
            className="
            text-4xl
            sm:text-5xl
            font-black
            text-gray-900
            mt-6
            "
          >

            Secure Checkout

          </h1>

          <p
            className="
            text-gray-500
            mt-3
            text-lg
            "
          >

            Complete Your Premium NEET Order

          </p>

        </div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

    <div className="space-y-10">

  {/* TITLE */}

         

         {/* ====================================================== */}
{/* PRODUCTS SECTION */}
{/* ====================================================== */}

<div className="space-y-6">

            {/* TITLE */}

            <div className="flex items-center gap-3 mb-7">

              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-purple-100
                flex
                items-center
                justify-center
                "
              >

                <ShoppingBag
                  size={24}
                  className="text-purple-700"
                />

              </div>

              <div>

                <h2
                  className="
                  text-3xl
                  font-black
                  text-gray-900
                  "
                >

                  Selected Test Series

                </h2>

                <p className="text-gray-500 text-sm mt-1">

                  Review your selected products

                </p>

              </div>

            </div>

            {/* EMPTY */}

            {finalCartItems.length === 0 ? (

              <div
                className="
                bg-white
                rounded-[32px]
                shadow-xl
                border
                border-gray-100
                p-12
                text-center
                "
              >

                <h2
                  className="
                  text-2xl
                  font-bold
                  text-gray-700
                  "
                >

                  Your Cart Is Empty

                </h2>

              </div>

            ) : (

              <div className="space-y-5">

                {finalCartItems.map(

                  (
                    product,
                    index
                  ) => (

                    <div
                      key={product.id}
                      className="
                    bg-white
                      rounded-[28px]
                      border
                    border-purple-100
                      shadow-[0_6px_24px_rgba(124,58,237,0.08)]
                      px-5
                      py-4
                      flex
                      items-center
                      gap-4
                      hover:shadow-[0_10px_30px_rgba(124,58,237,0.12)]
                      transition-all
                      duration-300
                      max-w-5xl"
                    >

                      {/* NUMBER */}

                      <div
                        className="
                        min-w-[52px]
                        h-[52px]
                        rounded-2xl
                        bg-gradient-to-br
                        from-purple-700
                        to-violet-500
                        text-white
                        flex
                        items-center
                        justify-center
                        font-black
                        text-lg
                        shadow-lg
                        "
                      >

                        {index + 1}

                      </div>

                      {/* IMAGE */}

                      <div
                        className="
                        w-24
                        h-24
                        rounded-3xl
                        overflow-hidden
                        border
                        border-gray-100
                        shadow-md
                        shrink-0
                        "
                      >

                        <img

                          src={
                            product.thumbnail?.startsWith(
                              "http"
                            )

                              ? product.thumbnail

                              : "https://via.placeholder.com/300x300?text=No+Image"
                          }

                          alt={
                            product.title
                          }

                          className="
                          w-full
                          h-full
                          object-cover
                          "
                        />

                      </div>

                      {/* DETAILS */}

                      <div className="flex-1">

                        <h3
                          className="
                          text-xl
                          font-black
                          text-gray-900
                          leading-snug
                          "
                        >

                          {product.title}

                        </h3>

                        <p
                          className="
                          text-sm
                          text-gray-500
                          mt-2
                          "
                        >

                          Premium Printed Test Series

                        </p>

                        <div
                          className="
                          flex
                          items-center
                          gap-3
                          mt-4
                          flex-wrap
                          "
                        >

                          <h2
                            className="
                            text-3xl
                            font-black
                            text-purple-700
                            "
                          >

                            ₹ {product.discount_price}

                          </h2>

                          <p
                            className="
                            text-lg
                            text-gray-400
                            line-through
                            font-semibold
                            "
                          >

                            ₹ {product.original_price}

                          </p>

                          <span
                            className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-bold
                            "
                          >

                            Free Delivery

                          </span>

                        </div>

                      </div>

                    </div>

                  )

                )}

              </div>

            )}

          </div>



          

          {/* ====================================================== */}
{/* ADDRESS + SUMMARY GRID */}
{/* ====================================================== */}

<div
  className="
  grid
  grid-cols-1
  xl:grid-cols-[1fr_420px]
  gap-8
  items-start
  "
>

  {/* ====================================================== */}
  {/* ADDRESS SECTION */}
  {/* ====================================================== */}

  <div className="space-y-6">

    {/* ADDRESS */}

    <div
      className="
      bg-white/90
      backdrop-blur-xl
      rounded-[34px]
      border
      border-purple-100
      shadow-[0_8px_40px_rgba(124,58,237,0.12)]
      p-6
      md:p-8
      "
    >

      <div className="flex items-center gap-3 mb-7">

        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-purple-100
          flex
          items-center
          justify-center
          "
        >

          <MapPin
            size={24}
            className="text-purple-700"
          />

        </div>

        <div>

          <h2
            className="
            text-3xl
            font-black
            text-gray-900
            "
          >

            Delivery Address

          </h2>

          <p className="text-gray-500 text-sm mt-1">

            Enter your shipping details

          </p>

        </div>

      </div>

      <div className="space-y-5">

        <input
          type="text"
          name="fullName"
          value={shippingData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="
          w-full
          h-14
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          outline-none
          focus:border-purple-500
          "
        />

        <input
          type="text"
          name="mobile"
          value={shippingData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="
          w-full
          h-14
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          outline-none
          focus:border-purple-500
          "
        />

        <input
          type="email"
          name="email"
          value={shippingData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="
          w-full
          h-14
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          outline-none
          focus:border-purple-500
          "
        />

        <textarea
          rows="4"
          name="address"
          value={shippingData.address}
          onChange={handleChange}
          placeholder="Full Address"
          className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          py-4
          outline-none
          resize-none
          focus:border-purple-500
          "
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <input
            type="text"
            name="city"
            value={shippingData.city}
            onChange={handleChange}
            placeholder="District / City"
            className="
            w-full
            h-14
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            px-5
            outline-none
            focus:border-purple-500
            "
          />

          <input
            type="text"
            name="state"
            value={shippingData.state}
            onChange={handleChange}
            placeholder="State"
            className="
            w-full
            h-14
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            px-5
            outline-none
            focus:border-purple-500
            "
          />

        </div>

        <input
          type="text"
          name="pincode"
          value={shippingData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="
          w-full
          h-14
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          outline-none
          focus:border-purple-500
          "
        />

      </div>

    </div>

  </div>

  {/* ====================================================== */}
  {/* SUMMARY SECTION */}
  {/* ====================================================== */}

  <div
    className="
    xl:sticky
    xl:top-28
    "
  >

    {/* ORDER SUMMARY */}

    <div
      className="
      bg-white
      rounded-[34px]
      border
      border-purple-100
      shadow-[0_8px_40px_rgba(124,58,237,0.12)]
      p-6
      md:p-8
      "
    >

      <div className="flex items-center gap-3 mb-7">

        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-purple-100
          flex
          items-center
          justify-center
          "
        >

          <CreditCard
            size={24}
            className="text-purple-700"
          />

        </div>

        <div>

          <h2
            className="
            text-3xl
            font-black
            text-gray-900
            "
          >

            Order Summary

          </h2>

          <p className="text-gray-500 text-sm mt-1">

            Secure checkout experience

          </p>

        </div>

      </div>

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <p className="text-gray-600">

            Total Test Series

          </p>

          <p className="font-bold text-gray-900">

            {finalCartItems.length}

          </p>

        </div>

        <div className="flex items-center justify-between">

          <p className="text-gray-600">

            Subtotal

          </p>

          <p className="font-bold text-gray-900">

            ₹ {finalTotalPrice}

          </p>

        </div>

        <div className="flex items-center justify-between">

          <p className="text-gray-600">

            Delivery Charges

          </p>

          <p className="font-bold text-green-600">

            FREE

          </p>

        </div>

        <div className="flex items-center justify-between">

          <p className="text-gray-600">

            Platform Fee

          </p>

          <p className="font-bold text-gray-900">

            ₹ 0

          </p>

        </div>

      </div>

      <div
        className="
        mt-7
        pt-6
        border-t
        border-gray-100
        flex
        items-center
        justify-between
        "
      >

        <h2
          className="
          text-2xl
          font-black
          text-gray-900
          "
        >

          Final Total

        </h2>

        <h2
          className="
          text-4xl
          font-black
          text-purple-700
          "
        >

          ₹ {finalTotalPrice}

        </h2>

      </div>

      <div
        className="
        mt-6
        bg-purple-50
        rounded-2xl
        p-4
        border
        border-purple-100
        "
      >

        <p
          className="
          text-sm
          text-purple-800
          font-semibold
          "
        >

          🔒 100% Secure Payment & Fast Delivery

        </p>

      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="
        w-full
        mt-7
        h-16
        rounded-2xl
        bg-gradient-to-r
        from-purple-700
        via-purple-600
        to-violet-500
        text-white
        text-lg
        font-black
        shadow-xl
        hover:scale-[1.02]
        active:scale-[0.98]
        transition-all
        duration-300
        "
      >

        {loading

          ? "Processing..."

          : "Proceed To Payment →"}

      </button>

    </div>

  </div>

</div>

        </div>

      </div>

      <Footer />

    </div>

  );
}

export default Checkout;