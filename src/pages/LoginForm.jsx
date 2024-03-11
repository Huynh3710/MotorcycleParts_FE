import { Link, useNavigate } from "react-router-dom";
import "../layout/Style.css";
import axios from "axios";
import { useState } from "react";
const LoginForm = () => {
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [error, setError] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  //   console.log(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validation logic
  //   const passwordLengthError = "Mật khẩu phải có ít nhất 8 ký tự";
  //   const uppercaseError = "Mật khẩu phải chứa ít nhất một chữ cái viết hoa";
  //   const specialCharError = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt";
  //   const numberError = "Mật khẩu phải chứa ít nhất một chữ số";
  //   const emailError = "Email không hợp lệ";
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   let passwordError = "";
  //   let emailErrorMsg = "";

  //   if (!user.email) {
  //     emailErrorMsg = "Vui lòng nhập email";
  //   } else if (!emailRegex.test(user.email)) {
  //     emailErrorMsg = emailError;
  //   }

  //   if (!user.password) {
  //     passwordError = "Vui lòng nhập mật khẩu";
  //   } else {
  //     if (user.password.length < 8) {
  //       passwordError = passwordLengthError;
  //     } else if (!/[A-Z]/.test(user.password)) {
  //       passwordError = uppercaseError;
  //     } else if (!/[@$!%*?&]/.test(user.password)) {
  //       passwordError = specialCharError;
  //     } else if (!/\d/.test(user.password)) {
  //       passwordError = numberError;
  //     }
  //   }

  //   setError({ email: emailErrorMsg, password: passwordError });
  // };

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
      const response = await axios.post(
        "http://localhost:8080/api/v1/authentication/authenticate",
        dataLogin
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log("Lỗi không thể connect server");
    }
  };

  return (
    <div className="wrapper d-flex justify-content-center align-items-center border border-black vh-100">
      <div className="login-form px-3 px-sm-5">
        <form onSubmit={handleLogin}>
          <div className="login-form-title text-center pt-4">
            <h3>Đăng nhập</h3>
          </div>
          <div className="login-form-content">
            <div className="login-form-group d-flex flex-column gap-1 mb-2">
              <label htmlFor="email" className="text-small">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Nhập email..."
                value={dataLogin.email}
                onChange={handleChange}
              />
            </div>
            <div className="login-form-group d-flex flex-column gap-1 mb-3">
              <label htmlFor="password" className="">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Nhập password..."
                value={dataLogin.password}
                onChange={handleChange}
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
      </div>
    </div>
  );
};

export default LoginForm;
