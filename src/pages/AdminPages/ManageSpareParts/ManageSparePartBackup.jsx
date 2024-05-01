import React, { useEffect, useState } from "react";
import "./ManageSpareParts.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ModalAddproduct from "./ModalAddProduct/ModalAddproduct";
import ModalProductDetail from "./ModalProductDetail/ModalProductDetail";
import useGetAllSpareParts from "../../../hooks/useGetAllSpareParts";
import { routeImage } from "../../../api/apiGetImage";

const ManageSpareParts = () => {
  const { allSpareParts } = useGetAllSpareParts();
  

  const [isShowModal, setIsShowModal] = useState(null);
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [listSpareParts, setListSpareParts] = useState([]);

  console.log(listSpareParts);

  useEffect(() => {
    if (allSpareParts) {
      setListSpareParts(allSpareParts);
    }
  },[allSpareParts])

  const itemsPerPage = 3;

  const handleShowProductDetail = (item) => {
    setItem(item);
    setIsShowModal(isShowModal === "productDetail" ? null : "productDetail");
  };

  const handleAddProduct = () => {
    setIsShowModal(isShowModal === "addProduct" ? null : "addProduct");
  };

  const handleCloseModal = () => {
    setIsShowModal(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listSpareParts ? listSpareParts.slice(indexOfFirstItem, indexOfLastItem) : [];


  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPage = Math.ceil(listSpareParts.length / itemsPerPage);
    let startPage = 1;
    let endPage = totalPage;
  
    if (totalPage > 3) {
      if (currentPage === 1) {
        endPage = 3;
      } else if (currentPage === totalPage) {
        startPage = totalPage - 2;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }
  
    if (startPage !== 1) {
      pageNumbers.push(
        <button key="start" onClick={() => changePage(1)}>
          1
        </button>,
        <span key="start-ellipsis">...</span>
      );
    }
  
    for (let i = startPage; i <= endPage; i++) {
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
  
    if (endPage !== totalPage) {
      pageNumbers.push(
        <span key="end-ellipsis">...</span>,
        <button key="end" onClick={() => changePage(totalPage)}>
          {totalPage}
        </button>
      );
    }
  
    return pageNumbers;
  };
  

  return (
    <div className="container-manage-product">
      <h3 className="header pb-3 mb-3">Quản Lý Sản Phẩm</h3>
      <div className="content-manage">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          <button className="btn btn-primary" onClick={handleAddProduct}>
            Thêm Sản Phẩm
          </button>
          <div className="filtering-by-category d-flex flex-column gap-1">
            <label htmlFor="">Lọc theo danh mục:</label>
            <select name="" id="">
              <option value="">Tất cả</option>
              <option value="">Danh mục 1</option>
              <option value="">Danh mục 2</option>
              <option value="">Danh mục 3</option>
            </select>
          </div>
          <div className="" style={{width: "35%"}}>
            <SearchBar sizeButton={20} placeholder={"Tìm kiếm sản phẩm theo tên"} />
          </div>
        </div>
        <div className="table-manage">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Danh mục</th>
                <th scope="col">Hãng sản xuất</th>
                <th scope="col">Trạng thái</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item?.id}</th>
                  <td>
                    <img
                      src={`${routeImage}${item.id}`}
                      alt={item.name}
                      className="image-product"
                    />
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.inventory}</td>
                  <td>{item?.sparePartsType?.name}</td>
                  <td>{item.brandParts.name}</td>
                  <td>{item?.status && item?.status}</td>
                  <td>
                    <button
                      type="button"
                      className="detail-btn me-2"
                      onClick={() => handleShowProductDetail(item)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          {"<<"}
        </button>
        {allSpareParts && renderPageNumbers()}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={allSpareParts ? currentPage === Math.ceil(allSpareParts.length / itemsPerPage) : true}
        >
          {">>"}
        </button>
      </div>
      {isShowModal === "productDetail" && (
        <ModalProductDetail onClose={handleCloseModal} item={item} setItem={setItem}/>
      )}
      {isShowModal === "addProduct" && (
        <ModalAddproduct onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ManageSpareParts;
