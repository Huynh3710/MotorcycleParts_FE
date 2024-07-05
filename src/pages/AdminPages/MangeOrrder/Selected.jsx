// Selected.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import useGetOrder from "../../../hooks/useGetOrder";
import ModalConfirmState from "../../../components/ModalOrderDetailAdmin/ModalConfirmState";
import ModalConfirmDelete from "../../../components/ModalOrderDetailAdmin/ModalConfirmDelete";
import ModalOrderDetail from "../../../components/ModalOrderDetailAdmin/ModalOrderDetailAdmin";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const statusOptions = [
  "PENDING",
  "CAPTURED",
  "PREPARING",
  "SHIPMENT",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

const statusOptionsName = [
  "Chờ Xác Nhận",
  "Xác Nhận",
  "Đang chuẩn bị",
  "Đang vận chuyển",
  "Đã Giao",
  "Đã Hủy",
  "Đã Hoàn Tiền",
];

const Selected = ({ item, index }) => {
  const [status, setStatus] = useState(item?.orderStatus?.status);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const [tempStatus, setTempStatus] = useState("");

  const { getUserNameById } = useGetOrder();

  console.log(item);

  useEffect(() => {
    const fetchData = async () => {
      const customerName = await getUserNameById(item.customerId);
      setCustomerName(customerName);
      setStatus(item?.orderStatus?.status);
    };
    fetchData();
  }, [item]);

  const handleSelectChange = (e) => {
    const newStatus = e.target.value;
    setTempStatus(newStatus);
    if (newStatus !== "PENDING") {
      setShowConfirmModal(true);
    } else {
      handleStatusChange(newStatus);
    }
  };

  const handleStatusChange = (newStatus) => {
    const statusList = ["PREPARING", "SHIPMENT", "DELIVERED"];
    if (statusList.includes(newStatus)) {
      axios
        .put(
          `http://localhost:8080/api/v1/user-payment/orders/${item.orderCode}/${item.orderStatus.id}/${newStatus}`
        )
        .then(() => {
          setShowConfirmModal(false);
        })
        .catch((error) => {
          console.error("Lỗi khi thay đổi trạng thái:", error);
        });
    } else {
      switch (newStatus) {
        case "CAPTURED":
          axios
            .post(
              `http://localhost:8080/api/v1/user-payment/orders/${item.orderCode}/CAPTURED`
            )
            .then(() => {
              setShowConfirmModal(false);
            })
            .catch((error) => {
              console.error("Lỗi khi thay đổi trạng thái:", error);
            });
          break;
        case "REFUNDED":
          break;
        default:
      }
    }
    setStatus(newStatus);
    setShowConfirmModal(false);
  };

  const refunded = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/user-payment/orders/${item.captureId}/REFUNDED`
      );
      toast.success("Hoàn tiền thành công");
      console.log(response.data);
      setStatus("REFUNDED"); // Cập nhật trạng thái sau khi hoàn tiền thành công
    } catch (error) {
      console.error("Lỗi khi hoàn tiền:", error);
    }
  };

  const handleDeleteOrder = () => {
    axios
      .delete(
        `http://localhost:8080/api/v1/user-payment/orders/${item.orderCode}`
      )
      .then(() => {
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Lỗi khi xóa đơn hàng:", error);
      });
  };
  const tempStatusName = statusOptionsName[statusOptions.indexOf(tempStatus)];

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.orderCode}</td>
      <td>{new Date(Number(item.orderDate)).toLocaleString()}</td>
      <td>{customerName}</td>
      <td>{Number(item.amountPrice).toLocaleString("vi-VN")}đ</td>
      <td className="d-flex">
        <div className="d-flex gap-1 justify-content-end">
          <div className="">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleSelectChange}
              value={"status"}
            >
              {statusOptions.map((option, index) => (
                <option
                  key={option}
                  value={option}
                  disabled={statusOptions.indexOf(status) > index}
                >
                  {statusOptionsName[index]}
                </option>
              ))}
            </select>
          </div>
          <div className="view-detail">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setShowEditModal(true);
              }}
            >
              Chi tiết
            </button>
            {status &&
              status !== "PENDING" &&
              status !== "DELIVERED" &&
              status !== "CANCELLED" &&
              status !== "REFUNDED" && (
                <button
                  type="button"
                  className="btn btn-outline-danger ms-1"
                  onClick={refunded}
                >
                  Hủy Đơn
                </button>
              )}
          </div>
        </div>
      </td>
      <ModalConfirmState
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        // handleConfirm={() => handleStatusChange(status)}
        handleConfirm={() => handleStatusChange(tempStatus)}
        tempStatusName={tempStatusName}
      />
      <ModalConfirmDelete
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeleteOrder}
      />
      {showEditModal && (
        <ModalOrderDetail
          setShowEditModal={setShowEditModal}
          item={item}
          tempStatusName={status}
        />
      )}
    </tr>
  );
};

export default Selected;
