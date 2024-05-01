import React, { useContext, useEffect, useState } from "react";
import "./Nav_Test.css";
import AuthContext from "../../context/AuthProvider";
import useGetAllSparePartType from "../../hooks/useGetAllSparePartType";
import useGetAllBrandMotor from "../../hooks/useGetAllBrandMotor";
import { routeImageCustomer } from "../../api/apiGetImage";
import { FaSearch } from "react-icons/fa";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
const Nav = () => {
  const { handleLogout } = useContext(AuthContext);
  const userId = localStorage.getItem("customerId");
  const [nameUser, setNameUser] = useState();
  const { SparePartsType } = useGetAllSparePartType();
  const { allBrandMotor } = useGetAllBrandMotor();
  const [currentId, setCurrentId] = useState(null);
  const [avatar, setAvatar] = useState(null);

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
    const getAvatar = async () => {
      try {
        const response = await axios.get(`${routeImageCustomer}${userId}`);
        setAvatar(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      getNameUser();
      getAvatar();
    }
  }, [userId]);

  const [filteredData, setFilteredData] = useState([]);
  const [isShowforAccount, setIsShowforAccount] = useState(false);
  const handleOverShowAcc = () => {
    setIsShowforAccount(true);
  };
  // console.log(filteredData);
  const handleOutShowAcc = () => {
    setIsShowforAccount(false);
  };
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    const showToggle = document.querySelector(".show-toggle");
    if (showToggle.style.transform === "translateY(-100%)") {
      showToggle.style.transform = "translateY(0%)";
    } else {
      showToggle.style.transform = "translateY(-100%)";
    }
    setIsShow(!isShow);
  };

  const handleCatalogLeave = () => {
    setIsShow(false);
  };

  const handClickcatalog = (brandId) => {
    try {
      axios
        .get(
          `http://localhost:8080/get-api/get-motor-type-by-brand-motor-id/${brandId}`
        )
        .then((response) => {
          console.log(response.data);
          setFilteredData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    setIsShow(!isShow);
    setCurrentId(brandId);
    console.log(brandId);
  };

  return (
    <div className="wapper">
      <div className="nav-bar">
        <div className="nav-left justify-content-around gap-lg-4">
          <div className="nav-logo d-flex justify-content-center align-items-center ">
            <Link to="/">
              <img src="./Logo1.png" alt="" className="logo" />
            </Link>
          </div>
          <div className="nav-menu-left">
            <div className="nav-items">
              <Link to="/s" className="text-decoration-none">
                <button>Liên hệ</button>
              </Link>
            </div>
            <div className="nav-items">
              <Link to="/s" className="text-decoration-none">
                <button>Giới thiệu</button>
              </Link>
            </div>
            <div className="nav-items">
              <Link to="/s" className="text-decoration-none">
                <button>Sản Phẩm</button>
              </Link>
            </div>

            {/* <div className="nav-items nav-catalog">
              <button className="nav-btn-catalog">Loại Xe</button>
              <div className="nav-hidden-items-catalog">
                {allBrandMotor &&
                  allBrandMotor.map((element, index) => {
                    return (  
                        <button
                          type="button"
                          className="btn"
                          onClick={() => handClickcatalog(element.id)}
                        >
                          {element.name}
                        </button>
                    );
                  })}
              </div>
            </div> */}
            <div
              className="nav-items nav-catalog"
              onMouseLeave={handleCatalogLeave}
            >
              <button className="nav-btn-catalog">Loại Xe</button>
              <div className="nav-hidden-items-catalog">
                {allBrandMotor &&
                  allBrandMotor.map((element, index) => {
                    return (
                      <div key={index}>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => handClickcatalog(element.id)}
                        >
                          {element.name}
                        </button>
                        {currentId === element.id && isShow && (
                          <div className="dropdown-right mt-3">
                            {filteredData &&
                              filteredData.map((element, index) => {
                                return (
                                  <Link
                                    key={index}
                                    className="dropdown-right-items p-2"
                                  >
                                    {element.name}
                                  </Link>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="nav-items nav-category">
              <button className="nav-btn-category">Danh Mục</button>
              <div className="nav-hidden-items-category">
                {SparePartsType &&
                  SparePartsType.map((element, index) => {
                    return (
                      <Link key={index} className="nav-catagory-items">
                        {element.name}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-search d-flex align-items-center">
            <input
              type="text"
              id="nav-search-input"
              className="form-control"
              placeholder="Tìm kiếm..."
            />
            <button className="button-search">
              <FaSearch className="search-icon" />
            </button>
          </div>
          <div className="nav-menu-right d-flex align-items-center gap-3 gap-lg-4">
            <div className="nav-cart">
              <Link to={"/cart"} style={{ color: "black" }}>
                <FaCartShopping className="icon-user-cart" size={"25px"} />
              </Link>
            </div>
            <div
              className="account"
              onMouseOver={handleOverShowAcc}
              onMouseOut={handleOutShowAcc}
            >
              {userId && avatar ? (
                <img
                  src={`${routeImageCustomer}${userId}`}
                  alt="Avatar"
                  style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                />
              ) : (
                <FaUser className="icon-user-cart user-icon" size={"25px"} />
              )}

              <div className="get-name-user-login">
                {userId && <p className="m-0"> {nameUser}</p>}
              </div>
              <div>
                {isShowforAccount ? <IoIosArrowUp /> : <IoIosArrowDown />}

                {isShowforAccount && (
                  <div className="show-login-register">
                    {userId ? (
                      <div>
                        <Link
                          to={"/"}
                          className="link-to-logout text-decoration-none"
                          onClick={handleLogout}
                        >
                          <h6>Đăng xuất</h6>
                        </Link>
                        <Link
                          to={"/account"}
                          className="link-to-infor-acc text-decoration-none"
                        >
                          <h6>Thông tin tài khoản</h6>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div>
                          <Link to={"/signup"} className="link-to-signup">
                            <h6>Đăng ký</h6>
                          </Link>
                        </div>
                        <div>
                          <Link to={"/login"} className="link-to-login">
                            <h6>Đăng nhập</h6>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="nav-in-mobile px-2">
          <div className="nav-logo-mobi">
            <Link to="/">
              <img src="./Logo1.png" alt="" className="logo-mobi" />
            </Link>
          </div>
          <div className="nav-search-mobi d-flex align-items-center">
            <input type="text" className="px-2" />
            <button className="btn-search-mobi">
              <FaSearch className="icon-search-mobi" />
            </button>
          </div>
          <div className="nav-toggle d-flex justify-content-center align-items-center ">
            <button className="btn-toggle" onClick={handleToggle}>
              <PiListDashes size={"25px"} />
            </button>

            <div className="show-toggle">
              <div className="header-toggle px-1">
                <div className="nav-logo-mobi">
                  <Link to="/">
                    <img src="./Logo1.png" alt="" className="logo-mobi" />
                  </Link>
                </div>
                <div className="nav-search-mobi d-flex align-items-center">
                  <input type="text" className="ps-2" />
                  <button className="btn-search-mobi">
                    <FaSearch className="icon-search-mobi" />
                  </button>
                </div>
                <div className="close-toggle">
                  <button className=" btn-toggle" onClick={handleToggle}>
                    <IoCloseSharp size={"30px"} />
                  </button>
                </div>
              </div>

              <div className="body-toggle p-1">
                <div className="nav-mobi-brand-parts ps-2 pb-3">
                  <div className="pb-3">
                    <h6 className="d-flex justify-content-center align-items-center">
                      Hãng xe
                    </h6>
                    <div className="nav-mobi-brand-parts-container">
                      {ArrayListCatalog.map((e, index) => {
                        return (
                          <Link
                            key={index}
                            to="/s"
                            className="nav-catalog-items p-0 px-2"
                          >
                            {e}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pb-3">
                    <h6 className="d-flex justify-content-center align-items-center">
                      Loại phụ tùng
                    </h6>
                    <div className="nav-mobi-type-parts-container">
                      {SparePartsType && SparePartsType.slice(0, 10).map((e, index) => {
                        return (
                          <Link
                            key={index}
                            to="/s"
                            className="nav-catalog-items p-0 px-2"
                          >
                            {e.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mobi-btn-regis-login d-flex gap-2 justify-content-end">
                    <Link to="/signup" className="link-to-signup">
                      <h6>Đăng ký</h6>
                    </Link>
                    <Link to="/login" className="link-to-login">
                      <h6>Đăng nhập</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Nav;
