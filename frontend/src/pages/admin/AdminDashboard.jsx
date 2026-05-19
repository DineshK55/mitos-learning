import AdminLayout from "../../layouts/AdminLayout";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

import {
  Link,
} from "react-router-dom";

function AdminDashboard() {

  // ================= DASHBOARD DATA =================

  const dashboardCards = [
    {
      title: "Total Products",
      value: 12,
      icon: <FaBoxOpen />,
    },

    {
      title: "Total Orders",
      value: 45,
      icon: <FaShoppingCart />,
    },

    {
      title: "Total Users",
      value: 120,
      icon: <FaUsers />,
    },

    {
      title: "Revenue",
      value: "₹ 45,000",
      icon: <FaRupeeSign />,
    },
  ];

  return (
  <AdminLayout>
    </AdminLayout>
  );
}

export default AdminDashboard;