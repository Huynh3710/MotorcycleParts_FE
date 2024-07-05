import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import OrderItem from "../OrderItem/Orderitem";
import {routeImage} from "../../api/apiGetImage";
import "./MyOrder.css";
const api_states = [
  "ALL",
  "PENDING",
  "CAPTURED",
  "PREPARING",
  "SHIPMENT",
  "DELIVERED",
  "CANCELED",
  "REFUNDED",
];

const MyOrder = () => {
  const [activeOrder, setActiveOrder] = useState(0);
  const [filterOrder, setFilterOrder] = useState("ALL");
  const customerId = localStorage.getItem("customerId");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);
  const order_state = [
    "Tất Cả",
    "Chờ Xác Nhận",
    "Đã xác nhận",
    "Đang chuẩn bị",
    "Đang vận chuyển",
    "Đã Giao",
    "Đã Hủy",
    "Được Hoàn Tiền"
  ];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/orders-by-customerId/${customerId}/${api_states[activeOrder]}`
        );
        setOrders(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };

    if (customerId) {
      getOrders();
    }
  }, [filterOrder, activeOrder, customerId]);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <p className="fs-4 mt-sm-3">Đơn hàng của tôi</p>
      <div className="state-order-my-order py-3">
        <div className="m-0 d-flex justify-content-around">
          {order_state.map((value, index) => {
            return (
              <div
                key={index}
                className={`btn-order border-0 px-3 py-1 m-0 ${
                  activeOrder === index ? "active-order" : ""
                }`}
                onClick={() => {
                  setActiveOrder(index);
                  setFilterOrder(api_states[index]);
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
      <div className="search-order d-flex justify-content-end mt-3 mx-2">
        {/* <div className="w-50 mb-2">
          <SearchBar sizeButton={20} />
        </div> */}
      </div>
      <div className="container-list-order">
        {currentOrders.length > 0 ? (
          currentOrders.map((value, index) => {
            console.log(value);
            return <OrderItem key={index} order={value} getImage = {routeImage}/>;
          })
        ) : (
          <div
            className="w-100 d-flex justify-content-center align-items-center bg-light"
            style={{ height: "50vh" }}
          >
            <h4>Hiện tại không có đơn hàng nào !</h4>
          </div>
        )}
      </div>
      <div className="pagination">
  {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map(number => (
    <button
      key={number + 1}
      onClick={() => paginate(number + 1)}
      className={currentPage === number + 1 ? 'active' : ''}
    >
      {number + 1}
    </button>
  ))}
</div>

    </>
  );
};

export default MyOrder;
