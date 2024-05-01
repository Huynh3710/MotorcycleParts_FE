import { createContext, useState } from "react";

const AuthuContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    console.log(isLogin);
    const configLogin = () => {
      setIsLogin(true);
    }
    return (
      <AuthuContext.Provider value={{isLogin,setIsLogin,configLogin}}>
        {children}
      </AuthuContext.Provider>
    );
 }
 export default AuthuContext;