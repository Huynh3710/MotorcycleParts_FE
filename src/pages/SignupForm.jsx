import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../layout/Style.css";
function SignupForm() {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

 const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log(user);
    // console.log(e.target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/authentication/register", user);
      console.log(response.data);
      localStorage.setItem("token", response.data.access_token);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      console.log("Lỗi không thể connect server");
    }
  }
  return (
    
      <div className="wrapper d-flex justify-content-center align-items-center border border-black vh-100">
        <div className="signup-form px-4 px-sm-3 px-sm-5">
          <form onSubmit={handleSubmit} >
            <div className="signup-form-title text-center pt-4 mb-4">
              <h3>Đăng ký</h3>
            </div>
            <div className="signup-form-content">
              <div className="signup-form-group d-sm-flex justify-content-between">
                <div className="signup-form-fullName d-flex flex-column gap-1 mb-2">
                  <label htmlFor="firtsName">Firts Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Họ..."
                    onChange={handleChange}
                    value={user.firstName}
                  />
                </div>
                <div className="signup-form-fullName d-flex flex-column gap-1 mb-2">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Tên..."
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="signup-form-group d-flex flex-column gap-1 mb-2">
                <label htmlFor="email" className="text-small">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Nhập email..."
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="signup-form-group d-flex flex-column gap-1 mb-3">
                <label htmlFor="password" className="">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Nhập password..."
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="btn-signup d-flex flex-column">
                <button type="submit" className="btn btn-primary">
                  Đăng ký
                </button>
                <p className="mt-1 mb-5">
                  Quay lại trang{" "}
                  <Link to={"/"} className="text-decoration-none">
                    Đăng nhập!
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
     );
}

export default SignupForm;
