import React, { useContext } from "react";
import AuthuContext from "./Provider";

const useLogin = () => {
  const { configLogin } = useContext(AuthuContext);
  const login = () => {
    configLogin();
  };
  return { login };
};

export default useLogin;
