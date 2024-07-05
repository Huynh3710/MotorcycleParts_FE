import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'reactstrap';
import SearchBar from '../../../components/SearchBar/SearchBar';
import './ManageCustomer.css';
import ModalDetailCus from './ModalDetailCus';

const ManageCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // const [isShowModalAddCustomer, setIsShowModalAddCustomer] = useState(false);
  const [isShowModalEditCustomer, setIsShowModalEditCustomer] = useState(false);
  const [sumaryCustomer, setSumaryCustomer] = useState();
  const [item, setItem] = useState();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomerList = customerList.slice(indexOfFirstItem, indexOfLastItem);

  // Các hàm khác giống với ManageShipping
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPage = Math.ceil(customerList?.length / itemsPerPage);

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


  const handleViewUpdate = (customer) => {
    setItem(customer);
    setIsShowModalEditCustomer(true);
  }

  const getAllCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/get-api/get-customers-with-lock-status-and-registration-date");
      setCustomerList(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <div className="manage-customer-container">
      <h3 className="mb-3 pb-3">Quản lý khách hàng</h3>
      <div className="d-flex justify-content-end mb-4">
        <div className="w-50">
          {/* <Button
            onClick={() => {
              setIsShowModalAddCustomer(true);
            }}
          >
            Thêm khách hàng
          </Button> */}
        </div>
        <div className="search-bar w-50">
          <SearchBar
            sizeButton={20}
            placeholder={"Tìm kiếm khách hàng theo tên"}
            type={"customer"}
            setCustomerList={setCustomerList}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomerList.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => {
                    handleViewUpdate(customer);
                  }}
                >
                  Chi tiết
                </button>
                {/* <button
                  className="btn btn-danger"  
                  // onClick={() => {
                  //   deleteCustomer(customer.id);
                  // }}
                >
                  xóa
                </button> */}
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
            currentPage === Math.ceil(customerList.length / itemsPerPage)
          }
        >
          {">>"}
        </button>
      </div>
      {/* {/* {isShowModalAddCustomer && (
        <ModalAddCustomer
          onClose={() => {
            setIsShowModalAddCustomer(false);
          }}
          setCustomerList={setCustomerList}
        />
      )} */}
      {isShowModalEditCustomer && (
        <ModalDetailCus
          onClose={() => {
            setIsShowModalEditCustomer(false);
          }}
          item={item}
          setCustomerList={setCustomerList}
        />
      )} 
    </div>
  );
};

export default ManageCustomer;
