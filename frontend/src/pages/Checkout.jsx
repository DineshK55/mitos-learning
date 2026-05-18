import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

// Order Service
import {
  createOrder,
} from "../services/orderService";

// Navbar
import Navbar from "../components/Navbar";

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
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ================= HEADING ================= */}

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">

          Checkout

        </h1>

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ================= LEFT SIDE ================= */}

          <div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">

              Selected Test Series

            </h2>

            {/* Empty Cart */}

            {cartItems.length === 0 ? (

              <div className="bg-white rounded-2xl shadow-md p-8 text-center">

                <h2 className="text-2xl font-bold text-gray-700">
                  Your Cart Is Empty
                </h2>

              </div>

            ) : (

              <div className="space-y-4">

             {cartItems.map((product, index) => (

                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4"
                  >

                  {/* LEFT SIDE */}

<div className="flex items-center gap-4">

  {/* NUMBER */}

  <div className="bg-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">

    {index + 1}

  </div>

  {/* IMAGE */}

  <img
    src={`http://localhost:5000/uploads/${product.thumbnail}`}
    alt={product.title}
    className="w-24 h-24 object-cover rounded-xl"
  />

  {/* DETAILS */}

  <div className="text-center sm:text-left">

    <h3 className="text-lg font-bold text-gray-800">

      {product.title}

    </h3>

    <div className="flex items-center gap-3 mt-2">

      <p className="text-purple-700 text-2xl font-bold">

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

          <div>

            {/* Address Form */}

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">

                Shipping Address

              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  name="fullName"
                  value={shippingData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
                />

                <input
                  type="text"
                  name="mobile"
                  value={shippingData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
                />

                <input
                  type="email"
                  name="email"
                  value={shippingData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
                />

                <textarea
                  rows="3"
                  name="address"
                  value={shippingData.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
                ></textarea>

                {/* City + State */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <input
                    type="text"
                    name="city"
                    value={shippingData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
                  />

                  <input
                    type="text"
                    name="state"
                    value={shippingData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
                  />

                </div>

                <input
                  type="text"
                  name="pincode"
                  value={shippingData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-700"
                />

              </div>

            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div className="bg-white rounded-2xl shadow-md p-6 mt-6 lg:sticky lg:top-28">

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">

                Order Summary

              </h2>

              <div className="flex items-center justify-between mb-4">

                <p className="text-gray-600 text-lg">
                  Total Test Series
                </p>

                <p className="font-bold text-lg">
                  {cartItems.length}
                </p>

              </div>

              <div className="flex items-center justify-between mb-4">

                <p className="text-gray-600 text-lg">
                  Shipping
                </p>

                <p className="font-bold text-lg text-green-600">
                  FREE
                </p>

              </div>

              <div className="flex items-center justify-between mt-6">

                <h2 className="text-2xl font-bold text-gray-800">
                  Total
                </h2>

                <p className="text-3xl font-bold text-purple-700">
                  ₹ {totalPrice}
                </p>

              </div>

              {/* Payment Button */}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-6 bg-purple-700 text-white py-3 rounded-xl text-lg font-semibold hover:bg-purple-800 transition duration-300 disabled:opacity-70"
              >

                {loading
                  ? "Processing..."
                  : "Proceed To Payment"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;