import React, { useState } from "react";
import "../layout/Style.css";
import { FaSearch } from "react-icons/fa";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { PiListDashes } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
const Nav = () => {
  const ArrayListCatalog = ["HONDA", "YAMAHA"];
  const ArrayListHonda = ["Cup", "Dream"];
  const ArrayListYamaha = ["ex", "sirus"];
  const ArrayListCategory = [
    "Lốp xe",
    "Dây curoa",
    "Bộ ốc và bản lề",
    "Bộ côn và dây đai",
    "Dây xích và bộ truyền động",
    "Hệ thống phanh",
    "Đèn pha và đèn hậu",
    "Bình xăng và hệ thống xăng",
    "Bộ ly hợp và bánh răng",
  ];
  const [isShowforAccount, setIsShowforAccount] = useState(false);
  const handleOverShowAcc = () => {
    setIsShowforAccount(true);
  };

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
            <div className="nav-items nav-catalog">
              <button className="nav-btn-catalog">Loại Xe</button>
              <div className="nav-hidden-items-catalog">
                {ArrayListCatalog.map((element, index) => {
                  return (
                    <div key={index} className="nav-catalog-items-container">
                      <Link to="/s" className="nav-catalog-items">
                        {element}
                      </Link>
                      <div className="nav-catalog-sub-items">
                        {element === "HONDA" && (
                          <div className="nav-honda">
                            {ArrayListHonda.map((element, index) => {
                              return (
                                <Link key={index} className="nav-honda-items">
                                  {element}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        {element === "YAMAHA" && (
                          <div className="nav-yamaha">
                            {ArrayListYamaha.map((element, index) => {
                              return (
                                <Link key={index} className="nav-yamaha-items">
                                  {element}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="nav-items nav-category">
              <button className="nav-btn-category">Danh Mục</button>
              <div className="nav-hidden-items-category">
                {ArrayListCategory.map((element, index) => {
                  return (
                    <Link key={index} className="nav-catagory-items">
                      {element}
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
              <FaCartShopping className="icon-user-cart" size={"25px"} />
            </div>
            <div
              className="account"
              onMouseOver={handleOverShowAcc}
              onMouseOut={handleOutShowAcc}
            >
              <FaUser className="icon-user-cart user-icon" size={"25px"} />
              <div>
                {isShowforAccount ? <IoIosArrowUp /> : <IoIosArrowDown />}
                {isShowforAccount && (
                  <div className="show-login-register">
                    <div>
                      <Link to={"/"} className="link-to-signup">
                        <h6>Đăng ký</h6>
                      </Link>
                    </div>
                    <div>
                      <Link to={"/"} className="link-to-login">
                        <h6>Đăng nhập</h6>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="nav-in-mobile px-2">
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
                          <Link key={index} to="/s" className="nav-catalog-items p-0 px-2">
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
                      {ArrayListCategory.slice(0, 10).map((e, index) => {
                        return (
                          <Link key={index} to="/s" className="nav-catalog-items p-0 px-2">
                            {e}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mobi-btn-regis-login d-flex gap-2 justify-content-end">
                    <Link to={"/"} className="link-to-signup">
                      <h6>Đăng ký</h6>
                    </Link>
                    <Link to={"/"} className="link-to-login">
                      <h6>Đăng nhập</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
