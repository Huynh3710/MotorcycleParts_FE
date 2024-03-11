// import axios from 'axios';
import React, { useEffect } from 'react'
import axiosPublic from '../api/axiosPublic';

const GetAllSpareParts = () => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosPublic.get("/get-api/get-all");
            console.log(response.data); // Hiển thị dữ liệu từ phản hồi
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };
        fetchData();
      }, []);
  // return (
    
  // )
}

export default GetAllSpareParts