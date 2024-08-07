import { useState, useEffect } from 'react';
import axiosPublic from '../api/axiosPublic';


//phụ tùng thay thế
const useGetAllSpareParts = () => {
  const [allSpareParts, setAllSpareParts] = useState(null);
  const [proposeParts, setProposeParts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/get-api/spare-parts/get-all-parts");
        setAllSpareParts(response.data); // Lưu dữ liệu từ phản hồi
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        
      }
    };
    const fetchProposeParts = async () => {
      try {
        const response = await axiosPublic.get("/get-api/spare-parts/get-propose-parts");
        setProposeParts(response.data); // Lưu dữ liệu từ phản hồi
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        
      }
    }
    fetchData();
  }, []);

  return { allSpareParts, proposeParts };
};

export default useGetAllSpareParts;