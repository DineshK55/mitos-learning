import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

// Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// React Router
import { BrowserRouter } from "react-router-dom";

// Cart Context
import { CartProvider } from "./context/CartContext";

// Auth Context
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);