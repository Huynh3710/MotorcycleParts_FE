import React, { useEffect, useState } from "react";
import "./ModalOrderDetailAdmin.css";
import useGetOrder from "../../hooks/useGetOrder";
import {routeImage} from "../../api/apiGetImage";
const statusOptions = [
  "PENDING",
  "CAPTURED",
  "PREPARING",
  "SHIPMENT",
  "DELIVERED",
  "CANCELLED",
];

const statusOptionsName = [
  "Chờ Xác Nhận",
  "Xác Nhận",
  "Đang chuẩn bị",
  "Đang vận chuyển",
  "Đã Giao",
  "Đã Hủy",
];
const ModalOrderDetailAdmin = ({ setShowEditModal, item, tempStatusName }) => {
  const [customerName, setCustomerName] = useState("");

  console.log(item);
  const { getUserNameById } = useGetOrder();
  useEffect(() => {
    const fetchData = async () => {
      const customerName = await getUserNameById(item.customerId);
      setCustomerName(customerName);
    };
    fetchData();
  }, [customerName]);
  const statusName = statusOptionsName[statusOptions.indexOf(tempStatusName)];
  return (
    <div className="container-modal-detail">
      <div className="modal-detail">
        <div className="head-modal">
          <div className="mt-3 ms-3">
            <h3 className="p-0">Chi tiết đơn hàng</h3>
          </div>
          <div
            className="close-modal"
            onClick={() => {
              setShowEditModal(false);
            }}
          >
            X
          </div>
        </div>
        <div className="content-modal">
          <div className="container-infor-cus d-flex justify-content-between">
            <div className="">
              <span className="customer-name">Khách hàng: {customerName}</span>
              <div className="address mb-0">Giao đến: </div>
            </div>
            <div className="date">
              <div className="date-order">
                Ngày đặt hàng:{" "}
                {new Date(Number(item.orderDate)).toLocaleString()}
              </div>
              <div className="date-order">
                Ngày giao hàng: {item.deliveryDate}
              </div>
            </div>
          </div>
          <div className="buy-product">
            <div>
              <div className="order-status px-2 pe-5 d-flex justify-content-between">
                <div><span style={{fontSize: "18px"}}>Trạng thái: {tempStatusName ? statusName : "Chờ xác nhận"}</span></div>
                <div><span style={{fontSize: "18px"}}>Giá trị đơn hàng: {item?.amountPrice}đ</span></div>
              </div>
              <div className="">
                {item?.orderDetails?.map((product, index) => (
                  <div className="d-flex my-4 p-2 px-4 justify-content-between align-items-center">
                    <div key={index} className="product d-flex">
                      <div className="product-image me-3" style={{ width: "150px", height: "100px"}}>
                        <img
                          src={`${routeImage}${product.spareParts.id}`}
                          alt="product"
                          className="img-fluid"
                       
                        />
                      </div>
                      <div>
                        <div className="product-name">
                          <span>{product.spareParts.name}</span>
                        </div>
                        <div className="product-quantity">
                          <i>Số lượng: x{product.quantity}</i>
                        </div>
                        <div className="product-price">
                          <span>Đơn Giá: {Number(product.spareParts.unitPrice).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>
                    <div className="total-price">
                      <span style={{fontWeight: "600", fontSize: "18px"}}>Tổng giá: {
                        Number(product.spareParts.unitPrice * product.quantity).toLocaleString('vi-VN')
                      }đ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalOrderDetailAdmin;
