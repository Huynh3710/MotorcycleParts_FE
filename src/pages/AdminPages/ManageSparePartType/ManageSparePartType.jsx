import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ModalAddSparePartType from "./ModalAddSparePartType";
import ModalSparePartTypeDetail from "./ModalSparePartTypeDetail";
import "./ManageSparePartType.css";
import { routeImageSparePart } from "../../../api/apiGetImage";
const ManageSparePartType = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(3); // Số mục trên mỗi trang

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowModalDetail(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-api/spare-parts/get-all-spare-parts-type"
        );
        const data = await response.data;
        setAllCategories(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleShowDetail = (item) => {
    setItems(item);
    setShowModalDetail(true);
  };

  // Tính chỉ số của item cuối cùng trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  // Tính chỉ số của item đầu tiên trên trang hiện tại
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Lấy danh sách item cho trang hiện tại
  const currentCategories = allCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Thay đổi trang hiện tại
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
      <h3 className="pb-3 header-manage-part-type mb-3">
        Danh sách các loại phụ tùng
      </h3>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="w-50">
          <Button onClick={handleModalShow}>Thêm Loại Phụ Tùng</Button>
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
              <td><img
                  src={`${routeImageSparePart}${category?.id}`}
                  alt={category?.name}
                  style={{ width: "150px" }}
                /></td>
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
          disabled={currentPage === Math.ceil(allCategories.length / itemsPerPage)}
        >
          {">>"}
        </button>
      </div>
      {showModal && <ModalAddSparePartType onClose={handleModalClose} />}
      {showModalDetail && (
        <ModalSparePartTypeDetail onClose={handleModalClose} item={items} />
      )}
    </div>
  );
};

export default ManageSparePartType;
