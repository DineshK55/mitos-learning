import { createContext, useEffect, useState } from "react";

// Create Context
export const AuthContext = createContext();

// Auth Provider
const AuthProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState(null);

  // Token State
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // Loading State
  const [loading,  setLoading] = useState(true);

  // Is Authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auth Ready State
   const [authReady, setAuthReady] = useState(false);

  // Load User From LocalStorage
 useEffect(() => {

  try {

    const storedUser =
      localStorage.getItem("user");

    const storedToken =
      localStorage.getItem("token");

    if (
      storedUser &&
      storedToken
    ) {

      setUser(
        JSON.parse(storedUser)
      );

      setToken(storedToken);

      setIsAuthenticated(true);

    } else {

      setUser(null);

      setToken(null);

      setIsAuthenticated(false);

    }

  } catch (error) {

    console.log(error);

    localStorage.removeItem("user");

    localStorage.removeItem("token");

  } finally {

    setLoading(false);

    setAuthReady(true);

  }

}, []);

  // Login Function
  const login = (userData, userToken) => {
    // Save States
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);

    // Save LocalStorage
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      userToken
    );
  };

  // Logout Function
 const logout = () => {

  // Clear States
  setUser(null);

  setToken(null);

  setIsAuthenticated(false);

  // Clear Storage
  localStorage.removeItem("user");

  localStorage.removeItem("token");

  localStorage.removeItem(
    "checkoutProduct"
  );

  // Redirect
  window.location.href =
    "/login";
};
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authReady,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;