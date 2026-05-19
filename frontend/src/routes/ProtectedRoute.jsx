import { useContext } from "react";

// React Router
import { Navigate } from "react-router-dom";

// Auth Context
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // Auth Context
  const {
    loading,
    isAuthenticated,
  } = useContext(AuthContext);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-purple-700">
          Loading...
        </h1>
      </div>
    );
  }

  // Not Logged In
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Logged In
  return children;
};

export default ProtectedRoute;