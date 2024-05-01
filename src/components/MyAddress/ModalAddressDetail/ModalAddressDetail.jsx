import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ModalAddressDetail = ({ onClose, itemAddress, setListAddress }) => {
  const { fullName, phoneNumBer, address, province, district, ward } =
    itemAddress;

  const [options, setOptions] = React.useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  // const [isChecked, setIsChecked] = useState(itemAddress.default);

  const [formValues, setFormValues] = useState({
    name: fullName,
    phone: phoneNumBer,
    addressDetail: address,
  });

  const defaultProvince = { label: province, value: province?.code };
  const defaultDistrict = { label: district, value: district?.code };
  const defaultWard = { label: ward, value: ward };

  const [selected, setSelected] = React.useState({
    province: defaultProvince,
    district: defaultDistrict,
    ward: defaultWard,
  });

  const selectedRef = useRef(selected);
  selectedRef.current = selected;

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

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const handleSaveAddress = async () => {

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
      const response = await axios.put(
        `http://localhost:8080/get-api/update-address/${itemAddress.id}`,
        addressRequest
      );
      toast.success("Thay đổi thông tin thành công!");
      setListAddress();
      console.log(response.data);
      onClose(true);
    } catch (error) {
      console.log(error);
      toast.error("Vui lòng cập nhật lại thành phố.");
    }
   
  };

  // console.log("formValues: ", formValues);
  // console.log("selected: ", selected);
  // console.log("isChecked: ", isChecked);

  return (
    <div className="container-modal-address-detail">
      <div className="modal-address-detail">
        <div className="close-btn-address position-absolute" onClick={onClose}>
          X
        </div>
        <div className="mt-3 ms-3">
          <p className="fs-4">Chỉnh sửa thông tin địa chỉ</p>
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

          <div className="d-flex gap-4 mb-3">
            <div style={{ width: "45%" }}>
              <label htmlFor="provinces">Thành phố:</label>
              <Select
                id="provinces"
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
              />
            </div>
            <div style={{ width: "45%" }}>
              <label htmlFor="districts">Quận:</label>
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
          <div className="mb-3" style={{ width: "45%" }}>
            {" "}
            <label htmlFor="wards">Phường:</label>
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

          <div className="" style={{ width: "94%" }}>
            <label htmlFor="address" className="form-label">
              Địa chỉ cụ thể:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={formValues.addressDetail}
              onChange={handleChange}
            />
          </div>
          {/* <div className="form-check mt-3">
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
          </div> */}
          <div className="mt-3 d-flex pe-3 justify-content-end gap-2">
            <button className="btn btn-success" onClick={handleSaveAddress}>Lưu</button>
            <button className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddressDetail;
