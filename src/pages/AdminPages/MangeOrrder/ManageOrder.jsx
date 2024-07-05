import React, { useEffect, useState } from "react";
import Selected from "./Selected";
import useGetOrder from "../../../hooks/useGetOrder";
import "./ManageOrder.css";
import SearchBar from "../../../components/SearchBar/SearchBar";

const ManageOrder = () => {
  const [dataTable, setDataTable] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { getAllOrder } = useGetOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  // console.log(dataTable);
  // console.log(filteredData);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllOrder();
      setFilteredData(response);
      setDataTable(response?.reverse());
    };
    fetchData();
  }, []);

  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);
  useEffect(() => {
    if (selectAll) {
      setSelectedOrderIds(currentItems.map((item) => item.orderCode));
    } else if (!selectAll && selectedOrderIds.length > 0) {
      setSelectedOrderIds([]);
    }
  }, [selectAll, currentItems]);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    setSelectAll(false);
  };

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(dataTable.length / itemsPerPage); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="">
      <h3
        className="mb-4 pb-3"
        style={{
          borderBottom: "1px solid black",
        }}
      >
        Quản Lý Đơn Hàng
      </h3>
      <div className="d-flex w-100 justify-content-end mb-3">
        <div className="w-50">
          <div className="filter-by-state">
            <label className="mb-2" style={{ fontSize: "18px" }}>
              Lọc theo trạng thái:
            </label>
            <select
              onChange={(e) => {
                const status = e.target.value;
                console.log(status);
                if (status === "ALL") {
                  setFilteredData(dataTable);
                } else {
                  const filtered = dataTable.filter(
                    (item) => item.orderStatus.status === status
                  );
                  setFilteredData(filtered);
                }
              }}
              className="form-select"
            >
              <option value="ALL">Tất cả</option>
              <option value="PENDING">Chờ xác nhận</option>
              <option value="CAPTURED">Xác nhận</option>
              <option value="PREPARING">Đang chuẩn bị</option>
              <option value="SHIPMENT">Đang vận chuyển</option>
              <option value="DELIVERED">Đã giao</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>
        </div>
        <div className="search-order w-50 d-flex align-items-end">
          <div className="w-100">
            <SearchBar
              sizeButton={20}
              placeholder={"Tìm kiếm đơn hàng theo tên khách hàng"}
              type={"order"}
              setOrder={setFilteredData}
            />
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Ngày tạo đơn hàng</th>
              <th scope="col">Tên Khách Hàng</th>
              <th scope="col">Tổng Giá</th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item, index) => {
                return (
                  <Selected
                    key={index}
                    item={item}
                    index={index}
                    // handleSelectOrder={handleSelectOrder}
                    isSelectAll={selectAll}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
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
          disabled={currentPage === Math.ceil(dataTable.length / itemsPerPage)}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default ManageOrder;
