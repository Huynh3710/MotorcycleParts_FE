import React, { useEffect, useState } from "react";
import { routeImage } from "../../../../api/apiGetImage";
import "./ModalProductDetail.css";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Button, Modal } from "react-bootstrap";

const ModalProductDetail = ({ onClose, item }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState(
    item || {
      name: "",
      unitPrice: "",
      weight: "",
      description: "",
      size: "",
      inventory: "",
      year: "",
      origin: "",
      status: "",
      sparePartsType: {},
      brandParts: {},
      brandMotor: {},
      carNamesString: "",
      selectedOptions: [],
    }
  );

  const [optionsType, setOptionsType] = useState([]);
  const [optionsBrand, setOptionsBrand] = useState([]);
  const [optionsCarBrand, setOptionsCarBrand] = useState([]);

  const [optionsCarNames, setOptionsCarNames] = useState([]);

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(data);

  useEffect(() => {
    // Fetch loại phụ tùng

    axios
      .get(
        `http://localhost:8080/get-api/spare-parts/get-motor-types-by-spare-parts-id=${data.id}`
      )
      .then((response) => {
        console.log(response.data);
        setData({
          ...data,
          carNamesString: response.data.map((value) => value.name).join(", "),
        });
      })
      .catch((error) => {
        console.error("Lỗi khi fetch loại phụ tùng:", error);
      });

    axios
      .get(
        "http://localhost:8080/get-api/spares-parts-type/get-all-spare-parts-type"
      )
      .then((response) => {
        setOptionsType(
          response?.data.map((value) => {
            return { value: value.id, label: value.name };
          })
        );
      })
      .catch((error) => {
        console.error("Lỗi khi fetch loại phụ tùng:", error);
      });

    // Fetch hãng phụ tùng
    axios
      .get("http://localhost:8080/get-api/brand-parts/get-all-brand-parts")
      .then((response) => {
        setOptionsBrand(
          response.data.map((value) => {
            return { value: value.id, label: value.name };
          })
        );
      })
      .catch((error) => {
        console.error("Lỗi khi fetch hãng phụ tùng:", error);
      });

    // Fetch hãng xe
    axios
      .get("http://localhost:8080/get-api/get-all-brand-motor")
      .then((response) => {
        setOptionsCarBrand(
          response.data.map((value) => {
            return { value: value.id, label: value.name };
          })
        );
      })
      .catch((error) => {
        console.error("Lỗi khi fetch hãng xe:", error);
      });

    axios
      .get("http://localhost:8080/get-api/get-all-motor-type")
      .then((response) => {
        setOptionsCarNames(
          response.data.map((value) => {
            return { value: value.id, label: value.name };
          })
        );
      });
  }, []);
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleChange = (selectedOptions) => {
    // Lưu trữ các tùy chọn đã chọn
    setData({ ...data, selectedOptions });

    // Tạo chuỗi nhãn
    const labels = selectedOptions.map((option) => option.label).join(", ");
    setData({ ...data, carNamesString: labels });
  };

  const handleEdit = () => {
    setReadOnly(false);
  };

  const cancleEdit = () => {
    setReadOnly(true);
  };

  // console.log(data.carNamesString);

  const handleSave = async () => {
    if (
      !data.name ||
      !data.unitPrice ||
      !data.weight ||
      !data.description ||
      !data.size ||
      !data.inventory ||
      !data.year ||
      !data.origin ||
      !data.status ||
      !data.sparePartsType ||
      !data.brandParts ||
      !data.brandMotor.name ||
      !data.carNamesString
    ) {
      setErrorModalIsOpen(true);
      setErrorMessage("Vui lòng nhập đầy đủ thông tin sản phẩm");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("description", data?.description);
      formData.append("unitPrice", data?.unitPrice);
      formData.append("weight", data?.weight);
      formData.append("size", data?.size);
      formData.append("wattage", data?.wattage);
      formData.append("voltage", data?.voltage);
      formData.append("year", data?.year);
      formData.append("origin", data?.origin);
      formData.append("inventory", data?.inventory);
      formData.append("status", data?.status);
      formData.append("carNames", data?.carNamesString);
      formData.append("sparePartsTypeId", data?.sparePartsType.id);
      formData.append("brandPartsId", data?.brandParts.id);
      formData.append("carBrandId", data?.brandMotor.id);

      // Thêm ảnh vào formData nếu có
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // Gửi request PUT đến server
      const response = await axios.put(
        `http://localhost:8080/get-api/spares-parts-type/update/${data?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setSuccessModalIsOpen(true);
      setReadOnly(true);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  return (
    <div className="conatainer-modal-product-detail">
      <div className="modal-product-detail">
        <div className="close" onClick={onClose}>
          X
        </div>
        <div className="content-modal-product-detail p-3">
          <h4>Chi Tiết Sản Phẩm</h4>
          <div className="d-flex justify-content-around">
            <div className="modal-product-detail-left d-flex flex-column">
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="nameProduct" style={{ fontSize: "18px" }}>
                  Tên sản phẩm:{" "}
                </label>
                <input
                  type="text"
                  name="nameProduct"
                  id="nameProduct"
                  className="mt-1"
                  value={data?.name}
                  readOnly={readOnly}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>

              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="unitPice" style={{ fontSize: "18px" }}>
                  Đơn Giá:{" "}
                </label>
                <input
                  type="text"
                  name="unitPice"
                  id="unitPice"
                  className="mt-1"
                  value={data?.unitPrice}
                  readOnly={readOnly}
                  onChange={(e) =>
                    setData({ ...data, unitPrice: e.target.value })
                  }
                />
              </div>

              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="weight" style={{ fontSize: "18px" }}>
                  Trọng lượng:{" "}
                </label>
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  className="mt-1"
                  value={data?.weight}
                  readOnly={readOnly}
                  onChange={(e) => setData({ ...data, weight: e.target.value })}
                />
              </div>

              {readOnly ? (
                <div className="mb-3 d-flex flex-column">
                  <label htmlFor="status" style={{ fontSize: "18px" }}>
                    Trạng Thái:
                  </label>
                  <input
                    type="text"
                    name="status"
                    id="status"
                    className="mt-1"
                    value={data?.status}
                    readOnly={readOnly}
                    onChange={(e) =>
                      setData({ ...data, status: e.target.value })
                    }
                  />
                </div>
              ) : (
                <div className="mb-3 d-flex flex-column">
                  <label htmlFor="status" style={{ fontSize: "18px" }}>
                    Trạng Thái:
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="mt-1"
                    value={data?.status}
                    readOnly={readOnly}
                    onChange={(e) =>
                      setData({ ...data, status: e.target.value })
                    }
                  >
                    <option value="Còn hàng">Còn hàng</option>
                    <option value="Hết hàng">Hết hàng</option>
                  </select>
                </div>
              )}

              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="description" style={{ fontSize: "18px" }}>
                  Mô tả:{" "}
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className="mt-1"
                  value={data?.description}
                  readOnly={readOnly}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-product-detail-midle">
              {data?.wattage !== null && data?.wattage !== undefined && (
                <div className="mb-3 d-flex flex-column">
                  <label htmlFor="wattage" style={{ fontSize: "18px" }}>
                    Công suất:
                  </label>
                  <input
                    type="text"
                    name="wattage"
                    id="wattage"
                    className="mt-1"
                    value={data?.wattage}
                    readOnly={readOnly}
                    onChange={(e) =>
                      setData({ ...data, wattage: e.target.value })
                    }
                  />
                </div>
              )}

              {data?.voltage !== null && data?.voltage !== undefined && (
                <div className="mb-3 d-flex flex-column">
                  <label htmlFor="voltage" style={{ fontSize: "18px" }}>
                    Điện áp:
                  </label>
                  <input
                    type="text"
                    name="voltage"
                    id="voltage"
                    className="mt-1"
                    value={data?.voltage}
                    readOnly={readOnly}
                    onChange={(e) =>
                      setData({ ...data, voltage: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="size" style={{ fontSize: "18px" }}>
                  Kích thước:{" "}
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  className="mt-1"
                  value={data?.size}
                  readOnly={readOnly}
                  onChange={(e) => setData({ ...data, size: e.target.value })}
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="inventory" style={{ fontSize: "18px" }}>
                  Tồn kho:
                </label>
                <input
                  type="text"
                  name="inventory"
                  id="inventory"
                  className="mt-1"
                  value={data?.inventory}
                  readOnly={readOnly}
                  onChange={(e) =>
                    setData({ ...data, inventory: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="year" style={{ fontSize: "18px" }}>
                  Năm sản xuất:
                </label>
                <input
                  type="text"
                  name="year"
                  id="year"
                  className="mt-1"
                  value={data?.year}
                  readOnly={readOnly}
                  onChange={(e) => setData({ ...data, year: e.target.value })}
                />
              </div>

              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="origin" style={{ fontSize: "18px" }}>
                  Quốc gia:
                </label>
                <input
                  type="text"
                  name="origin"
                  id="origin"
                  className="mt-1"
                  value={data?.origin}
                  readOnly={readOnly}
                  onChange={(e) => setData({ ...data, origin: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-product-detail-right">
              {readOnly ? (
                <div className="mb-3 d-flex align-items-center gap-3">
                  <div>
                    <label htmlFor="image" style={{ fontSize: "18px" }}>
                      Ảnh:
                    </label>
                  </div>
                  <img
                    src={`${routeImage}${data?.id}`}
                    alt=""
                    style={{ width: "150px" }}
                  />
                </div>
              ) : (
                <div className="mb-3 d-flex flex-column gap-3">
                  <div>
                    <label htmlFor="image">Ảnh: </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="mt-1"
                      onChange={handleImageChange}
                    />
                  </div>
                  {selectedImage && (
                    <img
                      style={{ width: "150px" }}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                    />
                  )}
                </div>
              )}

              {readOnly ? (
                <div className="mb-3 d-flex flex-column ">
                  <label htmlFor="type" style={{ fontSize: "18px" }}>
                    Loại phụ tùng:
                  </label>
                  <input
                    type="text"
                    name="sparePartsType"
                    id="sparePartsType"
                    className="mt-1"
                    value={data?.sparePartsType?.name}
                    readOnly={readOnly}
                  />
                </div>
              ) : (
                <div className="mb-3 d-flex flex-column ">
                  <label htmlFor="sparePartsType" style={{ fontSize: "18px" }}>
                    Loại phụ tùng:{" "}
                  </label>

                  <CreatableSelect
                    name="sparePartsType"
                    id="sparePartsType"
                    className="mt-1"
                    value={optionsType.find(
                      (option) => option.value === data?.sparePartsType?.id
                    )}
                    onChange={(selectedOption) =>
                      setData({
                        ...data,
                        sparePartsType: {
                          id: selectedOption.value,
                          name: selectedOption.label,
                        },
                      })
                    }
                    options={optionsType}
                  />
                </div>
              )}

              <div className="mb-3 d-flex flex-column">
                <label htmlFor="brandParts" style={{ fontSize: "18px" }}>
                  Hãng phụ tùng:
                </label>
                {readOnly ? (
                  <input
                    type="text"
                    name="brandParts"
                    id="brandParts"
                    className="mt-1"
                    value={data?.brandParts?.name}
                    readOnly={readOnly}
                  />
                ) : (
                  <Select
                    name="brandParts"
                    id="brandParts"
                    className="mt-1"
                    value={optionsBrand.find(
                      (option) => option.value === data?.brandParts?.id
                    )}
                    onChange={(selectedOption) =>
                      setData({
                        ...data,
                        brandParts: {
                          id: selectedOption.value,
                          name: selectedOption.label,
                        },
                      })
                    }
                    options={optionsBrand}
                  />
                )}
              </div>

              <div className="mb-3 d-flex flex-column">
                <label htmlFor="carBrand" style={{ fontSize: "18px" }}>
                  Hãng xe:
                </label>
                {readOnly ? (
                  <input
                    type="text"
                    name="carBrand"
                    id="carBrand"
                    className="mt-1"
                    value={
                      data?.brandMotor?.name
                        ? data?.brandMotor?.name
                        : data?.brandMotor
                    }
                    readOnly={readOnly}
                  />
                ) : (
                  <CreatableSelect
                    name="carBrands"
                    id="carBrands"
                    className="mt-1"
                    value={optionsCarBrand.find(
                      (option) => option.value === data?.brandMotor?.id
                    )}
                    onChange={(selectedOption) =>
                      setData({
                        ...data,
                        brandMotor: {
                          id: selectedOption?.value,
                          name: selectedOption?.label,
                        },
                      })
                    }
                    options={optionsCarBrand}
                    isClearable
                  />
                )}
              </div>

              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="carNamesString" style={{ fontSize: "18px" }}>
                  Tên loại xe:
                </label>
                {readOnly ? (
                  <input
                    type="text"
                    name="carNamesString"
                    id="carNamesString"
                    className="mt-1"
                    value={data?.carNamesString}
                    readOnly={true}
                    onChange={(e) =>
                      setData({ ...data, carNamesString: e.target.value })
                    }
                  />
                ) : (
                  <CreatableSelect
                    isMulti
                    name="carNamesString"
                    id="carNamesString"
                    options={optionsCarNames}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    value={data?.selectedOptions} // Sử dụng các tùy chọn đã chọn
                    isDisabled={readOnly}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="button-modal-detai d-flex align-items-center gap-3">
          {readOnly !== true && (
            <div className="d-flex align-items-center gap-3">
              <button className="save-btn-modal-detail" onClick={handleSave}>
                Lưu
              </button>
              <button className="cancle-btn-modal-detail" onClick={cancleEdit}>
                Hủy
              </button>
            </div>
          )}
          <button className="edit-btn-modal-detail" onClick={handleEdit}>
            Chỉnh sửa
          </button>
        </div>
      </div>
      <Modal show={errorModalIsOpen} onHide={() => setErrorModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Lỗi!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setErrorModalIsOpen(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={successModalIsOpen}
        onHide={() => setSuccessModalIsOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>
            Cập nhật thông tin thành công
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Đã cập nhật thông tin sản phẩm!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSuccessModalIsOpen(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalProductDetail;
