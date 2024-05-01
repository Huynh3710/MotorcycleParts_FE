import React, { useState } from "react";
import { routeImageBrandParts } from "../../../api/apiGetImage";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";

const ModalCategoryDetail = ({ onClose, item }) => {
  const [editMode, setEditMode] = useState(false);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalFailure, setIsShowModalFailure] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedImage, setEditedImage] = useState(item.image);
  const [imageFile, setImageFile] = useState(null);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedName);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const response = await axios.put(
        `http://localhost:8080/get-api/brand-parts/update-brand-parts/${item.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsShowModalSuccess(true);
    } catch (error) {
      setIsShowModalFailure(true);
    }
    setEditMode(false);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleImageChange = (e) => {
    setEditedImage(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="container-modal-category-detail">
      <div className="modal-category-detail p-3">
        <div className="close-button-catagory" onClick={onClose}>
          X
        </div>
        <h4>Chỉnh Sửa Danh Mục</h4>
        <div className="mb-3">
          <label htmlFor="name" className="mb-2">
            Tên Danh Mục:{" "}
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={editedName}
            onChange={handleNameChange}
            readOnly={!editMode}
            required
          />
        </div>
        {editMode && ( // Chỉ hiển thị input để thêm ảnh khi đang trong chế độ chỉnh sửa
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="image">Hình Ảnh: </label>
            {/* <input
              type="file"
              id="image"
              className="form-control w-50"
              onChange={handleImageChange}
              required={editMode}
            /> */}
            {editedImage &&
              (imageFile ? (
                <img
                  src={editedImage}
                  alt={editedName}
                  style={{ width: "150px", borderRadius: "5px" }}
                />
              ) : (
                <input
                  type="file"
                  id="image"
                  className="form-control w-50"
                  onChange={handleImageChange}
                  required={editMode}
                />
              ))}
          </div>
        )}
        {!editMode && ( // Chỉ hiển thị ảnh khi không trong chế độ chỉnh sửa
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="image">Hình Ảnh: </label>
            <img
              src={`${routeImageBrandParts}${item?.id}`}
              alt={item?.name}
              style={{ width: "150px", borderRadius: "5px" }}
            />
          </div>
        )}
        <div
          className="position-absolute "
          style={{ bottom: "10px", right: "10px" }}
        >
          {!editMode && (
            <button className="btn btn-primary me-2" onClick={handleEdit}>
              Chỉnh Sửa
            </button>
          )}
          {editMode && (
            <button
              className="btn btn-success me-2"
              onClick={handleSaveCategory}
            >
              Lưu
            </button>
          )}
          <button className="btn btn-danger" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
      <Modal
        show={isShowModalSuccess}
        onHide={() => setIsShowModalSuccess(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thành Công</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cập nhật thông tin thành công!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => setIsShowModalSuccess(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={isShowModalFailure}
        onHide={() => setIsShowModalFailure(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thất Bại</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cập nhật thất bại!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsShowModalFailure(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCategoryDetail;
