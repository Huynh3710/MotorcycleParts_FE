import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import useReview from "../../hooks/useReview";
import { StartRating } from "../../components/StartRating/StartRating";
import QualityInput from "../../components/QualityInput/QualityInput";
import CartItemsMainPage from "../../components/CartItemsMainPage/CartItemsMainPage";
import useGetSparePartsById from "../../hooks/useGetSparePartsById";
import { useLocation } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routeImage } from "../../api/apiGetImage";
import "./ProductDetailStyle.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import CountdownTimer from "../../components/Countdown";
const ProductDetail = () => {
  const location = useLocation();
  const sparePartsId = location.state.sparePartsId;

  const { sparePartsById } = useGetSparePartsById(sparePartsId);
  console.log(sparePartsById);
  const { addToCart } = useCart(sparePartsById);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [forCar, setForCar] = useState("");

  const { getReviewBySparePartId } = useReview();
  const [reviews, setReviews] = useState([]);
  const [staticReviews, setStaticReviews] = useState([]);

  const [imageCustomer, setImageCustomer] = useState("");

  const [sparePartsSimilar, setSparePartsSimilar] = useState();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [numReviewsToShow, setNumReviewsToShow] = useState(5);

  const handleShowMoreReviews = () => {
    setNumReviewsToShow(numReviewsToShow + 5);
  };

  const handleShowLessReviews = () => {
    setNumReviewsToShow(5);
  };


  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (sparePartsById && sparePartsById.discount && sparePartsById.discount.endDate) {
        let endDateArray = sparePartsById.discount.endDate;
        let endDate = new Date(endDateArray[0], endDateArray[1] - 1, endDateArray[2], endDateArray[3], endDateArray[4]);
        let endDateUnitTime = endDate.getTime();
        setTimeLeft(endDateUnitTime);
    }
}, [sparePartsById]);




  const customerId = localStorage.getItem("customerId");
  const motorTypesArray = Object.values(forCar);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/get-api/spare-parts/get-motor-types-by-spare-parts-id=${sparePartsId}`
      );
      setForCar(response.data);
    };

    const fetchReview = async () => {
      const response = await getReviewBySparePartId(sparePartsId);
      setReviews(response);
    };

    const getStaticReviews = async () => {
      try {
        axios
          .get(
            `http://localhost:8080/get-api/reviews-statistics/${sparePartsId}`
          )
          .then((response) => {
            setStaticReviews(response.data);
          });
      } catch (error) {}
    };

    const getImageCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/get-image-by-customer/${customerId}`
        );
        setImageCustomer(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchReview();
    getStaticReviews();
    getImageCustomer();
  }, [sparePartsId, customerId, staticReviews?.averageRating]);

  useEffect(() => {
    const getSparePartSimilar = async () => {
      if (sparePartsById?.sparePartsType?.id && sparePartsId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-spare-parts-type-id=${sparePartsById?.sparePartsType?.id}/exclude=${sparePartsId}`
          );
          setSparePartsSimilar(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (sparePartsById) {
      getSparePartSimilar();
    }
  }, [sparePartsById]);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  

  const handleAddToCart = (event) => {
    if (localStorage.getItem("customerId")) {
      event.stopPropagation();
      // addToCart(CartItems.id);
      addToCart(quantity);
      toast.success("Thêm vào giỏ hàng thành công");
    } else {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
    }
  };
  // console.log(sparePartsById);

  const [payment, setPayment] = useState({
    customerId: localStorage.getItem("customerId"),
    currency: "USD",
    amount: 10,
    orderDetailsId: [],
  });

  console.log(payment);

  const handlePayment = async (payment) => {
    try {
      // console.log(payment);
      const response = await axios.post(
        "http://localhost:8080/api/v1/user-payment/orders/create",
        payment
      );
      const linkPayment = response.data.links[1].href;
      window.location.href = linkPayment;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = async () => {
    const customerId = localStorage.getItem("customerId");
    try {
      const response = await axios.get(
        `http://localhost:8080/get-api/get-address-default-by-customer-id/${customerId}`
      );
      console.log(response.data);
      if (
        response.data === null ||
        response.data === "Default address not found"
      ) {
        toast.error(
          "Vui lòng thêm địa chỉ giao hàng mặc định trước khi mua hàng"
        );
        return; // Thêm lệnh return ở đây để ngăn chặn việc thực hiện các hành động mua hàng nếu không có địa chỉ mặc định
      }
    } catch (error) {
      console.log(error);
    }

    if (customerId) {
      const response = await addToCart(quantity);
      //id order detail response.id
      const newPayment = {
        ...payment,
        orderDetailsId: [response?.id],
      };
      setPayment(newPayment);
      handlePayment(newPayment);
      console.log(response?.id);
      // window.location.href = "/cart";
    } else {
      toast.error("Vui lòng đăng nhập để mua hàng");
    }
  };

  function roundHalf(num) {
    return Math.round(num * 2) / 2;
  }

  return (
    <div className="product-detail-container">
      <div className="container-nav">
        <Nav />
      </div>

      <div className="product-detail position-relative mx-5 p-sm-3">
        <div className="product-detail-left">
          <div className="product-detail-overview d-flex gap-4">
            <div className="product-image">
              <img
                src={`${routeImage}${sparePartsById.id}`}
                alt=""
                style={{
                  width: "450px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="product-detail-infor-container py-1">
              <h4 className="product-detail-name mb-2">
                {sparePartsById.name}
              </h4>

              <div className="total-rating d-flex justify-content-between px-2">
                <div className="d-flex align-items-center gap-1 mb-3">
                  <div className="total-rating-start">
                    {staticReviews?.averageRating || 0}
                  </div>
                  <div className="start me-2">
                    <StartRating
                      numStart={roundHalf(staticReviews?.averageRating) || 0}
                      readonly={true}
                      size={"14px"}
                    />
                  </div>
                  <div className="total-review">{`${
                    staticReviews?.totalReviews || 0
                  } đánh giá`}</div>
                </div>
                <div className="total-sell">
                  Đã bán: {sparePartsById.sellNumber}
                </div>
              </div>

              <div className="use-for-motor d-flex mb-1">
                <h6 className="m-0 float-start mt-1 me-1">Dành cho xe: </h6>
                <div className="product-detail-infor m-0">
                  {motorTypesArray?.map((e, index) => {
                    return (
                      <p
                        key={index}
                        className="use-for-motor-items d-inline-block align-items-center mb-1 me-2 px-1 rounded-2"
                      >
                        {e.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <div>
                    <h6 className="d-inline m-0">Quốc Gia: </h6>
                    <span>{sparePartsById?.origin}</span>
                  </div>
                  <div>
                    <h6 className="d-inline m-0">Kích thước: </h6>
                    <span>{sparePartsById?.size}</span>
                  </div>
                  <div>
                    <h6 className="d-inline m-0">Trọng lượng: </h6>
                    <span>{sparePartsById?.weight}Kg</span>
                  </div>
                  {sparePartsById?.voltage !== null &&
                    sparePartsById?.voltage !== 0 && (
                      <div>
                        <h6 className="d-inline m-0">Điện áp: </h6>
                        <span>{sparePartsById?.voltage}</span>
                      </div>
                    )}
                  {sparePartsById?.warranty !== null &&
                    sparePartsById?.warranty !== 0 && (
                      <div>
                        <h6 className="d-inline m-0">Công suất: </h6>
                        <span>{sparePartsById?.warranty}</span>
                      </div>
                    )}
                </div>

                <div>
                  <div>
                    <h6 className="d-inline m-0">Năm sản xuất: </h6>
                    <span>{sparePartsById?.year}</span>
                  </div>
                  <div>
                    <h6 className="d-inline m-0">Loại: </h6>
                    <span>{sparePartsById?.sparePartsType?.name}</span>
                  </div>
                  <div>
                    <h6 className="d-inline m-0">Thương hiệu: </h6>
                    <span>{sparePartsById?.brandParts?.name}</span>
                  </div>
                </div>
              </div>

              <div className="general-description mt-3">
                <p className="general-description-price mb-0">
                  <span className="d-inline">Giá: </span>
                  {sparePartsById.discount ? (
                    <div className="d-inline">
                      <span className="price-product-detail me-2">
                        {Number(sparePartsById.unitPrice).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                      <span className="discount-price-product-detail">
                        {Number(
                          sparePartsById?.unitPrice -
                            (sparePartsById?.unitPrice *
                              sparePartsById?.discount?.discount) /
                              100
                        ).toLocaleString("vi-VN")}
                        đ
                      </span>
                    </div>
                  ) : (
                    <span className="discount-price-product-detail">
                      {Number(sparePartsById.unitPrice).toLocaleString("vi-VN")}
                      đ
                    </span>
                  )}
                </p>
                {sparePartsById.discount && (
                  <p style={{ fontStyle: "italic" }}>
                    Giảm ngay {sparePartsById?.discount?.discount}%{" "}
                    <span style={{ color: "red" }}>
                      (còn{" "}
                      {timeLeft &&<CountdownTimer timeLeft={timeLeft} />})
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="product-detail-description mt-4">
            <h4>Mô tả chi tiết sản phẩm</h4>
            <div className="product-detail-description-content ms-2">
              {/* <p>Thông tin chi tiết sản phẩm</p> */}
              <p>{sparePartsById.description}</p>
            </div>
          </div>

          <div className="product-detail-container-evaluate mt-4 ">
            <h4>Đánh giá sản phẩm</h4>
            <div className="overview-reviews p-4">
              <div className="d-flex align-items-center gap-2">
                <h4 className="total-rating-start">
                  {staticReviews?.averageRating || 0}
                </h4>
                <div className="start pb-2 me-2">
                  <StartRating
                    // numStart={Math.round(staticReviews?.averageRating) || 0}
                    numStart={roundHalf(staticReviews?.averageRating) || 0}
                    readonly={true}
                    size={"35px"}
                  />
                </div>
              </div>
              <div>
                <h6>{`${staticReviews?.totalReviews || 0} đánh giá`}</h6>
              </div>
              <div>
                <StartRating
                  numStart={5}
                  readonly={true}
                  size={"20px"}
                  showDetail={true}
                  countReview={staticReviews?.fiveStar || "0"}
                />
                <StartRating
                  numStart={4}
                  readonly={true}
                  size={"20px"}
                  showDetail={true}
                  countReview={staticReviews?.fourStar || "0"}
                />
                <StartRating
                  numStart={3}
                  readonly={true}
                  size={"20px"}
                  showDetail={true}
                  countReview={staticReviews?.threeStar || "0"}
                />
                <StartRating
                  numStart={2}
                  readonly={true}
                  size={"20px"}
                  showDetail={true}
                  countReview={staticReviews?.twoStar || "0"}
                />
                <StartRating
                  numStart={1}
                  readonly={true}
                  size={"20px"}
                  showDetail={true}
                  countReview={staticReviews?.oneStar || "0"}
                />
              </div>
            </div>
            <div className="mt-3">
              <h5>Các đánh giá</h5>
              {reviews?.slice(0, numReviewsToShow).map((review, index) => {
                return (
                  <div
                    key={index}
                    className="container-reviews-infor mt-3 ms-2"
                  >
                    <div className="container-infor-user-reviews d-flex justify-content-start gap-2">
                      <div className="avatar-user-reviews">
                        {customerId && imageCustomer ? (
                          <img
                            src={`http://localhost:8080/get-api/get-image-by-customer/${review?.customer?.id}`}
                            alt="ảnh user"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <img src={``} alt="ảnh user" />
                        )}
                      </div>
                      <div className="infor-reviews d-flex flex-column justify-content-center mt-1">
                        <div className="customer-name-and-rating d-flex flex-column ">
                          <h6 className="mb-0 ms-1">
                            {review?.customer?.name}
                          </h6>
                          <div>
                            <StartRating
                              numStart={review?.rating}
                              readonly={true}
                              size={"16px"}
                            />
                          </div>
                        </div>
                        <div className="time-reviews">
                          <p className="mb-0">
                            <span className="date-reviews">
                              {new Date(review?.date).toLocaleDateString()}
                            </span>

                            <span className="hour-reviews">
                              {" "}
                              {new Date(review?.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </p>
                        </div>
                        <div className="content-reviews mt-3">
                          {review?.content}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {reviews?.length > numReviewsToShow && (
                <button onClick={handleShowMoreReviews} className="view-more">
                  Xem thêm
                </button>
              )}

              {numReviewsToShow > 5 && (
                <button onClick={handleShowLessReviews} className="compact">
                  Rút gọn
                </button>
              )}
            </div>

            <div className="product-similar mt-5 pt-3">
              <h4
                className="pb-3 mb-4"
                style={{ borderBottom: "1px solid rgb(185, 182, 182)" }}
              >
                Sản phẩm tương tự
              </h4>
              <div className="product-similar-list gap-4">
                {sparePartsSimilar?.slice(0, 10).map((sparePart, index) => {
                  return (
                    <CartItemsMainPage
                      key={index}
                      index={index}
                      CartItems={sparePart}
                      widthItemMainPage={100}
                      heightImgae={65}
                      heightBodyItem={35}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* poistion sticky */}
        <div className="product-detail-right p-4">
          <div className="product-detail-right-name">
            <h4>{sparePartsById.name}</h4>
          </div>
          <div className="product-detail-qua px-3 py-2">
            <h6>Số lượng</h6>
            <QualityInput
              unitPrice={
                sparePartsById.discount
                  ? sparePartsById.unitPrice -
                    (sparePartsById.unitPrice *
                      sparePartsById.discount.discount) /
                      100
                  : sparePartsById.unitPrice
              }
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

          <div className="d-flex flex-column gap-2">
            <Button variant="primary" onClick={handleShow}>
              Mua ngay
            </Button>
            <button className="btn btn-primary " onClick={handleAddToCart}>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        style={{ position: "fixed", top: "30%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận mua hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn mua sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleBuyNow}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetail;
