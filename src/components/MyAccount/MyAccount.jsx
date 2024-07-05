import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import { Form } from "react-bootstrap";
import { routeImageCustomer } from "../../api/apiGetImage";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyAccount() {
  const cid = localStorage.getItem("customerId");
  const [addressDefault, setAddressDefault] = useState(); // State để lưu địa chỉ mặc định của khách hàng
  // const [getShippingRate, setGetShippingRate] = useState();
  // console.log(getShippingRate);
  // useEffect(() => {
  //   try {
  //     const response = axios
  //       .get(
  //         `http://localhost:8080/get-api/get-shipping-rate-by-province-code/${cid}`
  //       )
  //       .then((response) => {
  //         setGetShippingRate(response.data);
  //       });
  //   } catch (error) {
  //     console.log("Failed to fetch data: ", error);
  //   }
  // }, []);
  const [inforCustomer, setInforCustomer] = useState({
    avatar: "",
    email: "",
    id: cid,
    name: "",
    phoneNumber: "",
    sex: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChanged, setIsChanged] = useState(false); // State để theo dõi sự thay đổi
  const [phoneNumberError, setPhoneNumberError] = useState(false); // State để theo dõi lỗi số điện thoại

  useEffect(() => {
    const getInforCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/get-customers-by-id/${cid}`
        );
        setInforCustomer(response.data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };
    const getAddressDefault = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/get-address-default-by-customer-id/${cid}`
        );
        setAddressDefault(response.data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };
    getAddressDefault();
    getInforCustomer();
  }, [cid]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setIsChanged(true); // Bật cờ thay đổi khi có thay đổi ảnh
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phoneNumber") {
      if (value.length !== 10) {
        setPhoneNumberError(true); // Nếu độ dài số điện thoại không hợp lệ, đặt state lỗi thành true
      } else {
        setPhoneNumberError(false); // Nếu độ dài số điện thoại hợp lệ, đặt state lỗi thành false
      }
    }
    setInforCustomer((prevInforCustomer) => ({
      ...prevInforCustomer,
      [name]: value,
    }));
    setIsChanged(true); // Bật cờ thay đổi khi có thay đổi thông tin
  };

  const handleGenderChange = (event) => {
    setInforCustomer((prevInforCustomer) => ({
      ...prevInforCustomer,
      sex: event.target.value,
    }));
    setIsChanged(true); // Bật cờ thay đổi khi có thay đổi giới tính
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("avatar", selectedImage);
    formData.append("email", inforCustomer.email);
    formData.append("id", inforCustomer.id);
    formData.append("name", inforCustomer.name);
    formData.append("phoneNumber", inforCustomer.phoneNumber);
    formData.append("sex", inforCustomer.sex);
    console.log(formData);
    try {
      const response = await axios.put(
        `http://localhost:8080/get-api/update-customer/${cid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Cập nhật thông tin thành công!");
      setIsChanged(false); // Sau khi cập nhật, vô hiệu hóa cờ thay đổi
    } catch (error) {
      console.log("Failed to fetch data: ", error);
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  return (
    <div className="container-my-account">
      <div className="mt-3">
        <p className="mb-0 fs-4">Thông tin tài khoản</p>
      </div>
      <div className="my-account d-flex mt-4 p-4">
        <div className="my-account-left w-100">
          <div className="avatar-user-and-name d-flex gap-5 w-100 justify-content-center">
            <div className="avatar-user d-flex flex-column align-items-center gap-2">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : `${routeImageCustomer}${cid}`
                }
                alt=""
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                id="avatar-display"
              />
              <div>
                <input
                  type="file"
                  id="avatar-input"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="avatar-input" className="btn btn-primary">
                  Thay đổi ảnh đại diện
                </label>
              </div>
            </div>

            <div className="d-flex flex-column gap-3 w-50">
              <div className="name-user">
                <Form.Label className="mb-1" style={{ fontSize: "18px" }}>
                  Họ và tên:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={inforCustomer?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="email">
                <Form.Label className="mb-1" style={{ fontSize: "18px" }}>
                  Email:
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inforCustomer?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="phone-number">
                <Form.Label className="mb-1" style={{ fontSize: "18px" }}>
                  Số điện thoại:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={inforCustomer?.phoneNumber}
                  onChange={handleChange}
                />
                {phoneNumberError && (
                  <p
                    style={{ color: "red", fontSize: "14px", marginTop: "5px" }}
                  >
                    Số điện thoại phải có độ dài là 10 số.
                  </p>
                )}
              </div>
              <div className="sex d-flex gap-3">
                <Form.Check
                  type="radio"
                  label="Nam"
                  name="gender"
                  id="male"
                  value="male"
                  checked={inforCustomer?.sex === "male"}
                  onChange={handleGenderChange}
                />
                <Form.Check
                  type="radio"
                  label="Nữ"
                  name="gender"
                  id="female"
                  value="female"
                  checked={inforCustomer?.sex === "female"}
                  onChange={handleGenderChange}
                />
                <Form.Check
                  type="radio"
                  label="Khác"
                  name="gender"
                  id="other"
                  value="other"
                  checked={inforCustomer?.sex === "other"}
                  onChange={handleGenderChange}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!isChanged || phoneNumberError}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
          {addressDefault && (
            <div>
              <p
                className="fs-4 mt-4 mb-0"
                style={{
                  borderBottom: "1px solid #b1afaf",
                  paddingBottom: "10px",
                }}
              >
                Địa chỉ mặc định
              </p>
              <div className="address-default mt-3">
                <div className="address-default-content">
                  <p className="mb-0" style={{ fontSize: "18px" }}>
                    <span className="fw-bolder">Địa chỉ: </span>
                    {addressDefault?.address}, {addressDefault?.ward},{" "}
                    {addressDefault?.district}, {addressDefault?.province}
                  </p>
                </div>
                <div className="address-default-content mb-0">
                  <p className="mb-0" style={{ fontSize: "18px" }}>
                    <span className="fw-bolder">Số điện thoại: </span>
                    {addressDefault?.phoneNumBer}
                  </p>
                </div>
                <div className="address-default-content mb-0">
                  <p className="mb-0" style={{ fontSize: "18px" }}>
                    {" "}
                    <span className="fw-bolder">Người nhận: </span>
                    {addressDefault?.fullName}
                  </p>
                  <p className="mb-0"></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
