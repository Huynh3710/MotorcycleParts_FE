import React, { useState, useEffect } from 'react';

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + itemsPerPage) % data.length);
    }, 3000); // Thay đổi hình ảnh sau mỗi 3 giây

    return () => clearInterval(timer); // Dọn dẹp khi không cần thiết
  }, [data]);

  return (
    <div className="carousel">
      {data.slice(index, index + itemsPerPage).map((item, i) => (
        <div
          className={`carousel-item ${i === index ? 'active' : ''}`}
          key={i}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
