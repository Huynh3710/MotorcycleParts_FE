import React, { useEffect, useState } from "react";
import "./ManageCategory.css";
import axios from "axios";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ModalAddCategory from "./ModalAddCategory";
import ModalCategoryDetail from "./ModalCategoryDetail";
import { routeImageBrandParts } from "../../../api/apiGetImage";
import { Button, Table } from "react-bootstrap"; // Import các component từ Bootstrap 5

const ManageCategory = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [items, setItems] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(5); // Số mục trên mỗi trang

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-api/brand-parts/get-all-brand-parts"
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
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = allCategories.slice(indexOfFirstItem, indexOfLastItem);

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
      <h3 className="pb-3 header-manage-category mb-3">Quản Lý Danh Mục</h3>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="w-50">
          <Button onClick={handleModalShow}>Thêm Hãng Phụ Tùng</Button>
        </div>
        <div className="w-50">
          <SearchBar
            sizeButton={20}
            placeholder={"Tìm kiếm danh mục theo tên"}
            type={"brandpart"}
            setBrandParts={setAllCategories}
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
                <img src={`${routeImageBrandParts}${category?.id}`} alt={category?.name} style={{width: "150px", height:"100px"}}/>
              </td>
              <td>{category?.name}</td>
              <td>
                <button className="btn btn-outline-secondary" onClick={()=>handleShowDetail(category)}>Chỉnh Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
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
      {showModal && <ModalAddCategory onClose={handleModalClose} />}
      {showModalDetail && <ModalCategoryDetail onClose={handleModalClose} item={items}/>}
    </div>
  );
};

export default ManageCategory;
