import axios from "axios";

const useReview = () => {
    const getReviewBySparePartId = async (sparePartId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/get-api/by-sparePartsId/${sparePartId}`
            );
            
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const getReviewBySparePartIdAndCusId = async (sparePartId,customerId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/get-api/by-sparePartsId-and-customerId/${sparePartId}/${customerId}`
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }


    return { getReviewBySparePartId, getReviewBySparePartIdAndCusId };
}
export default useReview;