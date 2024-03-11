import React, { useEffect } from "react";
import SlideShow from "../Components/SlideShow";
import Nav from "../Components/Nav";
import BrandParts from "../Components/BrandParts";
import Michelin from "../assets/images/BrandParts/Michelin.png";
import CartItemsGroupParts from "../Components/CartItemsGroupParts";
import Footer from "../Components/Footer";
import GetAllSpareParts from "../hooks/GetAllSpareParts";
import axiosPublic from "../api/axiosPublic";
const HomePage = () => {
  
  const groupParts = [
      {
        name: "Lốp xe",
        image: {Michelin}
      },
      {
        name: "Dây curoa",
        image: {Michelin}
      },
      {
        name: "Bộ ốc và bản lề",
        image: {Michelin}
      },
      {
        name: "Bộ côn và dây đai",
        image: {Michelin}
      },
      {
        name: "Dây xích và bộ truyền động",
        image: {Michelin}
      },
      {
        name: "Hệ thống phanh",
        image: {Michelin}
      },
      {
        name: "Đèn pha và đèn hậu",
        image: {Michelin}
      },
      {
        name: "Bình xăng và hệ thống xăng",
        image: {Michelin}
      },
      {
        name: "Bộ ly hợp và bánh răng",
        image: {Michelin}
      }
  ];

  // useEffect(() => {
  //   <GetAllSpareParts />
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/get-api/get-all");
        console.log(response.data); // Hiển thị dữ liệu từ phản hồi
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-home">
      <div className="home-nav">
        <Nav />
      </div>
      <div className="home container px-3 px-sm-0">
        <div className="home-banner rounded-3">
          <SlideShow />
        </div>  

        <div className="home-brand-parts mt-md-3 py-md-3 rounded-3">
          <BrandParts />
        </div>

        <div className="home-motor-type mt-2 mt-sm-4 px-sm-4 py-sm-3 rounded-3">
          <h3 className="title mb-4">Nhóm phụ tùng</h3>
          <div className="group-parts pb-3">
            {groupParts.map((e, index) => {
              <img src={e.image} alt="" />
              return (
                <CartItemsGroupParts key={index} groupParts = {e} />
              );
            })}
          </div>
        </div>

        <div className="home-part-for-motor mt-2 mt-sm-4 px-sm-4 py-sm-3 rounded-3">
          <h3 className="title mb-4">Phụ tùng theo xe</h3>
          <div>

          </div>
        </div>

        <div className="home-replace-parts mt-2 mt-sm-4 px-sm-4 py-sm-3 rounded-3">
          <h3 className="title mb-4">Phụ tùng thay thế</h3>
        </div>
      </div>

      <div className="home-footer">
          <Footer />
      </div>
    </div>
  );
};

export default HomePage;
