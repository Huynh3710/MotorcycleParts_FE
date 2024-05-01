import React, { useEffect, useState } from "react";
import "./ModalPayment.css";
import { routeImage } from "../../api/apiGetImage";
import axios from "axios";
import ModalChangeAddress from "./ModalChangeAddress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ModalPayment = ({ onClose, selectedItems, handlePayment }) => {
  const cartId = localStorage.getItem("cartId");
  const customerId = localStorage.getItem("customerId");

  const [orderItems, setOrderItems] = useState();
  const [addressdefault, setAddressDefault] = useState();
  const [allAddress, setAllAddress] = useState();
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();
  console.log(orderItems);

  useEffect(() => {
    //get list of orderItems by cartId and selectedItemsId
    const params = new URLSearchParams();
    for (const id of selectedItems) {
      params.append("listOrderDetailId", id);
    }
    try {
      axios
        .get(
          `http://localhost:8080/get-api/order-detail-by-cart/${cartId}?${params.toString()}`
        )
        .then((res) => {
          console.log(res.data);
          setOrderItems(res.data);
        });
    } catch (error) {}

    //get address by customerId and using addressdefault to render
    try {
      axios
        .get(
          `http://localhost:8080/get-api/get-address-default-by-customer-id/${customerId}`
        )
        .then((res) => {
          if (res.data === "Default address not found") {
            toast.error("Vui lòng thêm địa chỉ mặc định");
            onClose();
            navigate("/account");
          } else {
            console.log(res.data);
            setAddressDefault(res.data);
          }
        });
    } catch (error) {
      console.log(error);
      // alert("Không có địa chỉ mặc định");
      toast.error("Không có địa chỉ mặc định");
    }

    try {
      axios
        .get(
          `http://localhost:8080/get-api/get-addresses-by-customer-id/${customerId}`
        )
        .then((res) => {
          console.log(res.data);
          setAllAddress(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const

  return (
    <div className="container-modal-payment">
      <div className="modal-payment">
        <div className="close-btn" onClick={onClose}>
          X
        </div>
        <h4 className="mb-3">Thanh Toán</h4>
        <div className="container-list-item-payment">
          <div className="address-in-order mb-3">
            <p className="mb-1">Địa chỉ nhận hàng:</p>

            <div className="address-detail">
              <div className="d-flex">
                <div className="w-75">
                  <p className="mb-1">
                    {addressdefault?.ward +
                      ", " +
                      addressdefault?.district +
                      ", " +
                      addressdefault?.province}
                  </p>

                  <p className="mb-1">{addressdefault?.address}</p>
                </div>
                <div className="w-25">
                  <p className="mb-1">
                    Tên Khách hàng: {addressdefault?.fullName}
                  </p>

                  <p className="mb-1">
                    Số điện thoại: {addressdefault?.phoneNumBer}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="change-address"
                  onClick={() => {
                    setIsChange(true);
                  }}
                >
                  Thay đổi địa chỉ
                </button>
              </div>
            </div>
          </div>

          {orderItems &&
            orderItems.map((item, index) => (
              <div key={index}>
                <div
                  key={index}
                  className="payment-item mb-3 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex gap-2 align-items-center">
                    <div className="">
                      <img
                        className="rounded-3"
                        src={`${routeImage}${item?.spareParts?.id}`}
                        alt=""
                        style={{ width: "100px" }}
                      />
                    </div>
                    <div>
                      <p className="m-0">{item?.spareParts?.name}</p>
                      <p className="m-0">
                        {item?.spareParts?.discount
                          ? Number(
                              item.spareParts.unitPrice -
                                (item.spareParts.unitPrice *
                                  item.spareParts.discount.discount) /
                                  100
                            ).toLocaleString("vi-VN") + "đ"
                          : Number(item?.spareParts?.unitPrice).toLocaleString(
                              "vi-VN"
                            ) + "đ"}
                      </p>

                      <p className="m-0">x{item?.quantity}</p>
                    </div>
                  </div>
                  <div className="">
                    Giá:{" "}
                    {Number(item?.price * item?.quantity).toLocaleString(
                      "vi-VN"
                    )}
                    đ
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-end">
          <button className="checkout-btn-in-mmodal" onClick={handlePayment}>
            Thanh toán
          </button>
        </div>
      </div>
      {isChange && (
        <ModalChangeAddress
          onClose={() => {
            setIsChange(false);
          }}
          closeModalPayment={onClose}
          allAddress={allAddress}
          addressdefault={addressdefault}
          setAddressDefault={setAddressDefault}
        />
      )}
    </div>
  );
};

export default ModalPayment;
