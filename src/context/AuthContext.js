import { createContext, useState, useEffect } from "react";
import userApi from "../api/userApi";
import { loginApi } from "../api/loginApi"; // Import loginApi for logout
import Cookies from "js-cookie";
import decodeAccessToken from "../utils/decodeJwt"; // Import decodeAccessToken if needed
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("access_token");
        const decodedToken = decodeAccessToken(token);
        if (decodedToken) {
          setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
            role: decodedToken.role,
          });
          return;
        }
        if (!token) {
          setUser(); // No token, no need to fetch
          return;
        }
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
