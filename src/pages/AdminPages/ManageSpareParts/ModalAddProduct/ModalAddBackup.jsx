import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import "./ModalAddproduct.css";

const ModalAddproduct = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unitPrice: 0,
    image: null,
    weight: 0,
    size: "",
    wattage: "",
    voltage: "",
    year: 0,
    origin: "",
    inventory: 0,
    status: "Còn hàng",
    carNames: "",
    carYear: "",
    sparePartsType: {
      id: "",
    },
    brandParts: {
      id: "",
    },
    carBrands: {
      id: "",
    },
  });

  const validateFormData = () => {
    const {
      name,
      description,
      unitPrice,
      image,
      weight,
      size,
      wattage,
      voltage,
      year,
      origin,
      inventory,
      status,
      carNames,
      sparePartsType,
      brandParts,
      carBrands,
    } = formData;

    // Kiểm tra các trường bắt buộc
    if (
      !name ||
      !description ||
      !unitPrice ||
      !image ||
      !weight ||
      !size ||
      !wattage ||
      !voltage ||
      !year ||
      !origin ||
      !inventory ||
      !status ||
      !carNames ||
      !sparePartsType.id ||
      !brandParts.id ||
      !carBrands.id
    ) {
      return false;
    }

    return true;
  };

  // console.log(formData);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [optionsType, setOptionsType] = useState([]);
  const [optionsBrand, setOptionsBrand] = useState([]);
  const [optionsCarBrand, setOptionsCarBrand] = useState([]);
  const [selectedCarNames, setSelectedCarNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  console.log(formData);
  useEffect(() => {
    // Fetch loại phụ tùng
    axios
      .get(
        "http://localhost:8080/get-api/spares-parts-type/get-all-spare-parts-type"
      )
      .then((response) => {
        setOptionsType(
          response.data.map((value) => {
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
        setSelectedOption(
          response.data.map((value) => {
            return { value: value.id, label: value.name };
          })
        );
      })
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      if (
        name === "sparePartsType" ||
        name === "brandParts" ||
        name === "carBrands"
      ) {
        setFormData({
          ...formData,
          [name]: {
            id: value,
          },
        });
      } else if (name === "carNames") {
        setFormData({
          ...formData,
          [name]: value.split(","),
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  const handleCarNamesChange = (selectedOptions) => {
    const carNames = selectedOptions.map((option) => option.label); // Lấy danh sách các giá trị đã chọn
    setSelectedCarNames(selectedOptions); // Cập nhật trạng thái đã chọn
    setFormData({
      ...formData,
      carNames: carNames,
    });
  };

  const handleAddProduct = () => {
    if (!validateFormData()) {
      setErrorModalIsOpen(true);
      setErrorMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    form.append("image", formData.image);
    form.append("sparePartsTypeId", formData.sparePartsType.id);
    form.append("brandPartsId", formData.brandParts.id);
    form.append("carBrandId", formData.carBrands.id);

    axios
      .post("http://localhost:8080/get-api/spares-parts-type/create", form)
      .then((response) => {
        console.log(response.data);
        setSuccessModalIsOpen(true);
      })
      .catch((error) => {
        console.error("Lỗi:", error.response.data);
        setErrorMessage(error.response.data);
        setErrorModalIsOpen(true);
      });
  };

  return (
    <div className="container-modal-add">
      <div className="modal-add p-4">
        <div className="close" onClick={onClose}>
          X
        </div>
        <div className="mb-4">
          <h4>Thêm sản phẩm</h4>
        </div>
        <div className="content-modal-add d-flex justify-content-around">
          <div className="modal-add-left d-flex flex-column">
            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Tên sản phẩm:{" "}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="unitPrice" style={{ fontSize: "18px" }}>
                Đơn giá {"(Đơn vị VNĐ)"}:
              </label>
              <input
                type="number"
                name="unitPrice"
                id="unitPrice"
                className="mt-1"
                value={formData.unitPrice}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="weight" style={{ fontSize: "18px" }}>
                Trọng lượng {"(Đơn vị Kg)"}:
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                className="mt-1"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="status" style={{ fontSize: "18px" }}>
                Trạng thái:{" "}
              </label>
              <select
                name="status"
                id="status"
                className="mt-1"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </select>
            </div>
            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="description" style={{ fontSize: "18px" }}>
                Mô tả:{" "}
              </label>
              <textarea
                name="description"
                id="description"
                className="mt-1"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-add-midle">
            <div className="mb-3 d-flex flex-column ">
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="wattage" style={{ fontSize: "18px" }}>
                  Công xuất {"(Đơn vị W)"}:
                </label>
                <input
                  type="number"
                  name="wattage"
                  id="wattage"
                  className="mt-1"
                  value={formData.wattage}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="voltage" style={{ fontSize: "18px" }}>
                  Điện áp {"(Đơn vị V)"}:
                </label>
                <input
                  type="number"
                  name="voltage"
                  id="voltage"
                  className="mt-1"
                  value={formData.voltage}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="size" style={{ fontSize: "18px" }}>
                  Kích thước:{" "}
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  className="mt-1"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="inventory" style={{ fontSize: "18px" }}>
                  Tồn kho:{" "}
                </label>
                <input
                  type="number"
                  name="inventory"
                  id="inventory"
                  className="mt-1"
                  value={formData.inventory}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="year" style={{ fontSize: "18px" }}>
                  Năm sản xuất:{" "}
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  className="mt-1"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label htmlFor="origin" style={{ fontSize: "18px" }}>
                  Quốc gia:{" "}
                </label>
                <input
                  type="text"
                  name="origin"
                  id="origin"
                  className="mt-1"
                  value={formData.origin}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-add-right">
            <div className="d-flex">
              <div className="mb-3 d-flex align-items-center gap-3">
                <label htmlFor="image" style={{ fontSize: "18px" }}>
                  Ảnh:{" "}
                </label>
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Product"
                    style={{ width: "150px" }}
                  />
                ) : (
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="mt-1"
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>

            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="sparePartsType" style={{ fontSize: "18px" }}>
                Loại phụ tùng:{" "}
              </label>

              <Select
                name="sparePartsType"
                id="sparePartsType"
                className="mt-1"
                value={optionsType.find(
                  (option) => option.value === formData.sparePartsType.id
                )}
                onChange={(selectedOption) =>
                  handleChange({
                    target: {
                      value: selectedOption.value,
                      name: "sparePartsType",
                    },
                  })
                }
                options={optionsType}
              />
            </div>

            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="brandParts" style={{ fontSize: "18px" }}>
                Hãng phụ tùng:{" "}
              </label>

              <Select
                name="brandParts"
                id="brandParts"
                className="mt-1"
                value={optionsBrand.find(
                  (option) => option.value === formData.brandParts.id
                )}
                onChange={(selectedOption) =>
                  handleChange({
                    target: { value: selectedOption.value, name: "brandParts" },
                  })
                }
                options={optionsBrand}
              />
            </div>

            <div className="mb-3 d-flex flex-column ">
              <label htmlFor="carBrands" style={{ fontSize: "18px" }}>
                Hãng xe:{" "}
              </label>

              <Select
                name="carBrands"
                id="carBrands"
                className="mt-1"
                value={optionsCarBrand.find(
                  (option) => option.value === formData.carBrands.id
                )}
                onChange={(selectedOption) =>
                  handleChange({
                    target: { value: selectedOption.value, name: "carBrands" },
                  })
                }
                options={optionsCarBrand}
              />
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="carNames" style={{ fontSize: "18px" }}>
                Tên loại xe:
              </label>
              <Select
                isMulti
                name="carNames"
                id="carNames"
                className="mt-1"
                value={selectedCarNames} // Sử dụng giá trị đã chọn từ trạng thái
                onChange={handleCarNamesChange} // Sử dụng handler mới
                options={selectedOption} // Sử dụng dữ liệu từ modal test
              />
            </div>
          </div>
        </div>
        <button className="btn-add-product" onClick={handleAddProduct}>
          Thêm Sản Phẩm
        </button>
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
            Thêm sản phẩm thành công
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Đã thêm sản phẩm!</Modal.Body>
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

export default ModalAddproduct;
