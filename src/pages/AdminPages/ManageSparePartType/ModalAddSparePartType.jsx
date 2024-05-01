import React, { useState } from "react";
import axios from "axios";  
import { Modal, Button } from "react-bootstrap";

const ModalAddSparePartType = ({ onClose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8080/get-api/spare-parts/add-spare-parts-type",
        formData
      );

      if (response.data) {
        setMessage("Thêm loại phụ tùng thành công.");
        setSuccessModal(true);
      } else {
        setMessage("Loại phụ tùng đã tồn tại.");
        setFailureModal(true);
      }
    } catch (error) {
      setMessage("Lỗi khi thêm loại phụ tùng.");
      setFailureModal(true);
      console.error("Lỗi:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  return (
    <div className="container-modal-add-spare-part-type">
      <div className="modal-add-spare-part-type">
        <div className="close-button-spare-part" onClick={onClose}>
          X
        </div>
        <div className="modal-add-spare-part-type-header mb-3">
          <h3>Thêm Loại Phụ Tùng</h3>
        </div>
        <div className="modal-add-spare-part-type-body">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="mb-2">
                Tên Loại Phụ Tùng:{" "}
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group d-flex align-items-center gap-2">
              <label htmlFor="image" className="">
                Hình Ảnh:{" "}
              </label>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{
                    marginTop: "10px",
                    maxWidth: "50%",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <input
                  type="file"
                  id="image"
                  className="form-control w-50"
                  onChange={handleImageChange}
                  required
                />
              )}
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        show={successModal}
        onHide={() => setSuccessModal(false)}
      >
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

      <Modal
        show={failureModal}
        onHide={() => setFailureModal(false)}
      >
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

export default ModalAddSparePartType;
