import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { routeImage } from "../../../api/apiGetImage";

const ModalDiscountDetail = ({ onClose, discountInfor, setItems, reaload }) => {
  //all spare parts discount apply
  const [allSparePart, setAllSparePart] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempItem, setTempItem] = useState();
  const [data, setData] = useState({
    code: "",
    name: "",
    description: "",
    discount: 0,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    sparePartsIds: [],
  });

  const [selectedSpareParts, setSelectedSpareParts] = useState([]);
  const [reloadData, setReloadData] = useState(false); // State để trigger việc fetch dữ liệu mới

  //list all sapre part
  const [getAllSpareParts, setGetAllSpareParts] = useState([]); // Khởi tạo data rỗng
  console.log(allSparePart);
  console.log(data);
  const handleEdit = () => {
    setIsEdit(true);
    setData(discountInfor); // Set data với thông tin khuyến mãi hiện tại
  };
  const handleSparePartsChange = (selectedOptions) => {
    setSelectedSpareParts(selectedOptions);
    setData({
      ...data,
      sparePartsIds: selectedOptions.map((option) => option.value),
    });
  };

  const handleSave = async () => {
    setIsEdit(false);
    try {
      const response = await axios.put(
        `http://localhost:8080/get-api/update-discount/${discountInfor?.id}`,
        data
      );
      console.log(response.data);
      setItems(response.data);
      setReloadData(true); // Khi gửi thành công, set lại state để trigger việc fetch dữ liệu mới
    } catch (error) {
      console.error("Error:", error);
    }
    reaload(prevState => !prevState);
  };

  useEffect(() => {
    const fetchSparePartDiscount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/get-spare-parts-by-discount/${discountInfor?.id}`
        );
        console.log(response.data);
        setSelectedSpareParts(
          response.data.map((sparePart) => ({
            value: sparePart.id,
            label: sparePart.name,
          }))
        );
        setAllSparePart(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getAllSparePart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-api/spare-parts/get-all-parts"
        );
        const data = await response.data;
        // Convert data to the format required by react-select
        const sparePartsOptions = data.map((sparePart) => ({
          value: sparePart.id,
          label: sparePart.name,
        }));
        setGetAllSpareParts(sparePartsOptions);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    getAllSparePart();
    fetchSparePartDiscount();
  }, [discountInfor, reloadData]); // Thêm state reloadData vào dependencies của useEffect

  function convertStartDate(startDate) {
    const year = startDate[0];
    const month = startDate[1];
    const day = startDate[2];
    const hour = startDate[3];
    const minute = startDate[4];

    let date1 = new Date(year, month, day, hour, minute);
    return date1.toString() === "Invalid Date"
      ? null
      : date1.toLocaleString();
  }

  return (
    <div className="container-modal-discount-detail">
      <div className="modal-discount-detail">
        <div className="close-button-discount" onClick={onClose}>
          X
        </div>
        <div>
          <h3>Chi tiết khuyến mãi</h3>
          <div className="d-flex justify-content-between mt-4 gap-5">
            {isEdit ? (
              <div className="w-50">
                <div className="form-group mb-3">
                  <label htmlFor="code" className="mb-1">
                    Mã Khuyến Mãi:{" "}
                  </label>
                  <input
                    type="text"
                    name="code"
                    className="form-control"
                    value={data?.code}
                    onChange={(e) =>
                      setData({ ...data, code: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="mb-1">
                    Tên Khuyến Mãi:{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={data?.name}
                    onChange={(e) =>
                      setData({ ...data, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description" className="mb-1">
                    Mô Tả:{" "}
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={data?.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="discount" className="mb-1">
                    Giá Trị (%):{" "}
                  </label>
                  <input
                    type="number"
                    name="discount"
                    className="form-control"
                    value={data?.discount}
                    onChange={(e) =>
                      setData({ ...data, discount: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="w-50 d-flex flex-column gap-2 px-3">
                <Form.Group>
                  <Form.Label className="mb-1">Mã khuyến mãi:</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={discountInfor?.code}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-1">Tên khuyến mãi:</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={discountInfor?.name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-1">Mô tả:</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={discountInfor?.description}
                  />
                </Form.Group>
              </div>
            )}
            {isEdit ? (
              <div className="w-50">
                <div className="form-group mb-3">
                  <label htmlFor="startDate" className="mb-1">
                    Ngày Bắt Đầu:{" "}
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    className="form-control"
                    value={data?.startDate}
                    onChange={(e) =>
                      setData({ ...data, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="endDate" className="mb-1">
                    Ngày Kết Thúc:{" "}
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    className="form-control"
                    value={data?.endDate}
                    onChange={(e) =>
                      setData({ ...data, endDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3 d-flex flex-column ">
                  <label
                    htmlFor="choseSparePart"
                    style={{ fontSize: "18px" }}
                  >
                    Chọn phụ tùng áp dụng khuyến mãi:{" "}
                  </label>
                  <Select
                    name="choseSparePart"
                    id="choseSparePart"
                    className="mt-1"
                    isMulti
                    options={getAllSpareParts}
                    value={selectedSpareParts}
                    onChange={handleSparePartsChange}
                  />
                </div>
              </div>
            ) : (
              <div className="w-50 d-flex flex-column gap-2 px-3">
                <Form.Group>
                  <Form.Label className="mb-1">Ngày bắt đầu:</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={convertStartDate(discountInfor?.startDate)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-1">Ngày kết thúc:</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={convertStartDate(discountInfor?.endDate)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-1">Giá trị:</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={`${discountInfor?.discount}%`}
                  />
                </Form.Group>
              </div>
            )}
          </div>
          {isEdit === false && (
            <div className="sparePartApply mt-3 mx-3">
              <h5>Danh sách các phụ tùng được áp dụng:</h5>
              <div className="list-product-discount">
                {allSparePart?.map((sparePart) => (
                  <div
                    key={sparePart.id}
                    className="d-flex gap-2 align-items-center product-discount mb-3 p-2"
                  >
                    <img
                      src={`${routeImage}${sparePart.id}`}
                      alt=""
                      style={{
                        width: "150px",
                        height: "100px",
                        borderRadius: "10px",
                      }}
                    />
                    <div>
                      <div className="mb-0">
                        <h5 className="mb-0 d-inline ">Tên phụ tùng: </h5>
                        {sparePart?.name}
                      </div>
                      <div className="mb-0">
                        <h5 className="mb-0 d-inline ">Giá gốc: </h5>
                        {Number(sparePart?.unitPrice).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-3 d-flex justify-content-end gap-3">
            {isEdit && (
              <button className="btn btn-success" onClick={handleSave}>
                Lưu
              </button>
            )}
            <button className="btn btn-dark me-3" onClick={handleEdit}>
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDiscountDetail;
