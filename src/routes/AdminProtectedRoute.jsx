import {
  useContext,
} from "react";

// =====================================================
// REACT ROUTER
// =====================================================

import {
  Navigate,
} from "react-router-dom";

// =====================================================
// AUTH CONTEXT
// =====================================================

import {
  AuthContext,
} from "../context/AuthContext";

// =====================================================
// ADMIN LAYOUT
// =====================================================

import AdminLayout from "../layouts/AdminLayout";

const AdminProtectedRoute = ({
  children,
}) => {

  // =====================================================
  // AUTH CONTEXT
  // =====================================================

  const {
    loading,
    user,
    token,
  } = useContext(
    AuthContext
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        <h1 className="text-2xl font-semibold text-purple-700">
          Loading...
        </h1>

      </div>
    );
  }

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!token || !user) {

    return (

      <Navigate
        to="/admin/login"
      />
    );
  }

  // =====================================================
  // NOT ADMIN
  // =====================================================

  if (
    user.role !== "admin"
  ) {

    return (
      <Navigate to="/" />
    );
  }

  // =====================================================
  // ADMIN ACCESS
  // =====================================================

  return (

    <AdminLayout>

      {children}

    </AdminLayout>
  );
};

export default
  AdminProtectedRoute;