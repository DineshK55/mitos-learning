import {
  useEffect,
  useState,
} from "react";

import {
  toast,
} from "react-toastify";

// =====================================================
// ORDER SERVICE
// =====================================================

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";

function AdminOrders() {

  // =====================================================
  // STATES
  // =====================================================

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {

    try {

      const data =
        await getAllOrders();

      setOrders(
        data.orders || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed To Load Orders"
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const handleStatusUpdate =
    async (
      orderId,
      order_status
    ) => {

      try {

        await updateOrderStatus(
          orderId,
          { order_status }
        );

        toast.success(
          "Order Updated"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        toast.error(
          "Update Failed"
        );
      }
    };

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {

    fetchOrders();

  }, []);

  // =====================================================
  // FILTER ORDERS
  // =====================================================

  const filteredOrders =
    orders.filter((order) =>

      order.id
        ?.toString()
        .includes(search) ||

      order.user_id
        ?.toString()
        .includes(search)
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-purple-700">
          Loading Orders...
        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="bg-white shadow-sm px-6 py-5">

        <h1 className="text-3xl font-bold text-gray-800">
          Order Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage Customer Orders
        </p>

        {/* ===================================================== */}
        {/* SEARCH */}
        {/* ===================================================== */}

        <div className="mt-4">

          <input
            type="text"
            placeholder="Search Order ID or User ID..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border border-gray-300 px-5 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 w-full max-w-md"
          />

        </div>

      </div>

      {/* ===================================================== */}
      {/* TABLE */}
      {/* ===================================================== */}

      <div className="p-6">

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1200px]">

              {/* ===================================================== */}
              {/* TABLE HEAD */}
              {/* ===================================================== */}

              <thead className="bg-purple-700 text-white">

                <tr>

                  <th className="px-6 py-5 text-left">
                    Order ID
                  </th>

                  <th className="px-6 py-5 text-left">
                    Customer
                  </th>

                  <th className="px-6 py-5 text-left">
                    Shipping Address
                  </th>

                  <th className="px-6 py-5 text-left">
                    Payment
                  </th>

                  <th className="px-6 py-5 text-left">
                    Total
                  </th>

                  <th className="px-6 py-5 text-left">
                    Status
                  </th>

                  <th className="px-6 py-5 text-left">
                    Update Status
                  </th>

                </tr>

              </thead>

              {/* ===================================================== */}
              {/* TABLE BODY */}
              {/* ===================================================== */}

              <tbody>

                {filteredOrders.length > 0 ? (

                  filteredOrders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b hover:bg-purple-50 transition"
                    >

                      {/* ===================================================== */}
                      {/* ORDER ID */}
                      {/* ===================================================== */}

                      <td className="px-6 py-5 font-bold text-purple-700">

                        #{order.id}

                      </td>

                      {/* ===================================================== */}
                      {/* CUSTOMER */}
                      {/* ===================================================== */}

                      <td className="px-6 py-5 font-semibold text-gray-800">

                        User #{order.user_id}

                      </td>

                      {/* ===================================================== */}
                      {/* ADDRESS */}
                      {/* ===================================================== */}

                      <td className="px-6 py-5 max-w-sm">

                        {order.shipping_address}

                      </td>

                      {/* ===================================================== */}
                      {/* PAYMENT */}
                      {/* ===================================================== */}

                      <td className="px-6 py-5">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                          {order.payment_method}

                        </span>

                      </td>

                      {/* ===================================================== */}
                      {/* TOTAL */}
                      {/* ===================================================== */}

                      <td className="px-6 py-5 font-bold text-green-600">

                        ₹ {order.total_amount}

                      </td>

                      {/* ===================================================== */}
                      {/* STATUS */}
                      {/* ===================================================== */}

                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            order.order_status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.order_status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : order.order_status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >

                          {order.order_status || "Pending"}

                        </span>

                      </td>

                      {/* ===================================================== */}
                      {/* UPDATE STATUS */}
                      {/* ===================================================== */}

                      <td className="px-6 py-5">

                        <select
                          value={
                            order.order_status ||
                            "Pending"
                          }
                          onChange={(e) =>
                            handleStatusUpdate(
                              order.id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-purple-700"
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-16 text-gray-500 text-lg"
                    >

                      No Orders Found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminOrders;