import axios from "axios";
import { useEffect, useState } from "react";

const useGetShippingRate = () => {
  // console.log(CartItems);
  const [province, setProvince] = useState();
  const [shippingRate, setShippingRate] = useState();
  console.log(shippingRate);
  useEffect(() => {
    getShippingRate();
    getShippingRateByProvince(province);
  }, [province]);
  const getShippingRate = async () => {
    const customerId = localStorage.getItem("customerId");
    
    try {
      const response = await axios.get(
        `http://localhost:8080/get-api/get-address-default-by-customer-id/${customerId}`
      );
      setProvince(response?.data?.province);
      return response?.data?.province;
    } catch (error) {
      console.log(error);
    }
  };
  const getShippingRateByProvince = async (province) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/get-api/get-shipping-rate-by-id/${province}`
      );
      setShippingRate(response.data?.shippingRate);
    } catch (error) {
      console.log(error);
    }
  }

  return { province, shippingRate };
};

export default useGetShippingRate;
