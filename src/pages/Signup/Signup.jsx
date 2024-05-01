import React from "react";
import "./SignupStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Nav from "../../components/Navbar/Nav";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    sex: "male",
    // avatar: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  };
  console.log(image);

  console.log(avatar);

  console.log(user);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const nameRegex = /^[a-zA-ZÀ-ỹ0-9\s]*$/;
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex = /^.{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newUser = { ...user, [name]: value };
    setUser(newUser);
    // console.log(newUser);
  };
  // console.log(user);
  // const handleAvatarChange = (newAvatar) => {
  //   setUser((prevUser) => ({ ...prevUser, avatar: newAvatar }));
  // };
  // console.log("User avatar "+user.avatar);
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    // Kiểm tra các trường nhập liệu
    if (!user.firstName) {
      setModalMessage("Vui lòng nhập tên");
      setShowModal(true);
      return;
    }
    if (!nameRegex.test(user.firstName)) {
      setModalMessage("Tên không được chứa ký tự đặc biệt");
      setShowModal(true);
      return;
    }
    if (!user.lastName) {
      setModalMessage("Vui lòng nhập họ");
      setShowModal(true);
      return;
    }
    if (!nameRegex.test(user.lastName)) {
      setModalMessage("Họ không được chứa ký tự đặc biệt");
      setShowModal(true);
      return;
    }
    if (!user.email) {
      setModalMessage("Vui lòng nhập email");
      setShowModal(true);
      return;
    }
    if (!emailRegex.test(user.email)) {
      setModalMessage("Email không hợp lệ");
      setShowModal(true);
      return;
    }
    if (!user.phoneNumber) {
      setModalMessage("Vui lòng nhập số điện thoại");
      setShowModal(true);
      return;
    }
    if (!phoneRegex.test(user.phoneNumber)) {
      setModalMessage("Số điện thoại không hợp lệ");
      setShowModal(true);
      return;
    }
    if (!user.password) {
      setModalMessage("Vui lòng nhập mật khẩu");
      setShowModal(true);
      return;
    }
    if (!passwordRegex.test(user.password)) {
      setModalMessage("Mật khẩu phải có ít nhất 8 ký tự");
      setShowModal(true);
      return;
    }

    // Nếu tất cả các trường đều hợp lệ, tiếp tục xử lý form
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    // if (user.avatar) {
    //   formData.append("avatar", user.avatar);
    // }
    if (avatar) {
      formData.append("avatar", image);
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/get-api/register",
        formData
      );
      console.log(response.data);
      if (response.data && response.data.message) {
        setModalMessage("Đăng ký thất bại: " + response.data.message);
        setShowModal(true);
      } else {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        // localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("cartId", response.data.cartId);
        toast.success("Đăng ký thành công");
        navigate("/login");
      }
    } catch (error) {
      console.log("Lỗi không thể connect server");
    }
  };

  return (
    <div className="d-flex flex-column" style={{ gap: "50px" }}>
      <Nav />
      <div className="wrapper d-flex justify-content-center align-items-center border border-black vh-100">
        <div className="signup-form px-4 px-sm-3 px-sm-5">
          <form onSubmit={handleSubmit1}>
            <div className="signup-form-title text-center pt-4 mb-4">
              <h3>Đăng ký</h3>
            </div>
            <div className="signup-form-content">
              <div className="signup-form-group d-sm-flex justify-content-between">
                <div className="signup-form-fullName d-flex flex-column gap-1 mb-3">
                  <TextField
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    style={{ backgroundColor: "#FFF" }}
                  />
                </div>
                <div className="signup-form-fullName d-flex flex-column gap-1 mb-3">
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    style={{ backgroundColor: "#FFF" }}
                  />
                </div>
              </div>
              <div className="signup-form-group d-flex flex-column gap-1 mb-3">
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  style={{ backgroundColor: "#FFF" }}
                />
              </div>
              <div className="signup-form-group d-flex flex-column gap-1 mb-3">
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  style={{ backgroundColor: "#FFF" }}
                />
              </div>
              <div className="signup-form-group d-flex align-items-center justify-content-between mb-3">
                <div className="sex d-flex flex-column gap-1 mb-2">
                  <FormControl variant="outlined">
                    <InputLabel id="sex-label">Sex</InputLabel>
                    <Select
                      labelId="sex-label"
                      id="sex"
                      value={user.sex}
                      onChange={handleChange}
                      name="sex"
                      label="Sex"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  className="avatar d-flex gap-2 "
                  style={{ marginRight: "20px" }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <label>Avatar:</label>
                  </div>
                  <div id="input-avatar">
                    {/* <ImageUpload onAvatarChange={handleAvatarChange} /> */}
                    {/* <ImageUpload onAvatarChange={handleAvatarChange1} /> */}
                    <input
                      type="file"
                      id="image"
                      className="form-control w-50"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="signup-form-group d-flex flex-column gap-1 mb-3">
                <TextField
                  id="outlined-adornment-password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={user.password}
                  onChange={handleChange}
                  name="password"
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
                  style={{ backgroundColor: "#FFF" }}
                />
              </div>
              <div className="btn-signup d-flex flex-column">
                <button type="submit" className="btn btn-primary">
                  Đăng ký
                </button>
                <p className="mt-1 mb-5">
                  Quay lại trang{" "}
                  <Link to={"/login"} className="text-decoration-none">
                    Đăng nhập!
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          // className="modal"
          className="top-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Lỗi!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default SignupForm;
