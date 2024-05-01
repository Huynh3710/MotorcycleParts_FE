import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ModalAddDiscount from "./ModalAddDiscount";
import ModalDiscountDetail from "./ModalDiscountDetail";
import "./ManageDiscount.css";
const ManageDiscount = () => {
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-api/get-all-discounts"
        );
        const data = await response.data;
        console.log(data);
        setAllDiscounts(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchDiscounts();
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
  const currentDiscounts = allDiscounts.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPage = Math.ceil(allDiscounts.length / itemsPerPage);
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
      <h3 className="pb-3 header-manage-discount mb-3">Quản Lý Khuyến Mãi</h3>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="w-50">
          <Button onClick={handleModalShow}>Thêm Khuyến Mãi</Button>
        </div>
        <div className="w-50">
          <SearchBar
            sizeButton={20}
            placeholder={"Tìm kiếm khuyến mãi theo tên"}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Mã khuyến mãi</th>
            <th>Mô tả</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Giá Trị</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentDiscounts.map((discount) => (
            <tr key={discount?.id}>
              <td>{discount?.id}</td>
              <td style={{width: "250px"}}>{discount?.name}</td>
              <td>{discount?.code}</td>
              <td>{discount?.description}</td>
              {/* <td>{discount?.startDate}</td> */}
              <td>{`${discount?.startDate[2]}/${discount?.startDate[1]}/${discount?.startDate[0]} ${discount?.startDate[3]}:${discount?.startDate[4]}`}</td>
              <td>{`${discount?.endDate[2]}/${discount?.endDate[1]}/${discount?.endDate[0]} ${discount?.endDate[3]}:${discount?.endDate[4]}`}</td>

              <td>{discount?.discount}</td>
              <td>
                <button className="btn btn-outline-secondary" onClick={() => handleShowDetail(discount)}>Chi tiết</button>
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
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === Math.ceil(allDiscounts.length / itemsPerPage)}>
          {">>"}
        </button>
      </div>
      {showModal && <ModalAddDiscount onClose={handleModalClose} />}
      {showModalDetail && <ModalDiscountDetail onClose={handleModalClose} discountInfor={items} />}
    </div>
  );
};

export default ManageDiscount;
