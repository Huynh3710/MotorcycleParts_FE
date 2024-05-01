import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import "./MyAddress.css";
import ModalAddressDetail from "./ModalAddressDetail/ModalAddressDetail";
import ModalAddAddress from "./ModalAddAddress/ModalAddAddress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const MyAddress = () => {
  const [ModalAddress, setModalAddress] = useState(false);
  const [isShowModalAddressDetail, setIsShowModalAddressDetail] =
    useState(false);
  const [listAddress, setListAddress] = useState([]);
  const [itemAddress, setItemAddress] = useState({});
  console.log(itemAddress);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/get-api/get-addresses-by-customer-id/${localStorage.getItem(
          "customerId"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setListAddress(res.data);
      });
  }, []);

  const handleCloseModal = () => {
    setIsShowModalAddressDetail(false);
    setModalAddress(false);
  };

  const handleDeteleAddress = (id) => {
    const customerId = localStorage.getItem("customerId");
    
    try {
      axios
        .delete(
          `http://localhost:8080/get-api/delete-address/${customerId}/${id}`
        )
        .then((res) => {
          // alert("thành công xóa");
          toast.success("Xóa thành công");
          console.log(res.data);
          setListAddress(listAddress.filter((value) => value.id !== id));
        });
    } catch (error) {

      console.log(error);
    }
  };

  const handleSetDefault = (id) => {
    const customerId = localStorage.getItem("customerId");
    try {
      axios
        .put(
          `http://localhost:8080/get-api/set-default-address/${customerId}/${id}`
        )
        .then((res) => {
          console.log(res.data);
          setListAddress(
            listAddress.map((value) => {
              if (value.id === id) {
                return { ...value, default: true };
              } else {
                return { ...value, default: false };
              }
            })
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAddressList = () => {
    axios
      .get(
        `http://localhost:8080/get-api/get-addresses-by-customer-id/${localStorage.getItem(
          "customerId"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setListAddress(res.data);
      });
  };

  const handleDetailAddress = (value) => {
    setItemAddress(value);
    setIsShowModalAddressDetail(true);
  };

  return (
    <div className="container-my-address">
      <div className="d-flex justify-content-between h-auto mt-3">
        <p className="fs-4 m-0">Thông tin địa chỉ</p>
      </div>
      <div className="mt-4">
        <button
          className="add-address-btn w-100"
          onClick={() => {
            setModalAddress(true);
          }}
        >
          + Thêm địa chỉ
        </button>
      </div>
      <div className="my-address-body w-100 mt-3 rounded-3">
        <div className="p-3">
          <span className="fs-5">Danh sách địa chỉ</span>
        </div>
        <div className="px-5">
          {listAddress && listAddress.length > 0 ? (
            listAddress?.map((value, index) => {
              return (
                <div key={index} className="container-list-address">
                  <div className="address-item d-flex justify-content-between p-3">
                    <div>
                      <div className="m-0 d-flex gap-3">
                        <span>Tên: {value?.fullName}</span>
                        {value?.default && (
                          <span
                            className="d-flex align-items-center gap-1"
                            style={{ color: "green" }}
                          >
                            {" "}
                            {
                              <span className="">
                                <CiCircleCheck />
                              </span>
                            }{" "}
                            Địa chỉ mặc định
                          </span>
                        )}
                      </div>

                      <p className="m-0">
                        Địa chỉ: <span>{value?.address + ","}</span>
                        <br />
                        <span>
                          {value?.ward +
                            ", " +
                            value?.district +
                            ", " +
                            value?.province}
                        </span>
                      </p>

                      <p className="m-0">
                        Số điện thoại: <span>{value?.phoneNumBer}</span>
                      </p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-end gap-1">
                      <div className="d-flex gap-1">
                        <button
                          className="edit-btn-address"
                          onClick={() => handleDetailAddress(value)}
                        >
                          Chỉnh Sửa
                        </button>
                        <button
                          className="delete-btn-address"
                          onClick={() => handleDeteleAddress(value?.id)}
                        >
                          Xóa
                        </button>
                      </div>
                      <div className="">
                        <button
                          className="btn-set-default"
                          onClick={() => {
                            handleSetDefault(value?.id);
                          }}
                        >
                          Đặt làm mặc định
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-3 pb-4">
              <h4>Không có địa chỉ nào</h4>
            </div>
          )}
        </div>
      </div>
      {ModalAddress && (
        <ModalAddAddress
          onClose={handleCloseModal}
          listAddress={listAddress}
          setListAddress={handleUpdateAddressList}
        />
      )}
      {isShowModalAddressDetail && (
        <ModalAddressDetail
          onClose={handleCloseModal}
          itemAddress={itemAddress}
          setListAddress={handleUpdateAddressList}
        />
      )}
    </div>
  );
};

export default MyAddress;
