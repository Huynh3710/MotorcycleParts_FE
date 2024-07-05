import React, { useContext, useEffect, useMemo, useState } from "react";
import "./ProductPage.css";
import Nav from "../../components/Navbar/Nav";
import Select from "react-select";
import CartItemsMainPage from "../../components/CartItemsMainPage/CartItemsMainPage";
import useGetSparePartType from "../../hooks/useGetAllSparePartType";
import useGetAllSpareParts from "../../hooks/useGetAllBrandMotor";
import { Input, Label } from "reactstrap";
import axios from "axios";
import axiosPublic from "../../api/axiosPublic";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const ProductPage = ({ title }) => {
  const { SparePartsType, MotorType } = useGetSparePartType();
  const { allBrandParts } = useGetAllSpareParts();
  const [selectedType, setSelectedType] = useState({
    label: "Loại phụ tùng",
    value: "",
  });
  const [selectedMotor, setSelectedMotor] = useState({
    label: "Loại xe",
    value: "",
  });
  const [selectedBrand, setSelectedBrand] = useState({
    label: "Hãng xe",
    value: "",
  });
  const [allSpareParts, setAllSpareParts] = useState(null);
  const [curentPage, setCurentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const searchValue = searchParams.get("sname");
  const typeValue = searchParams.get("type");
  const brandId = searchParams.get("brandId");
  const typePartId = searchParams.get("typePartId");
  const typeMotorId = searchParams.get("typeMotorId");

  useEffect(() => {
    const getProductsByBrand = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-brand=${brandId}`
          `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-brand-id=${brandId}`
        );
        setAllSpareParts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
      }
    };
    const getProductsByType = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-type-id=${typePartId}`
        );
        setAllSpareParts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
      }
    };
    const getProductsByMotor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-motor-type-id=${typeMotorId}`
        );
        setAllSpareParts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
      }
    };
    if (brandId !== null) {
      getProductsByBrand();
    }
    if (typePartId !== null) {
      getProductsByType();
    }
    if (typeMotorId !== null) {
      getProductsByMotor();
    }
  }, [brandId, typePartId, typeMotorId]);

  useEffect(() => {
    const searchSpareParts = async () => {
      try {
        const response = await axiosPublic.get(
          `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-search=${searchValue}`
        );
        setAllSpareParts(response.data);
        console.log(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
      }
    };
    if (searchValue !== null) {
      searchSpareParts();
    }
  }, [typeValue, searchValue]);

  useEffect(() => {
    const getAllSpareParts = async () => {
      try {
        const response = await axiosPublic.get(
          `http://localhost:8080/get-api/spare-parts/get-api/spare-parts/get-all-parts-pages?page=${curentPage}&size=20`
        );
        setAllSpareParts(response.data.content);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    if (typeValue === null || typeValue === undefined || typeValue === "") {
      getAllSpareParts();
    }
  }, [curentPage, typeValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [curentPage, searchValue]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const allOption = { value: "", label: "Tất cả" };

  const typeOption = [
    allOption,
    ...(SparePartsType?.map((typePart) => ({
      value: typePart?.id,
      label: typePart?.name,
    })) || []),
  ];

  const motorOption = [
    allOption,
    ...(MotorType?.map((motor) => ({
      value: motor?.id,
      label: motor?.name,
    })) || []),
  ];

  const brandOption = [
    allOption,
    ...(allBrandParts?.map((brand) => ({
      value: brand?.id,
      label: brand?.name,
    })) || []),
  ];

  const handlePriceRangeChange = (priceRange) => {
    switch (priceRange) {
      case "all":
        setMinPrice("");
        setMaxPrice("");
        break;
      case "under1":
        setMinPrice("");
        setMaxPrice("1000000"); // 1 triệu
        break;
      case "1to3":
        setMinPrice("1000000"); // 1 triệu
        setMaxPrice("3000000"); // 3 triệu
        break;
      case "3to5":
        setMinPrice("3000000"); // 3 triệu
        setMaxPrice("5000000"); // 5 triệu
        break;
      case "over5":
        setMinPrice("5000000"); // 5 triệu
        setMaxPrice("");
        break;
      default:
        setMinPrice("");
        setMaxPrice("");
        break;
    }
  };

  const handleChange = (setter) => (selectedOption) => {
    setter(selectedOption);
  };
  const handleFillter = async () => {
    console.log(
      selectedType?.value,
      selectedMotor?.value,
      selectedBrand?.value,
      minPrice,
      maxPrice
    );
    try {
      const response = await axios.get(
        `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-filter?&brandId=${selectedBrand?.value}&typeId=${selectedType?.value}&motorTypeId=${selectedMotor?.value}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      console.log(response.data);
      setAllSpareParts(response.data);
    } catch (error) {}
  };
  return (
    <div className="d-flex flex-column" style={{ gap: "90px" }}>
      <div className="container-nav">
        <Nav />
      </div>
      <div>
        <div className="container">
          <h3>Sản Phẩm</h3>
        </div>
        <div className="container-product-page px-5 container mb-4">
          {title !== "Sản Phẩm" && (
            <div className="container-filter d-flex flex-column align-items-center">
              {/* <h5>Bộ lọc</h5> */}
              <div className="mt-3 d-flex justify-content-center">
                <div className="filter d-flex gap-3">
                  {/* Khoảng giá */}
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    {/* <div>
                    <h6 for="price" className="mb-2">Khoảng giá:</h6>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span style={{marginRight: "10px"}}>Từ</span>
                      <Input
                        type="text"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                       
                        style={{ width: "100px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span>Đến</span>
                      <Input
                        type="text"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={{ width: "100px" }}
                      />
                    </div>
                    </div> */}
                    <Select
                      options={[
                        { value: "all", label: "Tất cả" },
                        { value: "under1", label: "Dưới 1 triệu" },
                        { value: "1to3", label: "1 triệu - 3 triệu" },
                        { value: "3to5", label: "3 triệu - 5 triệu" },
                        { value: "over5", label: "Trên 5 triệu" },
                      ]}
                      onChange={(selectedOption) =>
                        handlePriceRangeChange(selectedOption.value)
                      }
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <Select
                      className="basic-single"
                      name="sparePartType"
                      options={typeOption}
                      onChange={handleChange(setSelectedType)}
                      defaultValue={{ label: "Loại phụ tùng", value: "" }}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <Select
                      className="basic-single"
                      name="motorType"
                      options={motorOption}
                      onChange={handleChange(setSelectedMotor)}
                      defaultValue={{ label: "Loại xe", value: "" }}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <Select
                      className="basic-single"
                      name="brandType"
                      options={brandOption}
                      onChange={handleChange(setSelectedBrand)}
                      defaultValue={{ label: "Hãng phụ tùng", value: "" }}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-primary d-flex align-items-center text-center "
                      onClick={handleFillter}
                      style={{ height: "40px" }}
                    >
                      Lọc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            {allSpareParts?.length === 0 && (
              <div className="no-product-found d-flex justify-content-center">
                Không tìm thấy sản phẩm nào!
              </div>
            )}
          </div>

          <div className="list-product mt-5">
            {allSpareParts?.map((sparePart) => {
              return <CartItemsMainPage CartItems={sparePart} />;
            })}
          </div>
          {/* <div className="mt-5">
            <nav aria-label="Page navigation example">
              <ul className="pagination d-flex justify-content-center gap-3 mt-3">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => {
                      if (curentPage > 0) {
                        setCurentPage(curentPage - 1);
                      }
                    }}
                  >
                    Trang trước
                  </button>
                </li>
                {Array.from({ length: totalPage }, (_, i) => i).map((page) => (
                  <li
                    className={`page-item ${
                      page === curentPage ? "active" : ""
                    }`}
                    key={page}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurentPage(page)}
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => {
                      if (curentPage < totalPage - 1) {
                        setCurentPage(curentPage + 1);
                      }
                    }}
                  >
                    Trang sau
                  </button>
                </li>
              </ul>
            </nav>
          </div> */}
          <div className="mt-5">
            <nav aria-label="Page navigation example">
              <ul className="pagination d-flex justify-content-center gap-3 mt-3">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => {
                      if (curentPage > 0) {
                        setCurentPage(curentPage - 1);
                      }
                    }}
                  >
                    Trang trước
                  </button>
                </li>
                {totalPage > 5 && curentPage > 2 && (
                  <li className="page-item">
                    <span className="page-link">...</span>
                  </li>
                )}
                {Array.from({ length: totalPage }, (_, i) => i)
                  .filter((page) => Math.abs(page - curentPage) <= 2)
                  .map((page) => (
                    <li
                      className={`page-item ${
                        page === curentPage ? "active" : ""
                      }`}
                      key={page}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurentPage(page)}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                {totalPage > 5 && curentPage < totalPage - 3 && (
                  <li className="page-item">
                    <span className="page-link">...</span>
                  </li>
                )}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => {
                      if (curentPage < totalPage - 1) {
                        setCurentPage(curentPage + 1);
                      }
                    }}
                  >
                    Trang sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
