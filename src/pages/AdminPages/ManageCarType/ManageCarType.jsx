import React, { useEffect, useState } from "react";
import "./ManageCarType.css";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ModalAddCarType from "./ModalAddCarType";
import ModalCarTypeDetail from "./ModalCarTypeDetail";
import { routeImageCarType } from "../../../api/apiGetImage";
const ManageCarType = () => { 
  const [allCategories, setAllCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  //item for modal detail
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(3); // Số mục trên mỗi trang

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-api/get-all-motor-type"
        );
        const data = await response.data;
        setAllCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleModalShow = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setShowModalDetail(false);
  };
  const handleShowDetail = (item) => {
    setItems(item);
    setShowModalDetail(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = allCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPage = Math.ceil(allCategories.length / itemsPerPage);
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  return (
    <div>
      <h3 className="pb-3 header-manage-car-type mb-3">Danh sách các loại xe</h3>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="w-50">
          <Button onClick={handleModalShow}>Thêm Loại Xe</Button>
        </div>
        <div className="w-50">
          <SearchBar
            sizeButton={20}
            placeholder={"Tìm kiếm loại xe theo tên"}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category, index) => (
            <tr key={index}>
              <td>{category?.id}</td>
              <td>
                <img
                  src={`${routeImageCarType}${category?.id}`}
                  alt={category?.name}
                  style={{ width: "150px" }}
                />
              </td>
              <td>{category?.name}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleShowDetail(category)}
                >
                  Chỉnh Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(allCategories.length / itemsPerPage)
          }
        >
          {">>"}
        </button>
      </div>
      {showModal && <ModalAddCarType onClose={handleModalClose} />}
      {showModalDetail && <ModalCarTypeDetail onClose={handleModalClose} item={items}/>}
    </div>
  );
};

export default ManageCarType;
