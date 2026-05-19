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
  const [loading, setLoading] = useState(true);

  // Is Authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load User From LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    setLoading(false);
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

    // Clear LocalStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
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