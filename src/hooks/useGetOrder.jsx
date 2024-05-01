import axios from "axios";


const useGetOrder = () => {
  // console.log(CartItems);
  
  const getUserNameById = async (id) => {
    // console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:8080/get-api/get-customer-name-by-id/${id}`
      );
      // console.log(response.data);
      return(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllOrder = async () => {
    try {
     const response = await axios.get(
        `http://localhost:8080/get-api/get-all-orders-by-admin`,
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {getAllOrder, getUserNameById} ;
};



export default useGetOrder;
