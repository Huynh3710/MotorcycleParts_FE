import React, { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";

const useGetSparePartsById = (sparePartsId) => {
  const [sparePartsById, setSparePartsById] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(
          `/get-api/spare-parts/get-spare-parts-by-id=${sparePartsId}`
        );
        setSparePartsById(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);   
  return {sparePartsById};
};

export default useGetSparePartsById;
