import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { routeImage } from "../../../api/apiGetImage";
const ModalDiscountDetail = ({ onClose, discountInfor }) => {
  const [allSparePart, setAllSparePart] = useState();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:8080/get-api/get-spare-parts-by-discount/${discountInfor?.id}`
        )
        .then((response) => {
          console.log(response.data);
          setAllSparePart(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [discountInfor]);

  function convertStartDate(startDate) {
    const year = startDate[0];
    const month = startDate[1];
    const day = startDate[2];
    const hour = startDate[3];
    const minute = startDate[4];

    let date1 = new Date(year, month, day, hour, minute);
    return date1.toString() === "Invalid Date" ? null : date1.toLocaleString();
  }
  if (discountInfor?.startDate) {
    convertStartDate(discountInfor?.startDate);
  }

  return (
    <div className="container-modal-discount-detail">
      <div className="modal-discount-detail">
        <div className="close-button-discount" onClick={onClose}>
          X
        </div>
        <div>
          <h3>Chi tiết khuyến mãi</h3>
          <div className="d-flex justify-content-between mt-4">
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
          </div>
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
                    <p className="mb-0"><h6 className="mb-0 d-inline ">Tên phụ tùng: </h6>{sparePart?.name}</p>
                    <p className="mb-0"><h6 className="mb-0 d-inline ">Giá gốc: </h6>{Number(sparePart?.unitPrice).toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <button className="btn btn-dark me-3">Chỉnh sửa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDiscountDetail;
