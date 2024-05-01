import { Link, useNavigate } from "react-router-dom";
import "../../layout/Style.css";
import Nav from "../../components/Navbar/Nav";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import "./LoginStyle.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginForm = () => {
  const { login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
    console.log(e.target.value);
  };

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(dataLogin);
      // Lấy role từ localStorage
      const role = localStorage.getItem("role");
      // Kiểm tra role và chuyển hướng đến trang tương ứng
      if (role === "USER") {
     
        navigate("/");
      } else if (role === "ADMIN" || role === "MANAGER") {
     
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="wrapper d-flex justify-content-center align-items-center border border-black vh-100">
        <div className="login-form px-3 px-sm-5">
          <form onSubmit={handleLogin}>
            <div className="login-form-title text-center pt-4">
              <h3>Đăng nhập</h3>
            </div>
            <div className="login-form-content mt-4">
              <div className="login-form-group d-flex flex-column gap-1 mb-3">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  size="small"
                  type="email"
                  value={dataLogin.email}
                  onChange={handleChange}
                />
              </div>
              <div className="login-form-group d-flex flex-column gap-1 mb-3">
                <TextField
                  id="outlined-adornment-password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={dataLogin.password}
                  onChange={handleChange}
                  name="password"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="btn-login d-flex flex-column">
                <button type="submit" className="btn btn-primary">
                  Đăng nhập
                </button>
                <p className="mt-1 mb-5">
                  Chưa có tài khoản? Đăng ký{" "}
                  <Link to={"/signup"} className="text-decoration-none">
                    tại đây!
                  </Link>
                </p>
              </div>
            </div>
          </form>
          {/* <button onClick={authContext.handleLogout}>Logut</button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
