import React, { useState } from "react";
import ModalReview from "./ModalReview/ModalReview";
import ModalDetailOrder from "./ModalDetailOrder/ModalDetailOrder";
import "./OrderItem.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
const OrderItem = ({ order, getImage }) => {
  const [orderState, setOrderState] = useState(order?.orderStatus.status);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const handleReviews = () => {
    setIsShowModal(!isShowModal);
  }

  const handleCancel = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/user-payment/orders/${order.orderCode}/CANCELLED`).then((res) => {
        console.log(res.data)
      });
      setOrderState("CANCELLED"); 
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng: ", error);
    }
    setIsCancel(false);
  }

  const handleClose = () => {
    setIsCancel(false);
  }

  return (
    <div className="px-2 mb-5 container-order-items">
      {order?.orderDetails.map((value, index) => {
        return (
          <div
            key={index}
            className="order-items my-3 p-3 pe-5 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex gap-5 justify-content-between align-items-center">
              <div>
                <img src={`${getImage}${value.spareParts.id}`} alt="" className="image" />
              </div>
              <div>
                <div className="name-product fs-5">
                  {value?.spareParts?.name}
                </div>
                <div className="quanlity">
                  <i>Số lượng: </i>
                  {value?.quantity}
                </div>
                <div className="status-order">
                  {(() => {
                    switch (orderState) {
                      case "PENDING":
                        return "Chờ xác nhận";
                      case "CAPTURED":
                        return "Đã xác nhận";
                      case "PREPARING":
                        return "Đang chuẩn bị";
                      case "SHIPMENT":
                        return "Đang vận chuyển";
                      case "DELIVERED":
                        return "Đã giao hàng";
                      case "CANCELLED": 
                        return "Đã hủy";
                      case "RETURNED":
                        return "Hoàn tiền";
                      default:
                        return "Trạng thái không xác định";
                    }
                  })()}
                </div>
              </div>
            </div>
            <div className="price fs-5">Đơn Giá: {Number(value?.price).toLocaleString('vi-VN')}đ</div>
          </div>
        );
      })}

      <div className="total d-flex justify-content-end px-3 pb-3">
        <div className="w-25 ">
          <div className="fs-5 d-flex justify-content-end">
            Tổng giá: {Number(order?.amountPrice).toLocaleString('vi-VN')}đ
          </div>
          <div className="mt-3 d-flex gap-2">
            {orderState === "DELIVERED" ? (
              <button type="button" className="btn btn-outline-primary reviews-btn w-100" onClick={handleReviews}>Đánh giá</button>
            ) : (
              <button className="button-view-order-detail w-100" onClick={()=>{setIsShowDetail(true)}}>
                Chi tiết
              </button>
            )}
            {orderState === "PENDING" && (
              <button className="button-cancel w-100" onClick={()=>{setIsCancel(true)}}>Hủy đơn</button>
            )}
          </div>
        </div>
      </div>

      {isShowModal && <ModalReview handleCloseReviews={handleReviews} order={order}/>}
      {isShowDetail && <ModalDetailOrder handleCloseDetail={()=>{setIsShowDetail(false)}} order={order} getImage={getImage}/>}

      <Modal show={isCancel} onHide={handleClose} style={{marginTop: "10%"}}>
        <Modal.Header closeButton>
          <Modal.Title className="" style={{color: "red"}}>Hủy đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>Xác nhận hủy đơn?</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-secondary" onClick={handleClose}>
            Đóng
          </button>
          <button variant="primary" className="btn btn-danger" onClick={handleCancel}>
            Xác nhận
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderItem;

