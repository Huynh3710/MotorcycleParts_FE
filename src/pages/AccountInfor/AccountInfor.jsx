import React, { useContext, useEffect, useState } from "react";
import "./AccountInfor.css";
import axios from "axios";
import Nav from "../../components/Navbar/Nav";
import User_Icon from "../../assets/images/user_icon.jpg";
import { routeImageCustomer } from "../../api/apiGetImage";
import MyOrder from "../../components/MyOrder/MyOrder";
import MyAddress from "../../components/MyAddress/MyAddress";
import MyAccount from "../../components/MyAccount/MyAccount";
import AuthContext from "../../context/AuthProvider";
import Footer from "../../components/Footer/Footer";
const AccountInfor = () => {
  const [activeDiv, setActiveDiv] = useState(0);
  const [nameUser, setNameUser] = useState("");
  const userId = localStorage.getItem("customerId");
  const { handleLogout } = useContext(AuthContext);
  const account_infor = [
    "Thông tin tài khoản",
    "Thông tin địa chỉ",
    "Đơn hàng của tôi",
    // "Thông báo của tôi",
  ];

  useEffect(() => {
    const getNameUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/get-customer-name-by-id/${userId}`
        );
        setNameUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      getNameUser();
    }
  }, [userId]);

  const renderComponent = () => {
    switch (activeDiv) {
      // case 0:
      //   // return <MyAccount />;
      //   return (
      //     <div>
      //       <p>My Account</p>
      //     </div>
      //   );

      case 1:
        // return <MyAdress />;
        return (
          <div>
            <MyAddress />
          </div>
        );
      case 2:
        return <MyOrder />;
      // case 3:
      //   // return <MyNotifi />;
      //   return (
      //     <div>
      //       <p>My Notifice</p>
      //     </div>
      //   );

      default:
        return <MyAccount />;
    }
  };

  const Logout = () => {
    handleLogout();
    window.location.href = "/";
  };

  return (
    <div>
      <div className="container-account-infor d-flex">
        <Nav />
        <div
          className="container container-content-account-infor d-flex p-0 gap-4"
          style={{ marginTop: "100px" }}
        >
          <div className="account-infor-left px-2 d-flex flex-column justify-content-between">
            <div className="container-top-left mt-3 d-flex flex-column align-items-center">
              <div className="name-avartar d-flex align-items-center gap-3">
                <div className="avarta">
                  <img
                    src={`${routeImageCustomer}${userId}`}
                    alt="user-icon"
                    className="centered-image"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <strong className="name" style={{}}>
                  {nameUser}
                </strong>
              </div>
              <div className="mt-4">
                {account_infor.map((value, index) => (
                  <div
                    key={index}
                    className={`account-infor px-5 py-3 mt-1 ${
                      activeDiv === index ? "active" : ""
                    }`}
                    onClick={() => setActiveDiv(index)}
                  >
                    <p className="m-0">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="logout d-flex mb-4 fs-5 px-4">
              <button
                type="button"
                className="btn btn-primary "
                style={{ width: "100%" }}
                onClick={Logout}
              >
                Đăng xuất
              </button>
            </div>
          </div>
          <div className="account-infor-right">
            <div className="account-infor-right w-100">{renderComponent()}</div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default AccountInfor;
