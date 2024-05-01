import axios from "axios";
import{ useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useLogout = () => {
  const {setLogin} = useContext(AuthContext);
  const login = async (dataLogin) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/get-api/authenticate",
        dataLogin
      );
      console.log(response.data);
      setLogin(response.data);
      alert("Đăng nhập thành công");
    } catch (error) {
      alert("Đăng nhập thất bại");
      // console.log("Lỗi không thể connect server");
    }
  };
  return { login };
};

export default useLogout;
