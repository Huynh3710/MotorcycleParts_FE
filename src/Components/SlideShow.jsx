import React from "react";
import Banner1 from "../assets/images/Banner/pic1.png";
import Banner2 from "../assets/images/Banner/pic2.png";
import Banner3 from "../assets/images/Banner/pic3.png";
const SlideShow = () => {
  const TimeReplace = 2500;
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval={TimeReplace}>
          <img
            src="https://ik.imagekit.io/Huynh3710/pic1.png?updatedAt=1709687913983"
            className="d-block w-100 rounded-2"
            alt=""
          />
        </div>
        <div className="carousel-item" data-bs-interval={TimeReplace}>
          <img src={Banner2} className="d-block w-100 rounded-2" alt="" />
        </div>
        <div className="carousel-item" data-bs-interval={TimeReplace}>
          <img src={Banner3} className="d-block w-100 rounded-2" alt="" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default SlideShow;
