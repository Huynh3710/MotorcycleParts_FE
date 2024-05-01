import React from "react";
import "./Order.css";
import Nav from "../../components/Navbar/Nav";
const Order = () => {
  return (
    <div className="container-order-page d-flex">
      <Nav />
      <div className="container order" style={{marginTop: "100px"}}>
        <div className="order-left"></div>
        <div className="order-right"></div>
      </div>
    </div>
  );
};

export default Order;
