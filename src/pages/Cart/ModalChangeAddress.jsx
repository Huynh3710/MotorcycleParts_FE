import React, { useState } from "react";
import "./ModalChangeAddress.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ModalChangeAddress = ({
  onClose,
  closeModalPayment,
  allAddress,
  setAddressDefault,
}) => {
  const [idAddress, setIdAddress] = useState();

  const handleChangeAddress = (id) => {
    setIdAddress(id);
  };

  const handleSetDefault = () => {
    const customerId = localStorage.getItem("customerId");
    try {
      if (idAddress === undefined) {
        toast.error("Vui lòng chọn địa chỉ");
        return;
      }
      axios
        .put(
          `http://localhost:8080/get-api/set-default-address/${customerId}/${idAddress}`
        )
        .then((res) => {
          console.log(res.data);
          setAddressDefault(res.data);
        });
    } catch (error) {
      console.log(error);
    }
    onClose();
  };
  console.log("allAddress: ", allAddress);

  return (
    <div className="container-modal-change-address">
      <div className="modal-change-address">
        <div className="modal-change-address-header mb-3">
          <h5>Chọn địa chỉ giao hàng</h5>
          <button className="btn-close-change-address" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-change-address-body">
          {allAddress &&
            allAddress.map((address, index) => {
              return (
                <div
                  key={index}
                  className="address-item mb-3 d-flex align-items-center gap-2"
                >
                  <input
                    type="radio"
                    name="address"
                    id={address.id}
                    onChange={() => handleChangeAddress(address.id)}
                  />
                  <label htmlFor={address.id}>
                    {address.fullName}, {address.phoneNumBer}, <br />
                    {address.address}, {address.ward}, {address.district},{" "}
                    {address.province}
                  </label>
                </div>
              );
            })}
        </div>
        <div className="modal-change-address-footer">
          <button
            className="btn-change-address-modal"
            onClick={handleSetDefault}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChangeAddress;
