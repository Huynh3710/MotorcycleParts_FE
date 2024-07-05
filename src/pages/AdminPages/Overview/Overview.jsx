import React, { useEffect, useState } from "react";
import "./Overview.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Overview = () => {
  const [year, setYear] = useState(2024);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null); 
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [seriesData, setSeriesData] = useState([]);
  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false, 
      },
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    grid: {
      show: true, 
      borderColor: "#90A4AE", 
      strokeDashArray: 0, 
      position: "front", 
      xaxis: {
        lines: {
          show: true, 
        },
      },
      yaxis: {
        lines: {
          show: true, 
        },
      },
    },
  };

  const series = [
    {
      name: "Doanh thu",
      data: seriesData,
    },
  ];

  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);

  const handleFilterClick = async () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (fromDate && new Date(fromDate) > now) {
      toast.error("Ngày bắt đầu không thể lớn hơn ngày hiện tại");
      return;
    }

    if (toDate && new Date(toDate) < now) {
      toast.error("Ngày kết thúc không thể nhỏ hơn ngày hiện tại");
      return;
    }

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      toast.error("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
      return;
    }

    const response = await axios.get('http://localhost:8080/get-api/get-summary', {
      params: {
        startDate: fromDate || "",
        endDate: toDate || "",
      },
    });

    const data = response?.data;
    setTotalRevenue(data?.totalAmount);
    setTotalOrders(data?.totalOrders);
    setTotalProducts(data?.totalProducts);
  };

  useEffect(() => {
    const fetchDataChart = async () => {
      const response = await axios.get('http://localhost:8080/get-api/get-revenue-by-year', {
        params: {
          year: year,
        },
      });
      const data = response?.data;
      console.log(data);
      setSeriesData(data);
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get-api/get-summary', {
      params: {
        startDate: "",
        endDate: "",
      },
    });

    const data = response?.data;
    setTotalRevenue(data?.totalAmount);
    console.log(data);
    setTotalOrders(data?.totalOrders);
    setTotalProducts(data?.totalProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    fetchDataChart();
  }, []);


  useEffect(() => {
    const fetchDataChart = async () => {
      const response = await axios.get('http://localhost:8080/get-api/get-revenue-by-year', {
        params: {
          year: year,
        },
      });
      const data = response?.data;
      console.log(data);
      setSeriesData(data);
    };
    fetchDataChart();
  }, [year]);

  return (
    <div>
      <h3 className="header pb-3 mb-3">Tổng Quan</h3>
      <div className="header-1">
        <div className="filter-overview d-flex align-items-center mb-4 w-50 gap-3">
        <div className="input-group">
          <span className="input-group-text" id="from-addon">
            Từ
          </span>
          <input
            type="date"
            className="form-control"
            id="from"
            aria-describedby="from-addon"
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text" id="to-addon">
            Đến
          </span>
          <input
            type="date"
            className="form-control"
            id="to"
            aria-describedby="to-addon"
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleFilterClick}>
          Lọc
        </button>
      </div>

        <div className="container-item-overview d-flex gap-3 justify-content-around">
        
          {/* Doanh thu trong ngày */}
          <div className="item-overview sales-in-day" style={{width: '32%'}}>
            <div className="d-flex align-items-center justify-content-center">
              <FaMoneyBill1Wave size={"50px"} />
              <div className="d-flex flex-column ms-4">
                <span className="fs-5">Doanh Thu</span>
                <span className="" style={{ fontSize: "18px" }}>
                  {totalRevenue ? (totalRevenue.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })) : (0)}
                </span>
              </div>
            </div>
          </div>

          {/* Số đơn hàng trong ngày */}
          <div className="item-overview order-in-day" style={{width: '32%'}}>
            <div className="d-flex align-items-center justify-content-center">
              <FaCartShopping size={"50px"} />
              <div className="d-flex flex-column ms-4">
                <span className="fs-5">Đơn Hàng</span>
                <span style={{ fontSize: "18px" }}>{
                  totalOrders && (`${totalOrders} đơn hàng`)
                }
                </span>
              </div>
            </div>
          </div>

          {/* Số sản phẩm bán ra trong ngày */}
          <div className="item-overview sell-in-day" style={{width: '32%'}}>
            <div className="d-flex align-items-center justify-content-center">
              <FaProductHunt size={"50px"} />
              <div className="d-flex flex-column ms-4">
                <span className="fs-5">Sản Phẩm</span>
                <span style={{ fontSize: "18px" }}>{
                  totalProducts && (`${totalProducts} sản phẩm`)
                }</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 chart-overview p-4">
          <h5 className="mb-0">
            Biểu Đồ Doanh Thu Theo Năm{" "}
            {
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            }
          </h5>

          <div id="chartOne">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
