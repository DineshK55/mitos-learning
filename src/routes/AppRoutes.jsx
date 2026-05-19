import { Routes, Route } from "react-router-dom";

// ================= PROTECTED ROUTES =================

import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

// ================= USER PAGES =================

import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OTPVerification from "../pages/OTPVerification";
import ResetPassword from "../pages/ResetPassword";


// ================= ADMIN PAGES =================

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import SingleUser from "../pages/Admin/SingleUser";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import AddBanner from "../pages/admin/AddBanner";
import AllBanners from "../pages/admin/AllBanners";


function AppRoutes() {

  return (

    <Routes>

      {/* ===================================================== */}
      {/* PUBLIC USER ROUTES */}
      {/* ===================================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/otp-verification"
        element={<OTPVerification />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* ===================================================== */}
      {/* PROTECTED USER ROUTES */}
      {/* ===================================================== */}

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      {/* ===================================================== */}
      {/* ADMIN LOGIN */}
      {/* ===================================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ===================================================== */}
      {/* PROTECTED ADMIN ROUTES */}
      {/* ===================================================== */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <AdminOrders />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <AdminUsers />
          </AdminProtectedRoute>
        }
      />

      <Route
  path="/admin/users/:id"
  element={
    <AdminProtectedRoute>
      <SingleUser />
    </AdminProtectedRoute>
  }
/>

      <Route
        path="/admin/add-product"
        element={
          <AdminProtectedRoute>
            <AddProduct />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <AdminProtectedRoute>
            <EditProduct />
          </AdminProtectedRoute>
        }
      />

     <Route
  path="/admin/add-banner"
  element={
    <AdminProtectedRoute>
      <AddBanner />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/banners"
  element={
    <AdminProtectedRoute>
      <AllBanners />
    </AdminProtectedRoute>
  }
/>

    </Routes>
  );
}

export default AppRoutes;