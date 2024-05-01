import { useState, useEffect } from 'react';
import axiosPublic from '../api/axiosPublic';


//phụ tùng thay thế
const useGetAllSpareParts = () => {
  const [allBrandMotor, setAllBrandMotor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("http://localhost:8080/get-api/get-all-brand-motor");
        setAllBrandMotor(response.data); // Lưu dữ liệu từ phản hồi
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  return { allBrandMotor };
};

export default useGetAllSpareParts;