import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { MdDashboard } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { MdDiscount } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import {
  FaProductHunt,
  FaShoppingBag,
  FaUserFriends,
  FaMotorcycle, 
} from "react-icons/fa";

// Import your components here
import Overview from '../Overview/Overview';
import ManageProduct from '../ManageSpareParts/ManageSpareParts';
import ManageOrder from '../MangeOrrder/ManageOrder';
import ManageCustomer from '../ManageCustomer/ManageCustomer';
import ManageCategory from "../ManageCategory/ManageCategory";
import ManageCarType from "../ManageCarType/ManageCarType";
import ManageSparePartType from "../ManageSparePartType/ManageSparePartType";
import ManageSparePartTypePic from "../../../assets/images/Remove-bg.ai_1714138096776.png"
import ManageDiscount from "../ManageDiscount/ManageDiscount";
import ManageShipping from "../ManageShipping/ManageShipping";
import { IoIosLogOut } from "react-icons/io";
import useGetOrder from "../../../hooks/useGetOrder";
import PoXe from "../../../assets/images/SpareParts/PhuocXe.jpg";
import AuthContext from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Tổng Quan");
  const [useName, setUsername] = useState(<Overview />);
  const [currentComponent, setCurrentComponent] = useState(<Overview />);
  const { handleLogout } = useContext(AuthContext);
  const neviagte = useNavigate();
  const size = "30px"
  const category = [
    { name: "Tổng Quan", icon: <MdDashboard  size={size}/>, component: <Overview />},
    { name: "Quản Lý Sản Phẩm", icon: <FaProductHunt size={size}/>, component: <ManageProduct /> },
    { name: "Quản Lý Đơn Hàng", icon: <FaShoppingBag size={size}/>, component: <ManageOrder /> },
    { name: "Quản Lý Hãng Phụ Tùng", icon: <BiSolidCategory  size={size}/>, component: <ManageCategory /> },
    { name: "Quản Lý Loại Phụ Tùng", icon: <img src={ManageSparePartTypePic} alt="Spare Part Type" width={size} height={size} />, component: <ManageSparePartType /> },
    { name: "Quản Lý Loại Xe", icon: <FaMotorcycle size={size}/>, component: <ManageCarType /> },
    { name: "Quản Lý Khuyến Mãi", icon: <MdDiscount size={size}/>, component: <ManageDiscount /> },
    { name: "Quản lý phí giao hàng", icon: <FaShippingFast size={size}/>, component: <ManageShipping />},
    { name: "Quản Lý Khách Hàng", icon: <FaUserFriends size={size}/>, component: <ManageCustomer /> },
    { name: "Đăng xuất",icon: <IoIosLogOut size={size}/>}
  ];
  
  const handleItemClick = (item) => {
    console.log(item);
    if (item.name === "Đăng xuất") {
      handleLogout();
      neviagte("/");
    } else {
      console.log(item.name);
      setActiveItem(item.name);
      setCurrentComponent(item.component);
    }
  };

  const {getUserNameById} = useGetOrder();
  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("customerId");
      const response = await getUserNameById(userId);
      setUsername(response);
      console.log(response);
    };
    fetchData();
  }, []);
  
  return (
    <div className="container-admin-dashboard d-flex gap-3">
      <div className="admin-dashboard-left">
        <div className="comtainer-image-admin d-flex align-items-center gap-3 my-4">
          <img
            className="image-admin"
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
          />
          <div>
            <h5 className="m-0">Xin chào!</h5>
            <h5>{useName}</h5>
          </div>
        </div>
        <div className="container-category">
          {category.map((item, index) => (
            <div key={index} 
                 className={`category-item d-flex gap-3 align-items-center ${activeItem === item.name ? 'active' : ''}`}
                 onClick={() => handleItemClick(item)}>
              {item.icon}
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="admin-dashboard-right">
        <div className="header-admin p-4 d-flex">
          <h5>Spare Parts Shop</h5>
          {/* <div className="imgae-admin">
            <img className="me-2" style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",            
            }} src={PoXe} alt="" />
            <span>name</span>
          </div> */}
        </div>
        <div className="component-change ps-4 ">{currentComponent}</div>
      </div>
    </div>
  );
};

export default Dashboard;
