import React from "react";
import "./ModalDetailOrder.css";
const ModalDetailOrder = ({ handleCloseDetail, order, getImage }) => {
  return (
    <div className="container-modal-detail-order">
      <div className="modal-detail-order">
        <button className="close-btn" onClick={handleCloseDetail}>
          X
        </button>
        <div className="header-modal-detail-order">
          {/* <h5>Chi tiết đơn hàng</h5> */}
        </div>
        <div className="body-modal-detail-order">
          <div className="body-head d-flex justify-content-between mb-3">
            <div className="address">
              <h5>Địa chỉ nhận hàng</h5>
              <p className="m-0">
                {order?.address?.fullName + ", " + order?.address?.phoneNumBer}
              </p>
              <p className="m-0">
                {order?.address?.ward +
                  ", " +
                  order?.address?.district +
                  ", " +
                  order?.address?.province}
              </p>
              <p className="m-0">{order?.address?.address}</p>
            </div>
            <div className="date-order me-5">
              <h5>Ngày đặt hàng</h5>
              <p>
                {new Date(order?.orderDate).toLocaleString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="body-content">
            {order?.orderDetails.map((value, index) => {
                return(
                <div key={index} className="d-flex justify-content-between align-items-center mb-4  ">
                    <div className="d-flex gap-3 justify-content-between align-items-center">
                        <div>
                            <img src={`${getImage}${value.spareParts.id}`} alt="" className="image" style={{width: ""}}/>
                        </div>
                        <div>
                            <div className="name-product fs-5">
                            {value?.spareParts?.name}
                            </div>
                            <div className="quanlity">
                            <i>Số lượng: </i>
                            {value?.quantity}
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        <div className="fs-5">
                            {value?.price.toLocaleString()} đ
                        </div>
                    </div>
                </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailOrder;
