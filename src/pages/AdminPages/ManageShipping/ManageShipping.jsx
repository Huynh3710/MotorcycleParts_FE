import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalAddShipping from "./ModalAddShipping";
import ModalEditShipping from "./ModalShippingUpdate";
import { Button, Table } from "react-bootstrap";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageShipping.css";

const ManageShipping = () => {
  const [shippingList, setShippingList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isShowModalAddShipping, setIsShowModalAddShipping] = useState(false);
  const [isShowModalEditShipping, setIsShowModalEditShipping] = useState(false);
  const [item, setItem] = useState();
  console.log(shippingList);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShippingList = shippingList?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPage = Math.ceil(shippingList?.length / itemsPerPage);

    // Số lượng trang hiển thị trước và sau trang hiện tại
    const displayPages = 1;
    let startPage =
      currentPage - displayPages > 0 ? currentPage - displayPages : 1;
    let endPage =
      currentPage + displayPages <= totalPage
        ? currentPage + displayPages
        : totalPage;

    // Đảm bảo luôn hiển thị cùng một số lượng trang
    if (currentPage - startPage < displayPages) {
      endPage = Math.min(startPage + 2 * displayPages, totalPage);
    }
    if (endPage - currentPage < displayPages) {
      startPage = Math.max(endPage - 2 * displayPages, 1);
    }

    // Thêm nút trang đầu tiên
    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => setCurrentPage(1)}>
          {1}
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Thêm các nút trang trong khoảng startPage và endPage
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    // Thêm nút trang cuối cùng
    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button key={totalPage} onClick={() => setCurrentPage(totalPage)}>
          {totalPage}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleViewUpdate = (item) => {
    setItem(item);
    setIsShowModalEditShipping(true);
  };

  
  const getAllShipping = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/get-api/get-all-shipping-rate"
      );
      setShippingList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteShipping = async (code) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/get-api/delete-shipping-rate/${code}`
      );
      console.log(response.data);
      toast.success("Xóa phí vận chuyển thành công");
      getAllShipping();
    } catch (error) {
      console.log(error);
      toast.error("Xóa phí vận chuyển thất bại");
    }
  
  }

  useEffect(() => {
    const getAllShipping = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/get-api/get-all-shipping-rate"
        );
        setShippingList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllShipping();
  }, []);

  return (
    <div className="manage-shipping-container">
      <h3 className="mb-3 pb-3">Quản lý phí vận chuyển</h3>
      <div className="d-flex justify-content-end mb-4">
        <div className="w-50">
          <Button
            onClick={() => {
              setIsShowModalAddShipping(true);
            }}
          >
            Tạo phí vận chuyển
          </Button>
        </div>
        <div className="search-bar w-50">
          <SearchBar
            sizeButton={20}
            placeholder={"Tìm kiếm phí vận chuyển theo thành phố"}
            type={"shipping"}
            setShippingList={setShippingList}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên thành phố</th>
            <th>Phí giao hàng</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentShippingList?.map((shipping) => (
            <tr key={shipping?.code}>
              <td>{shipping?.code}</td>
              <td>{shipping?.fullName}</td>
              <td>{shipping?.shippingRate}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={()=>{handleViewUpdate(shipping)}}>sửa</button>
                <button className="btn btn-danger" onClick={()=>{deleteShipping(shipping?.code)}}>xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(shippingList?.length / itemsPerPage)
          }
        >
          {">>"}
        </button>
      </div>
      {isShowModalAddShipping && (
        <ModalAddShipping
          onClose={() => {
            setIsShowModalAddShipping(false);
          }}
          setShippingList={setShippingList}
        />
      )}
      {isShowModalEditShipping && (
        <ModalEditShipping
          onClose={() => {
            setIsShowModalEditShipping(false);
          }}
        item={item}
        setShippingList={setShippingList}
        />
      )}
    </div>
  );
};

export default ManageShipping;
