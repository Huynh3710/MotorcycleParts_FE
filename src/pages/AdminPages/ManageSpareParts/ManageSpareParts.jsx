import React, { useEffect, useState } from "react";
import "./ManageSpareParts.css";
import Select from "react-select";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ModalAddproduct from "./ModalAddProduct/ModalAddproduct";
import ModalProductDetail from "./ModalProductDetail/ModalProductDetail";
import useGetAllSpareParts from "../../../hooks/useGetAllSpareParts";
import { routeImage } from "../../../api/apiGetImage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const ManageSpareParts = () => {
  const { allSpareParts } = useGetAllSpareParts();

  const [isShowModal, setIsShowModal] = useState(null);
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [listSpareParts, setListSpareParts] = useState([]);
  const [optionsType, setOptionsType] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "Tất cả",
  });
  const [selectedStatus, setSelectedStatus] = useState({
    value: "",
    label: "Tất cả",
  });
  const statusOptions = [
    { value: "", label: "Tất cả" },
    { value: "Còn hàng", label: "Còn hàng" },
    { value: "Hết hàng", label: "Hết hàng" },
  ];

  useEffect(() => {
    if (allSpareParts) {
      setListSpareParts(allSpareParts);
    }
    // Fetch loại phụ tùng
    axios
      .get(
        "http://localhost:8080/get-api/spares-parts-type/get-all-spare-parts-type"
      )
      .then((response) => {
        const options = response.data.map((value) => {
          return { value: value.id, label: value.name };
        });
        setOptionsType([{ value: "", label: "Tất cả" }, ...options]);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch loại phụ tùng:", error);
      });
  }, [allSpareParts]);

  const handleChangeCategory = (option) => {
    console.log(option);
    setSelectedOption(option);
  };

  const handleStatusChange = (option) => {
    console.log(option);
    setSelectedStatus(option);
  };

  const handleFilter = () => {
    let list = allSpareParts;
    // if (selectedOption?.value === "" && selectedStatus?.value === "") {
    //   setListSpareParts(list);
    // } else if (selectedOption?.value !== "" && selectedStatus?.value !== "") {
    //   try {
    //     axios
    //       .get(
    //         `http://localhost:8080/get-api/spares-parts-type/get-spare-parts-by-type-and-status/${selectedOption.value}/${selectedStatus.value}`
    //       )
    //       .then((response) => {
    //         console.log(response.data);
    //         setListSpareParts(response.data);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else if (selectedOption?.value !== "" && selectedStatus?.value === "") {
    //   try {
    //     axios
    //       .get(
    //         `http://localhost:8080/get-api/spares-parts-type/get-spare-parts-type-by-id=${selectedOption.value}`
    //       )
    //       .then((response) => {
    //         console.log(response.data);
    //         setListSpareParts(response.data);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else if (selectedOption?.value === "" && selectedStatus?.value !== "") {
    //   try {
    //     axios
    //       .get(
    //         `http://localhost:8080/get-api/spares-parts-type/get-spare-parts-by-status/${selectedStatus.value}`
    //       )
    //       .then((response) => {
    //         console.log(response.data);
    //         setListSpareParts(response.data);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    if (selectedOption?.value === "" && selectedStatus?.value === "") {
      setListSpareParts(list);
    } else {
      let url = "http://localhost:8080/get-api/spares-parts-type/";
      if (selectedOption?.value !== "" && selectedStatus?.value === "") {
        url += `get-spare-parts-type-by-id=${selectedOption.value}`;
      } else if (selectedStatus?.value !== "" && selectedOption?.value === "") {
        url += `get-spare-parts-by-status/${selectedStatus.value}`;
      } else {
        url += `get-spare-parts-by-type-and-status/${selectedOption.value}/${selectedStatus.value}`;
      }
      try {
        axios.get(url).then((response) => {
          console.log(response.data);
          setListSpareParts(response.data);
        });
      } catch (error) {
        console.log(error);
        setListSpareParts([]);
      }
    }

    setListSpareParts(list);
    setIsFilter(false);
  };

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
  const currentItems = listSpareParts
    ? listSpareParts.slice(indexOfFirstItem, indexOfLastItem)
    : [];

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
          {/* {isFilter && (
            <div>
              <div className="filtering-by-category d-flex flex-column gap-1">
                <label htmlFor="">Danh mục:</label>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={optionsType}
                />
              </div>
              <div className="filtering-by-category d-flex flex-column gap-1">
                <label htmlFor="">Trạng Thái:</label>
                <Select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  options={statusOptions}
                />
              </div>
            </div>
          )} */}

          <div className="filtering">
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsFilter(true);
              }}
            >
              Bộ Lọc
            </button>
          </div>
          <div className="" style={{ width: "35%" }}>
            <SearchBar
              sizeButton={20}
              placeholder={"Tìm kiếm sản phẩm theo tên"}
            />
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
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        {allSpareParts && renderPageNumbers()}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={
            allSpareParts
              ? currentPage === Math.ceil(allSpareParts.length / itemsPerPage)
              : true
          }
        >
          {">>"}
        </button>
      </div>
      {isShowModal === "productDetail" && (
        <ModalProductDetail
          onClose={handleCloseModal}
          item={item}
          setItem={setItem}
        />
      )}
      {isShowModal === "addProduct" && (
        <ModalAddproduct onClose={handleCloseModal} />
      )}

      {isFilter && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Bộ Lọc</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div>
                {" "}
                <div>
                  <div className="filtering-by-category d-flex flex-column gap-1">
                    <label htmlFor="">Danh mục:</label>
                    <Select
                      value={selectedOption}
                      onChange={handleChangeCategory}
                      options={optionsType}
                    />
                  </div>
                  <div className="filtering-by-category d-flex flex-column gap-1">
                    <label htmlFor="">Trạng Thái:</label>
                    <Select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      options={statusOptions}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsFilter(false);
                }}
              >
                Đóng
              </Button>
              <Button variant="primary" onClick={handleFilter}>
                Lọc
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
};

export default ManageSpareParts;
