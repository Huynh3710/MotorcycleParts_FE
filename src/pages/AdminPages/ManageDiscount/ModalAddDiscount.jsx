import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ModalAddDiscount = ({ onClose }) => {
  //   const [name, setName] = useState("");
  //   const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);
  const [allSparePart, setAllSparePart] = useState();
  const [selectedSpareParts, setSelectedSpareParts] = useState([]);
  const [data, setData] = useState({
    code: "",
    name: "",
    description: "",
    discount: 0,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    sparePartsIds: [],
  });

  console.log(data);

  useEffect(() => {
    const fetchSparePart = async () => {
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
        setAllSparePart(sparePartsOptions);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchSparePart();
  }, []);

  const handleSparePartsChange = (selectedOptions) => {
    setSelectedSpareParts(selectedOptions);
    setData({
      ...data,
      sparePartsIds: selectedOptions.map((option) => option.value),
    });
  };

  const handleChange = (e) => {
    
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (new Date(data.endDate) <= new Date()) {
      toast.error("Ngày kết thúc phải ở tương lai.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/get-api/create-discount",
        data
      );
      if (response.data) {
        setMessage("Thêm khuyến mãi thành công.");
        setSuccessModal(true);
      } else {
        setMessage("Khuyến mãi đã tồn tại.");
        setFailureModal(true);
      }
    } catch (error) {
      setMessage("Khuyến mãi đã tồn tại.");
      setFailureModal(true);
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="container-modal-add-discount">
      <div className="modal-add-discount">
        <div className="close-button-discount" onClick={onClose}>
          X
        </div>
        <div className="modal-add-discount-header mb-3">
          <h3>Thêm Khuyến Mãi</h3>
        </div>
        <div className="modal-add-discount-body">
          <form onSubmit={handleFormSubmit}>
            <div className="d-flex gap-3 justify-content-around">
              <div className="w-50">
                <div className="form-group mb-3">
                  <label htmlFor="code" className="mb-1">
                    Mã Khuyến Mãi:{" "}
                  </label>
                  <input
                    type="text"
                    name="code"
                    className="form-control"
                    value={data.code}
                    onChange={handleChange}
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
                    value={data.name}
                    onChange={handleChange}
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
                    value={data.description}
                    onChange={handleChange}
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
                    value={data.discount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="w-50">
                <div className="form-group mb-3">
                  <label htmlFor="startDate" className="mb-1">
                    Ngày Bắt Đầu:{" "}
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    className="form-control"
                    value={data.startDate}
                    onChange={handleChange}
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
                    value={data.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 d-flex flex-column ">
                  <label htmlFor="choseSparePart" style={{ fontSize: "18px" }}>
                    Chọn phụ tùng áp dụng khuyến mãi:{" "}
                  </label>
                  <Select
                    name="choseSparePart"
                    id="choseSparePart"
                    className="mt-1"
                    isMulti
                    value={selectedSpareParts}
                    options={allSparePart}
                    onChange={handleSparePartsChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal show={successModal} onHide={() => setSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thành Công</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setSuccessModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={failureModal} onHide={() => setFailureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thất Bại</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setFailureModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddDiscount;
