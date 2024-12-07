import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth"); // Redirect to login/signup if token is missing
    }
    setLoading(false); // Proceed to render the protected app
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Render nothing (or a spinner) while checking the auth state
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
