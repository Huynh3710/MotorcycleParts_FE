import React, { useState } from "react";
import "./SearchBar.css"; // Đảm bảo bạn đã import file CSS tương ứng
import axios from "axios";

const SearchBar = ({
  type,
  sizeButton,
  placeholder,
  setListSpareParts,
  setOrder,
  setBrandParts,
  setTypeParts,
  setMotorType,
  setDiscounts,
  setShippingList,
  setCustomerList
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (type === "sparepart") {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/spare-parts/get-spare-parts-by-name`,
          { params: { name: searchTerm } }
        );
        setListSpareParts(response.data);
      } catch (error) {}
    }

    if (type === "order") {
      try {
        //order controller
        // const response = await axios.get(
        //   `http://localhost:8080/get-api/orders-by-customer-name/${searchTerm}`
        // );
        const response = await axios.get(
          `http://localhost:8080/get-api/orders-by-customer-name`,
          { params: { name: searchTerm } }
        );
        setOrder(response.data);
      } catch (error) {}
    }

    if (type === "brandpart") {
      try {
        const response = await axios.get(`http://localhost:8080/get-api/brand-parts/search-brand-parts-by-name`, { params: { name: searchTerm } });
        setBrandParts(response.data);
        console.log(response.data);
      } catch (error) {}
    }

    if (type === "typepart") {
      try {
        // const response = await axios.get(
        //   `http://localhost:8080/get-api/spares-parts-type/search-spare-parts-type-by-name/${searchTerm}`
        // );
        const response = await axios.get(
          `http://localhost:8080/get-api/spares-parts-type/search-spare-parts-type-by-name`,
          { params: { name: searchTerm } }
        );
        setTypeParts(response.data);
      } catch (error) {}
    }

    if (type === "typemotor") {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/search-motor-type-by-name`,
          { params: { keyword: searchTerm } }
        );
        setMotorType(response.data);
      } catch (error) {}
    }

    if (type === "discount") {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/search-discount`,
          { params: { keyword: searchTerm } }
        );
        setDiscounts(response.data);
      } catch (error) {}
    }

    if (type === "shipping") {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/search-shipping-rate-by-province-name`,
          { params: { provinceName: searchTerm } }
        );
        setShippingList(response.data);
      } catch (error) {}
    }

    if (type === "customer"){
      try {
        const response = await axios.get(
          `http://localhost:8080/get-api/customers/search`,
          { params: { name: searchTerm } }
        );
        setCustomerList(response.data);
      } catch (error) {}
    }
  };
  const buttonWitdh = sizeButton ? sizeButton + "%" : "10%";

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        className="form-control form-control-extra-sm me-2"
        type="search"
        placeholder={placeholder ? placeholder : "Tìm kiếm"}
        aria-label="Tìm kiếm"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        className="btn btn-outline-success btn-extra-sm"
        type="submit"
        style={{ width: `${buttonWitdh}` }}
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchBar;
