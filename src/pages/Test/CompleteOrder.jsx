import React, { useEffect } from 'react'
import axios from 'axios'
const CompleteOrder = () => {
    useEffect(() => {   
        const response = axios.get(`http://localhost:8080/api/v1/user-payment/orders/complete`)
        console.log(response.data);
    }, [])
  return (
    <div>CompleteOrder</div>
  )
}

export default CompleteOrder