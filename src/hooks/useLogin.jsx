import axios from "axios";
import{ useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useLogin = () => {
  const {setLogin} = useContext(AuthContext);
  const login = async (dataLogin) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/get-api/authenticate",
        dataLogin
      );
      console.log(response.data);
      setLogin(response.data);
      toast.success("Đăng nhập thành công");
      // alert("Đăng nhập thành công");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
      // alert("Đăng nhập thất bại");
      // console.log("Lỗi không thể connect server");
    }
  };
  return { login };
};

export default useLogin;
