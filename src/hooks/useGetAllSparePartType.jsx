import { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import axios from "axios";



//nhóm phụ tùng
const useGetSparePartType = () => {
  const [SparePartsType, setparePartsType] = useState(null);
  const [MotorType, setMotorType] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/get-api/spares-parts-type/get-all-spare-parts-type");
        // console.log(response);
        setparePartsType(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cần khác phục: ", error);
      }
    };
    const fetchMotorType = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-api/get-all-motor-type");
        // console.log(response);
        setMotorType(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cần khác phục: ", error);
      }
    }
    fetchMotorType();
    fetchData();
  }, []);

  return { SparePartsType, MotorType };
};

export default useGetSparePartType;
