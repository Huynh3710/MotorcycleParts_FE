import axios from "axios";
import React, { useEffect, useState } from "react";
import { routeImageCustomer } from "../../../api/apiGetImage";

const ModalDetailCus = ({ onClose, item }) => {
  const [address, setAddress] = useState("");
  const [isLock, setIsLock] = useState();
  const [sumaryCustomer, setSumaryCustomer] = useState();
  // alert(isLock);    
   
  console.log(sumaryCustomer);

  const getSumaryCustomer = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/get-api/customer/${item?.id}/orders/summary`);
      setSumaryCustomer(res.data);
    } catch (error) {
      console.log(error);
    }
  
  }


  useEffect(() => {
    const fetchAddress = async () => {
      const res = await axios.get(
        `http://localhost:8080/get-api/get-address-default-by-customer-id/${item?.id}`
      );
      setAddress(res.data);
    };
    const fetchStateLock = async () => {
        const res = await axios.get(
            `http://localhost:8080/get-api/customer/${item?.id}/lock-status`
        );
        setIsLock(res.data);
    }
    fetchStateLock();
    fetchAddress();
    getSumaryCustomer();
  }, [item, isLock]);

//   const handleLockStatusChange = async (event) => {
//     const newLockStatus = event.target.value === "true";
//     setIsLock(newLockStatus);
//     // Cập nhật trạng thái isLocked trong cơ sở dữ liệu
//     await axios.put(`http://localhost:8080/get-api/customer/${item?.id}/lock-status/${newLockStatus}`);
// };

  return (
    <div className="container-modal-detail-cus">
      <div className="modal-detail-cus">
        <button className="close-btn-cus-detail" onClick={onClose}>
          X
        </button>
        <h3>Thông tin khách hàng</h3>
        <div className="info-cus">
          <div className="info-cus-left">
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src={`${routeImageCustomer}${item?.id}`}
                  alt="avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
                <div className="mt-1">
                  <span>Ảnh đại diện</span>
                </div>
              </div>

              <div className="d-flex flex-column justify-content-center mb-3">
              <div className="mt-1">
                  <span className="fw-bold">Họ và tên:</span> {item?.name}
                  {/* <input type="text" value={item?.name} /> */}
                </div>
                <div>
                  <span className="fw-bold">Giới tính:</span> {item?.sex}
                  {/* <input type="text" value={item?.sex} /> */}
                </div>
                <div>
                  <span className="fw-bold">Email:</span> {item?.email}
                  {/* <input type="text" value={item?.email} /> */}
                </div>
                <div>
                  <span className="fw-bold">Số điện thoại:</span> {item?.phoneNumber}
                  {/* <input type="text" value={item?.phoneNumber} /> */}
                </div>
              </div>
            </div>
            <div>
              <div className="mt-3">
                {address === "Default address not found" ? (
                  <div>
                    <span><span className="fw-bold">Địa chỉ mặc định: </span>Chưa thiết lập</span>
                  </div>
                ) : (
                  <div>
                    <span><span className="fw-bold">Địa chỉ mặc định: </span>{address?.address}</span>
                    <br />
                    <span>{`${address?.ward}, ${address?.district}, ${address?.province}`}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="mt-3">
                <span><span className="fw-bold">Số đơn hàng đã đặt: </span>{sumaryCustomer?.totalOrders} đơn</span>
                <br />
                <span><span className="fw-bold">Tổng số tiền đã thanh toán: </span>{sumaryCustomer?.totalAmount.toLocaleString()} VND</span>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailCus;
