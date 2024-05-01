import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ModalAddAddress = ({ onClose, listAddress, setListAddress }) => {
  const [options, setOptions] = React.useState({
    provinces: [],
    districts: [],
    wards: [],
  });
  const [selected, setSelected] = React.useState({
    province: null,
    district: null,
    ward: null,
  });
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const [isChecked, setIsChecked] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    addressDetail: "",
  });

  console.log(formValues);
  console.log(selected);

  useEffect(() => {
    axios.get(`http://localhost:8080/get-api/get-all-provinces`).then((res) => {
      setOptions((prevOptions) => ({
        ...prevOptions,
        provinces: res.data.map((province) => ({
          value: province.code,
          label: province.fullName,
        })),
      }));
    });

    if (selectedRef.current?.province) {
      axios
        .get(
          `http://localhost:8080/get-api/get-districts-by-provinces-code/${selectedRef.current.province.value}`
        )
        .then((res) => {
          setOptions((prevOptions) => ({
            ...prevOptions,
            districts: res.data.map((district) => ({
              value: district.code,
              label: district.name,
            })),
          }));
        });
    }

    if (selectedRef.current?.district) {
      axios
        .get(
          `http://localhost:8080/get-api/get-wards-by-district-code/${selectedRef.current.district.value}`
        )
        .then((res) => {
          setOptions((prevOptions) => ({
            ...prevOptions,
            wards: res.data.map((ward) => ({
              value: ward.code,
              label: ward.name,
            })),
          }));
        });
    }
  }, [selected.province, selected.district]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  console.log(isChecked);


  const handleAddAddress = async () => {
    const addressRequest = {
      customerId: localStorage.getItem("customerId"),
      provinceCode: selected?.province?.value,
      districtCode: selected?.district?.value,
      wardCode: selected?.ward?.value,
      fullName: formValues.name,
      phoneNumBer: formValues.phone,
      addressDetail: formValues.addressDetail,
    };

    console.log(addressRequest);
    try {
      const response = await axios.post(
        `http://localhost:8080/get-api/add-address/${isChecked}`,
        addressRequest
      );
      toast.success("Thêm địa chỉ thành công!");
      setListAddress();
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi thêm địa chỉ.");
    }
    onClose(true);
  };

  return (
    <div className="container-modal-addAddress">
      <div className="modal-add-address">
        <div className="close-btn-address position-absolute" onClick={onClose}>
          X
        </div>
        <div className="mt-3 ms-3">
          <p className="fs-4">Thêm địa chỉ mới</p>
        </div>
        <div className="p-3 mt-3">
          <div className="w-100 d-flex gap-4">
            <div className="mb-3" style={{ width: "45%" }}>
              <label htmlFor="name" className="form-label">
                Họ và tên:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3" style={{ width: "45%" }}>
              <label htmlFor="phone" className="form-label">
                Số điện thoại:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={formValues.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3 address">
            <div className="d-flex gap-4 mb-3">
              <div className="mb-2" style={{ width: "45%" }}>
                <label htmlFor="provinces">Thành phố:</label>
                <Select
                  id="provinces"
                  //className="form-control"
                  value={selected.province}
                  onChange={(value) =>
                    setSelected((prevSelected) => ({
                      ...prevSelected,
                      province: value,
                      district: null,
                      ward: null,
                    }))
                  }
                  options={options.provinces}
                  styles={{ backgroundColor: "red" }}
                />
              </div>
              <div className="mb-2" style={{ width: "45%" }}>
                <label htmlFor="provinces">Quận:</label>
                <Select
                  id="provinces"
                  //className="form-control"
                  value={selected.district}
                  onChange={(value) =>
                    setSelected((prevSelected) => ({
                      ...prevSelected,
                      district: value,
                      ward: null,
                    }))
                  }
                  options={options.districts}
                />
              </div>
            </div>

            <div className="d-flex gap-4">
              <div className="mb-3" style={{ width: "45%" }}>
                <label htmlFor="provinces">Phường:</label>
                <Select
                  id="provinces"
                  // className="form-control"
                  value={selected.ward}
                  onChange={(value) =>
                    setSelected((prevSelected) => ({
                      ...prevSelected,
                      ward: value,
                    }))
                  }
                  options={options.wards}
                />
              </div>
            </div>
            <div className="address-detail" style={{ width: "93%" }}>
              <label htmlFor="address" className="form-label">
                Địa chỉ cụ thể:
              </label>
              <input
                type="text"
                id="address"
                name="addressDetail"
                className="form-control"
                value={formValues.addressDetail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Đặt làm địa chỉ mặc định
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleAddAddress}>
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddAddress;
