import Select from "react-select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalShippingUpdate = ({ onClose, item, setShippingList }) => {
  const [allProvince, setAllProvince] = useState();
  const [selectedProvince, setSelectedProvince] = useState({
    value: item?.code,
    label: item?.fullName,
  });
  const [shippingRate, setShippingRate] = useState(item?.shippingRate);

  useEffect(() => {
    const getAllProvince = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-api/get-all-provinces"
        );
        setAllProvince(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProvince();
  }, []);

  const provinceOptions = allProvince?.map((province) => ({
    value: province?.code,
    label: province?.fullName,
  }));

  const getAllShipping = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/get-api/get-all-shipping-rate"
      );
      setShippingList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleShippingRateChange = (e) => {
    setShippingRate(e.target.value);
  };

  const handleUpdateShipping = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/get-api/add-shipping-rate/${selectedProvince?.value}/${shippingRate}`
      );
      toast.success("Cập nhật phí vận chuyển thành công");
      getAllShipping();
    } catch (error) {
      toast.error("Cập nhật phí vận chuyển thất bại");
    }
  };

  return (
    <div className="container-modal-update-shipping">
      <div className="modal-update-shipping">
        <div className="close-shipping-button" onClick={onClose}>
          X
        </div>
        <div className="header-shipping mb-3">
          <h4>Cập nhật phí vận chuyển</h4>
        </div>
        <div className="d-flex gap-5">
          <div className="w-50">
            <label htmlFor="" style={{ fontSize: "18px" }}>
              Phí vận chuyển(đ):
            </label>
            <Input
              className="mt-1"
              placeholder="Type something…"
              value={shippingRate}
              onChange={handleShippingRateChange}
            />
          </div>
          <div className="w-50">
            <label htmlFor="province" style={{ fontSize: "18px" }}>
              Chọn tỉnh/thành phố
            </label>
            <Select
              className="basic-single mt-1"
              classNamePrefix="select"
              name="province"
              options={provinceOptions}
              value={selectedProvince}
              isDisabled={true}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary mt-3"
            onClick={handleUpdateShipping}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalShippingUpdate;
