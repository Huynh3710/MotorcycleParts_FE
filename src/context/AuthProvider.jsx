// Trong component AuthProvider
import axios from "axios";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [cartItemsIdCheckouts, setCartItemsIdCheckouts] = useState([]);
  // console.log(cartItemsIdCheckouts);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/get-api/logout",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (error) {}
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("cartId");
    localStorage.removeItem("customerId");


    // const response = axios.
  };

  const setLogin = (data) => {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("role", data.role);
    localStorage.setItem("cartId", data.cartId);
    localStorage.setItem("customerId", data.customerId);
  };

  return (
    <AuthContext.Provider
      value={{
        setLogin,
        isAdmin,
        setIsAdmin,
        handleLogout,
        cartItemsIdCheckouts,
        setCartItemsIdCheckouts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
