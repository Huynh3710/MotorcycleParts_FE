import SlideShow from "../../components/SlideShow/SlideShow";
import Nav from "../../components/Navbar/Nav";
import CartItemsGroupParts from "../../components/CartItemsGroupParts/CartItemsGroupParts";
import BrandParts from "../../components/BrandParts/BrandParts";
import Footer from "../../components/Footer/Footer";
import useGetAllSpareParts from "../../hooks/useGetAllSpareParts";
import CartItemsMainPage from "../../components/CartItemsMainPage/CartItemsMainPage";
import SparePartForMotor from "../../components/SparePartForMotor/SparePartForMotor";
import useGetAllSparePartType from "../../hooks/useGetAllSparePartType";
import "./HomeStyle.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const HomePage = () => {
  const { allSpareParts } = useGetAllSpareParts();
  // const [recommendations, setRecommendations] = useState([]);
  //nhóm phụ tùng
  const { SparePartsType } = useGetAllSparePartType();
  const { MotorType } = useGetAllSparePartType();
  const [productRecommendations, setProductRecommendations] = useState([]);
  const customerId = localStorage.getItem("customerId");
  console.log(productRecommendations);
  useEffect(() => {
    if (!customerId) {
      return;
    }
    try {
      const getRecommendations = async () => {
        const response = await axios.get(
          `http://127.0.0.1:5000/recommendations/${customerId}`
        );
        // setRecommendations(response.data.recommendations);
        return response.data.recommendations;
      };

      const getProductRecommendations = async (ids) => {
        // if (ids?.length > 0) { // Kiểm tra xem danh sách có dữ liệu không
        console.log(ids);
        const response = await axios.get(
          "http://localhost:8080/get-api/spare-parts/get-spare-parts-by-ids",
          {
            params: {
              ids: ids?.join(","),
            },
          }
        );
        setProductRecommendations(response.data);
        // }
      };

      const fetchData = async () => {
        const ids = await getRecommendations(); // Chờ cho getRecommendations hoàn thành
        await getProductRecommendations(ids); // Sau đó mới gọi getProductRecommendations
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [customerId]);

  return (
    <div className="container-home">
      <div className="container-nav">
        <Nav />
      </div>
      <div className="home container px-3 px-sm-0">
        <div className="home-banner rounded-3">
          <SlideShow />
        </div>

        <div className="home-brand-parts mt-md-3 py-md-3 rounded-3">
          <BrandParts />
        </div>

        <div className="home-parts-type mt-2 mt-sm-4 px-sm-4 py-sm-3 rounded-3">
          <h3 className="title mb-4">Nhóm phụ tùng</h3>
          <div className="group-parts pb-3">
            {SparePartsType &&
              SparePartsType.slice(0, 10).map((e, index) => {
                <img src={e.image} alt="" />;
                return <CartItemsGroupParts key={index} groupParts={e} />;
              })}
          </div>
        </div>

        <div className="home-part-for-motor mt-2 mt-sm-4 px-sm-4 py-sm-3 rounded-3">
          <h3 className="title mb-4">Phụ tùng theo xe</h3>
          <div className="part-for-motor mx-4">
            {MotorType &&
              MotorType.slice(0, 10).map((e, index) => {
                return <SparePartForMotor key={index} MotorType={e} />;
              })}
          </div>
        </div>

        <div className="home-replace-parts mt-2 mt-sm-4 px-sm-4 py-sm-3 rounded-3">
          <h3 className="title mb-4">Phụ tùng thay thế</h3>
          <div className="container-parts-replace mx-4">
            {allSpareParts &&
              allSpareParts
                .sort(() => 0.5 - Math.random())
                .slice(0, 8)
                .map((e, index) => {
                  return <CartItemsMainPage CartItems={e} key={index} />;
                })}
          </div>
          <div className="see-more-home mt-4 d-flex justify-content-center">
            <Link to={"/product"} className="btn-see-more">
              Xem Thêm
            </Link>
          </div>
        </div>

        <div className="container-propose-spare-part mt-2 mt-sm-4 px-sm-4 py-sm-3 rounded-3">
          {customerId ? <h3 className="title mb-4">Phụ tùng đề xuất</h3> : <h3 className="title mb-4">Phụ tùng đề xuất</h3>}
          <div className="propose-spare-part mx-4">
            {customerId && productRecommendations
              ? productRecommendations?.slice(0, 8).map((e, index) => {
                  return <CartItemsMainPage CartItems={e} key={index} />;
                })
              : allSpareParts &&
                allSpareParts?.slice(0, 8).map((e, index) => {
                  return <CartItemsMainPage CartItems={e} key={index} />;
                })}
          </div>
        </div>
      </div>

      <div className="home-footer mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
