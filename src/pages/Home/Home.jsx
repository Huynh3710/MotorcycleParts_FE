import SlideShow from "../../components/SlideShow/SlideShow";
import Nav from "../../components/Navbar/Nav";
import CartItemsGroupParts from "../../components/CartItemsGroupParts/CartItemsGroupParts";
import BrandParts from "../../components/BrandParts/BrandParts";
import Footer from "../../components/Footer/Footer";
import useGetAllSpareParts from "../../hooks/useGetAllSpareParts";
import CartItemsMainPage from "../../components/CartItemsMainPage/CartItemsMainPage";
import SparePartForMotor from "../../components/SparePartForMotor/SparePartForMotor";
import useGetAllSparePartType from "../../hooks/useGetAllSparePartType";

// import "../../layout/Style.css";
import "./HomeStyle.css";
const HomePage = () => {
  const { allSpareParts } = useGetAllSpareParts();
  // console.log(allSpareParts);
  //nhóm phụ tùng
  const { SparePartsType } = useGetAllSparePartType();
  const { MotorType } = useGetAllSparePartType();
  console.log(MotorType);
  // console.log(SparePartsType);
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
            {/* phụ tùng thay thế */}
            {allSpareParts &&
              allSpareParts.slice(0, 8).map((e, index) => {
                return <CartItemsMainPage CartItems={e} key={index} />;
              })}
          </div>
        </div>
      </div>

      <div className="home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
