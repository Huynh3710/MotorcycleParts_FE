import React, { useState } from 'react';
import './SearchBar.css'; // Đảm bảo bạn đã import file CSS tương ứng

const SearchBar = ({sizeButton, placeholder}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        // Xử lý searchTerm tại đây
        console.log(`Từ khóa tìm kiếm: ${searchTerm}`);
    };
    const buttonWitdh = sizeButton ? sizeButton +"%" : '10%';
    // console.log('button widyh: '+buttonWitdh);
    return (
        <form onSubmit={handleSubmit} className="d-flex">
            <input
                className="form-control form-control-extra-sm me-2"
                type="search"
                placeholder={placeholder ? placeholder : "Tìm kiếm"}
                aria-label="Tìm kiếm"
                value={searchTerm}
                onChange={handleChange}
            />
            <button className="btn btn-outline-success btn-extra-sm" type="submit" style={{width: `${buttonWitdh}`}}>Tìm kiếm</button>
        </form>
    );
};

export default SearchBar;
