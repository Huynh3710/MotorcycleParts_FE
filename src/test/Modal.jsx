import React, { useState, useEffect } from "react";
import axios from "axios";

const MyComponent = () => {
  const [recommendations, setRecommendations] = useState([]);
  console.log(recommendations);
  const userId = 202;
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://127.0.0.1:5000/recommendations/${userId}`);
      setRecommendations(response.data.recommendations);
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>Recommendations for User {userId}</h1>
      <ul>
        {/* {recommendations.map((product, index) => (
          <li key={index}>{product}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default MyComponent;
