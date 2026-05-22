import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

// Icons
import {
  MapPin,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

// Order Service
import {
  createOrder,
} from "../services/orderService";



// Navbar
import Navbar from "../components/Navbar";

// Footer
import Footer from "../components/Footer";

// Cart Context
import {
  useCart,
} from "../context/CartContext";

function Checkout() {

  // Navigate
  const navigate = useNavigate();

  // ================= CART =================

  const {
    cartItems,
    totalPrice,
  } = useCart();

  // ================= ADDRESS STATE =================

  const [shippingData, setShippingData] =
    useState({
      fullName: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  // ================= LOADING =================

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    setShippingData({
      ...shippingData,
      [e.target.name]:
        e.target.value,
    });

  };

  // ================= HANDLE PAYMENT =================

  const handlePayment = async () => {

    // Empty Cart
    if (cartItems.length === 0) {

      return toast.error(
        "Your Cart Is Empty"
      );
    }

    // Validation
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

      // Order Data
      const orderData = {
        products: cartItems,
        shippingAddress:
          shippingData,
        totalAmount:
          totalPrice,
      };

      // Create Order API
      const data =
        await createOrder(
          orderData
        );

      console.log(data);

      // Success Toast
      toast.success(
        "Order Created Successfully"
      );

      // Future PayU Redirect
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

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">

        {/* ================= HEADING ================= */}

        <div className="text-center mb-10">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center shadow-xl">

            <ShoppingBag
              size={36}
              className="text-white"
            />

          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-5">

            Checkout

          </h1>

          <p className="text-gray-500 mt-3">

            Complete Your Premium Order

          </p>

        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

          {/* ================= LEFT SIDE ================= */}

          <div>

            <div className="flex items-center gap-3 mb-6">

              <ShoppingBag
                size={28}
                className="text-purple-700"
              />

              <h2 className="text-2xl md:text-3xl font-black text-gray-900">

                Selected Test Series

              </h2>

            </div>

            {/* Empty Cart */}

            {cartItems.length === 0 ? (

              <div className="bg-white rounded-[28px] shadow-xl border border-gray-100 p-10 text-center">

                <h2 className="text-2xl font-bold text-gray-700">

                  Your Cart Is Empty

                </h2>

              </div>

            ) : (

              <div className="space-y-5">

                {cartItems.map((product, index) => (

                  <div
                    key={product.id}
                    className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                  >

                    {/* LEFT SIDE */}

                    <div className="flex items-center gap-4 w-full">

                      {/* NUMBER */}

                      <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white min-w-[42px] h-[42px] rounded-2xl flex items-center justify-center font-bold shadow-lg">

                        {index + 1}

                      </div>

                      {/* IMAGE */}

                      <img
                       src={product.thumbnail}
                        alt={product.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl shadow-md"
                      />

                      {/* DETAILS */}

                      <div className="flex-1">

                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">

                          {product.title}

                        </h3>

                        <div className="flex flex-wrap items-center gap-3 mt-3">

                          <p className="text-purple-700 text-2xl font-black">

                            ₹ {product.discount_price}

                          </p>

                          <p className="text-gray-400 line-through text-lg">

                            ₹ {product.original_price}

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-6">

            {/* ADDRESS FORM */}

            <div className="bg-white rounded-[30px] shadow-xl border border-gray-100 p-5 sm:p-7">

              <div className="flex items-center gap-3 mb-6">

                <MapPin
                  size={28}
                  className="text-purple-700"
                />

                <h2 className="text-2xl md:text-3xl font-black text-gray-900">

                  Shipping Address

                </h2>

              </div>

              <div className="space-y-5">

                <input
                  type="text"
                  name="fullName"
                  value={shippingData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-purple-700 focus:bg-white transition"
                />

                <input
                  type="text"
                  name="mobile"
                  value={shippingData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-purple-700 focus:bg-white transition"
                />

                <input
                  type="email"
                  name="email"
                  value={shippingData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-purple-700 focus:bg-white transition"
                />

                <textarea
                  rows="4"
                  name="address"
                  value={shippingData.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:border-purple-700 focus:bg-white transition resize-none"
                ></textarea>

                {/* CITY + STATE */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <input
                    type="text"
                    name="city"
                    value={shippingData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-purple-700 focus:bg-white transition"
                  />

                  <input
                    type="text"
                    name="state"
                    value={shippingData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-purple-700 focus:bg-white transition"
                  />

                </div>

                <input
                  type="text"
                  name="pincode"
                  value={shippingData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-purple-700 focus:bg-white transition"
                />

              </div>

            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div className="bg-white rounded-[30px] shadow-xl border border-gray-100 p-5 sm:p-7 xl:sticky xl:top-28">

              <div className="flex items-center gap-3 mb-6">

                <CreditCard
                  size={28}
                  className="text-purple-700"
                />

                <h2 className="text-2xl md:text-3xl font-black text-gray-900">

                  Order Summary

                </h2>

              </div>

              <div className="space-y-5">

                <div className="flex items-center justify-between">

                  <p className="text-gray-600 text-lg">

                    Total Test Series

                  </p>

                  <p className="font-bold text-lg text-gray-900">

                    {cartItems.length}

                  </p>

                </div>

                <div className="flex items-center justify-between">

                  <p className="text-gray-600 text-lg">

                    Shipping

                  </p>

                  <p className="font-bold text-lg text-green-600">

                    FREE

                  </p>

                </div>

              </div>

              {/* TOTAL */}

              <div className="mt-7 pt-6 border-t border-gray-100 flex items-center justify-between">

                <h2 className="text-2xl font-black text-gray-900">

                  Total

                </h2>

                <p className="text-3xl md:text-4xl font-black text-purple-700">

                  ₹ {totalPrice}

                </p>

              </div>

              {/* PAYMENT BUTTON */}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-8 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 text-white text-lg font-bold disabled:opacity-70"
              >

                {loading
                  ? "Processing..."
                  : "Proceed To Payment"}

              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );
}

export default Checkout;