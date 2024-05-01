import React, { useState } from "react";
import axios from "axios"; // Don't forget to install this package
import { routeImage } from "../../../api/apiGetImage";
import { Modal, Button } from "react-bootstrap";
import "./ModalReview.css";
import { StartRating } from "../../../components/StartRating/StartRating";

const ModalReview = ({ handleCloseReviews, order, customerId }) => {
  // Assume customerId is passed as a prop
  // const [forSpareParts, setForSpareParts] = useState();
  const [ratings, setRatings] = useState({}); // New state for ratings
  const [reviewContents, setReviewContents] = useState({}); // State for review contents
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucssecModalIsOpen, setSucssecModalIsOpen] = useState(false);
  const [sucssecMessage, setSucssecMessage] = useState("");


  const handleReviews = (sparePartsId) => {
    customerId = localStorage.getItem("customerId"); // Get customerId from localStorage
    const reviewContent = reviewContents[sparePartsId];
    const rating = ratings[sparePartsId];
    console.log(customerId, sparePartsId, reviewContent, rating);
    if (!reviewContent && !rating) {
      setErrorModalIsOpen(true);
      setErrorMessage("Vui lòng nhập nội dung đánh giá hoặc đánh giá.");
      return; // Dừng lại nếu thông tin không đầy đủ
    }
    axios
      .post("http://localhost:8080/get-api/create-reviews", {
        // Replace with your API endpoint
        orderId: order?.id,
        customerId,
        sparePartsId,
        content: reviewContent,
        rating,
      })
      .then((response) => {
        console.log(response.data);
        setSucssecModalIsOpen(true);
        setSucssecMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorModalIsOpen(true);
        setErrorMessage("Đánh giá không thành công");
      });
  };

  return (
    <div className="container-modal-review">
      <div className="modal-review">
        <div className="close-form-review" onClick={handleCloseReviews}>
          X
        </div>
        <div>
          {order.orderDetails.map((value, index) => {
            console.log(value.spareParts.id);
            return (
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
                    size={"25px"}
                    // setForSpareParts={setForSpareParts}
                    setRating={(rating) =>
                      setRatings({ ...ratings, [value.spareParts.id]: rating })
                    } // Update ratings when user rates
                    sparePartsId={value.spareParts}
                  />
                </div>
                <div className="content-reviews d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex flex-column w-75">
                    <span>Nội dung đánh giá: </span>
                    <textarea
                      maxLength="1000"
                      className="textarea-reviews w-100"
                      value={reviewContents[value.spareParts.id] || ""}
                      onChange={(e) =>
                        setReviewContents({
                          ...reviewContents,
                          [value.spareParts.id]: e.target.value,
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
            );
          })}
        </div>
      </div>
      <Modal show={errorModalIsOpen} onHide={() => setErrorModalIsOpen(false)} style={{marginTop: "100px"}}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Lỗi!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setErrorModalIsOpen(false)}
            class="btn btn-danger"
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={sucssecModalIsOpen} onHide={() => setSucssecModalIsOpen(false)} style={{marginTop: "100px"}}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>Thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{sucssecMessage}!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSucssecModalIsOpen(false)}
            class="btn btn-success"
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalReview;
