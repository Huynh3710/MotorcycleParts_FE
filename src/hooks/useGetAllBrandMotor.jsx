import { useState, useEffect } from 'react';
import axiosPublic from '../api/axiosPublic';


//phụ tùng thay thế
const useGetAllSpareParts = () => {
  const [allBrandMotor, setAllBrandMotor] = useState([]);
  const [allBrandParts, setAllBrandParts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("http://localhost:8080/get-api/get-all-brand-motor");
        setAllBrandMotor(response.data); // Lưu dữ liệu từ phản hồi
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    const getBrandParts = async () => {
      try {
        const response = await axiosPublic.get("http://localhost:8080/get-api/brand-parts/get-all-brand-parts");
        setAllBrandParts(response.data); // Lưu dữ liệu từ phản hồi
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }
    getBrandParts();
    fetchData();
  }, []);


  return { allBrandMotor, allBrandParts };
};

export default useGetAllSpareParts;