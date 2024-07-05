import React, { useEffect, useState } from 'react'
import axios from 'axios'
const CompleteOrder = () => {
    // useEffect(() => {   
    //     const response = axios.get(`http://localhost:8080/api/v1/user-payment/orders/complete`)
    //     console.log(response.data);
    // }, [])
    const [data, setData] = useState()
    useEffect(() => {
      try {
        const fetchData = async () => {
          const response = await axios.get(`http://localhost:8080/api/v1/user-payment/orders/complete`)
          setData(response.data)
        }
        fetchData();
      } catch (error) {
        console.log(error);
      }
      
    }, [])

  return (
    <div>CompleteOrder</div>
  )
}

export default CompleteOrder