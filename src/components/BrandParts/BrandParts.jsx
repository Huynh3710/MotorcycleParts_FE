import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {routeImageBrandParts} from "../../api/apiGetImage";
// import "../../layout/Style.css";

import "./BrandPartsStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BrandParts = () => {

  const [brandParts, setBrandParts] = useState([]);
  console.log(brandParts);
  useEffect(() => {
    const getAllBrandParts = async () => {
      try {
        axios.get("http://localhost:8080/get-api/brand-parts/get-all-brand-parts").then((res) => {
          console.log(res.data);
          setBrandParts(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllBrandParts();
  }, []);

  const [deviceType, setDeviceType] = useState("desktop");
  const slideCount = Math.floor(brandParts.length / 5); // Số slide
  const remainder = brandParts.length % 5; // Phần còn lại của slide cuối cùng

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setDeviceType("desktop");
      } else if (window.innerWidth <= 1024 && window.innerWidth >= 464) {
        setDeviceType("tablet");
      } else {
        setDeviceType("mobile");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      //số item mỗi slide
      items: 5,
      //số slide hiển thị
      slidesToSlide: slideCount === 0 ? remainder : 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 2,
    },
  };

  const navigate = useNavigate();

  const handleProductByBrand = (brandId) => {
    navigate(`/product?type=brand&brandId=${brandId}`);
  };

  return (
    <div className="ps-3">
      <Carousel
        arrows={true}
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        //   autoPlay={deviceType !== "mobile" ? true : false}
        autoPlay={false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        renderDotsOutside={false}
      >
        {brandParts.map((e, index) => {
          return (
            <div
              key={index}
              className="container-brand d-flex align-items-center "
              onClick={() => handleProductByBrand(e.id)} // Gọi hàm với ID thương hiệu
            >
              <img className="image-brand rounded-3 ms-3" src={`${routeImageBrandParts}${e.id}`} alt="" style={{height: "100px"}}/>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default BrandParts;
