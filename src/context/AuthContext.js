import { createContext, useState, useEffect } from "react";
import userApi from "../api/userApi";
import { loginApi } from "../api/loginApi"; // Import loginApi for logout

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getUser();
        setUser(response.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Add logout function
  const logout = () => {
    loginApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
