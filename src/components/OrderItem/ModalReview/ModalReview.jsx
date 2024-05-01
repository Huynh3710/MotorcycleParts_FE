import React, { useEffect, useState } from "react";
import axios from "axios";
import { routeImage } from "../../../api/apiGetImage";
import { Modal, Button } from "react-bootstrap";
import "./ModalReview.css";
import { StartRating } from "../../../components/StartRating/StartRating";
import useReview from "../../../hooks/useReview";

const ModalReview = ({ handleCloseReviews, order }) => {
  const { getReviewBySparePartIdAndCusId } = useReview();
  // console.log(getReviewBySparePartIdAndCusId);
  // const [hasPreviousReview, setHasPreviousReview] = useState(false);
  
  const [formData, setFormData] = useState({
    ratings: {},
    reviewContents: {},
    errorModalIsOpen: false,
    errorMessage: "",
    successModalIsOpen: false,
    successMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const customerId = localStorage.getItem("customerId");
      for (const orderDetail of order.orderDetails) {
        const { spareParts } = orderDetail;
        const reviewData = await getReviewBySparePartIdAndCusId(
          spareParts.id,
          customerId
        );
        if (reviewData) {
          setFormData((prevState) => ({
            ...prevState,
            ratings: {
              ...prevState.ratings,
              [spareParts.id]: reviewData.rating,
            },
            reviewContents: {
              ...prevState.reviewContents,
              [spareParts.id]: reviewData.content,
            },
          }));
        }
      }
    };
    fetchData();
  }, [order.orderDetails]);

  const handleReviews = (sparePartsId) => {
    const { ratings, reviewContents } = formData;
    const customerId = localStorage.getItem("customerId");
    const reviewContent = reviewContents[sparePartsId];
    const rating = ratings[sparePartsId];

    if (!reviewContent && !rating) {
      setFormData({
        ...formData,
        errorModalIsOpen: true,
        errorMessage:
          "Vui lòng nhập đủ nội dung đánh giá hoặc đánh giá bằng sao.",
      });
      return;
    }

    axios
      .post("http://localhost:8080/get-api/create-reviews", {
        orderId: order?.id,
        customerId,
        sparePartsId,
        content: reviewContent,
        rating,
      })
      .then((response) => {
        setFormData({
          ...formData,
          successModalIsOpen: true,
          successMessage: response.data,
        });
      })
      .catch((error) => {
        setFormData({
          ...formData,
          errorModalIsOpen: true,
          errorMessage: "Đánh giá không thành công",
        });
      });
  };

  const { errorModalIsOpen, errorMessage, successModalIsOpen, successMessage } =
    formData;

  const closeModal = () => {
    setFormData({
      ...formData,
      errorModalIsOpen: false,
      successModalIsOpen: false,
    });
  };

  return (
    <div className="container-modal-review">
      <div className="modal-review">
        <div className="close-form-review" onClick={handleCloseReviews}>
          X
        </div>
        <div>
          {order.orderDetails.map((value, index) => (
            <div key={index} className="mb-4 mt-5 container-product-reviews">
              <div
                className="d-flex align-items-center justify-content-center gap-3"
                style={{ height: "70px" }}
              >
                <div className="image-product d-flex align-items-center">
                  <img
                    src={`${routeImage}${value?.spareParts?.id}`}
                    alt=""
                    style={{
                      width: "100px",
                      height: "70px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div>
                  <div className="name-product">{value.spareParts.name}</div>
                  <div className="quanlity">Số lượng: {value.quantity}</div>
                </div>
              </div>
              <div className="start-reviews d-flex align-items-center justify-content-center">
                <StartRating
                  numStart={formData.ratings[value.spareParts.id] || 0}
                  size={"25px"}
                  setRating={(rating) =>
                    setFormData({
                      ...formData,
                      ratings: {
                        ...formData.ratings,
                        [value.spareParts.id]: rating,
                      },
                    })
                  }
                  sparePartsId={value.spareParts}
                />
              </div>
              <div className="content-reviews d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex flex-column w-75">
                  <span>Nội dung đánh giá: </span>
                  <textarea
                    maxLength="1000"
                    className="textarea-reviews w-100"
                    value={formData.reviewContents[value.spareParts.id] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviewContents: {
                          ...formData.reviewContents,
                          [value.spareParts.id]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-2">
                <button
                  className="reviews-btn-modal"
                  onClick={() => handleReviews(value.spareParts.id)}
                >
                  Đánh giá
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={errorModalIsOpen}
        onHide={closeModal}
        style={{ marginTop: "100px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Lỗi!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeModal}
            className="btn btn-danger"
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={successModalIsOpen}
        onHide={closeModal}
        style={{ marginTop: "100px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>Thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeModal}
            className="btn btn-success"
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalReview;
