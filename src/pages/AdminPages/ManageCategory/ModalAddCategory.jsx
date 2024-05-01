import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const ModalAddCategory = ({ onClose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [successModal, setSuccessModal] = useState(false); // State để điều khiển modal thành công
  const [failureModal, setFailureModal] = useState(false); // State để điều khiển modal thất bại

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8080/get-api/brand-parts/add-brands-part",
        formData
      );

      // Kiểm tra xem phản hồi từ server có dữ liệu hay không
      if (response.data) {
        setMessage("Thêm Brand Parts thành công.");
        setSuccessModal(true); // Hiển thị modal thành công
      } else {
        setMessage("Hãng phụ tùng đã tồn tại.");
        setFailureModal(true); // Hiển thị modal thất bại
      }
    } catch (error) {
        setMessage("Hãng phụ tùng đã tồn tại.");
        setFailureModal(true); // Hiển thị modal thất bại
      console.error("Lỗi:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  return (
    <div className="container-modal-add-category">
      <div className="modal-add-category">
        <div className="close-button-catagory" onClick={onClose}>
          X
        </div>
        <div className="modal-add-category-header mb-3">
          <h3>Thêm Danh Mục</h3>
        </div>
        <div className="modal-add-category-body">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="mb-2">
                Tên Danh Mục:{" "}
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
        show={successModal} // Hiển thị modal thành công khi successModal là true
        onHide={() => setSuccessModal(false)} // Ẩn modal khi click nút close
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
        show={failureModal} // Hiển thị modal thất bại khi failureModal là true
        onHide={() => setFailureModal(false)} // Ẩn modal khi click nút close
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

export default ModalAddCategory;
