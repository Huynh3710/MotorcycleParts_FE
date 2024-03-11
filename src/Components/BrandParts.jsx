import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Michelin from "../assets/images/BrandParts/Michelin.png";
import Motul from "../assets/images/BrandParts/Motul.png";
import Dunlop from "../assets/images/BrandParts/Dunlop.png";
import LightSpeed from "../assets/images/BrandParts/LightSpeed.png";
import Metzeler from "../assets/images/BrandParts/Metzeler.png";
import Nitron from "../assets/images/BrandParts/Nitron.png";
import Ohlins from "../assets/images/BrandParts/Ohlins.png";
import Repson from "../assets/images/BrandParts/Repson.png";
import TimSun from "../assets/images/BrandParts/TimSun.png";
import Maxxis from "../assets/images/BrandParts/maxxis.png";

import "../layout/Style.css";
import axios from "axios";

const BrandParts = () => {


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/get-api/get-all");
  //       console.log(response.data); // Hiển thị dữ liệu từ phản hồi
  //     } catch (error) {
  //       console.error("Lỗi khi lấy dữ liệu:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);


  const srcImage = [
    Michelin,
    LightSpeed,
    Dunlop,
    Motul,
    Metzeler,
    Nitron,
    Ohlins,
    Repson,
    TimSun,
    Maxxis,
  ];
  const [deviceType, setDeviceType] = useState("desktop");

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
      slidesToSlide: 2,
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
        {srcImage.map((e, index) => {
          return (
            <div
              key={index}
              className="container-brand d-flex align-items-center "
            >
              <img className="image-brand rounded-3 ms-3" src={e} alt="" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default BrandParts;
