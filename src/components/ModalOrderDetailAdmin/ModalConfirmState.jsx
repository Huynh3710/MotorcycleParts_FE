// ModalConfirmState.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalConfirmState = ({ show, handleClose, handleConfirm, tempStatusName }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận thay đổi trạng thái</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn thay đổi trạng thái sang "{tempStatusName}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmState;
