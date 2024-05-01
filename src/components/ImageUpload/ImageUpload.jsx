import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import icon X từ thư viện react-icons

const ImageUpload = ({  onAvatarChange }) => {
    // console.log("avatar: " + avatar);
  const [selectedImage, setSelectedImage] = useState(null); // State lưu trữ ảnh đã chọn

  // Hàm xử lý sự kiện khi chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy file ảnh từ sự kiện change
    console.log(file);
    if (file) {
      // Kiểm tra xem có file được chọn hay không
      const reader = new FileReader();
      reader.onloadend = () => {
        // Sau khi đọc file thành công, cập nhật state selectedImage với URL của ảnh
        setSelectedImage(reader.result);
        onAvatarChange(reader.result); // Cập nhật avatar trong state user
      };
      reader.readAsDataURL(file); // Đọc file ảnh thành URL
    }
  };

  // Hàm xử lý sự kiện khi click vào icon X để xóa ảnh
  const handleRemoveImage = () => {
    setSelectedImage(null); // Xóa ảnh bằng cách cập nhật state selectedImage thành null
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Input file ẩn */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="imageInput"
      />
      {/* Hiển thị ảnh đã chọn */}
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: "100px", height: "100px", objectFit: "fill", borderRadius: "50%"}}
        />
      )}
      {/* Icon X để xóa ảnh */}
      {selectedImage && (
        <FaTimes
          onClick={handleRemoveImage}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "3px",
          }}
        />
      )}
      {/* Button để mở input file */}
      {!selectedImage && (
        <button
          onClick={() => document.getElementById("imageInput").click()}
          className="btn btn-primary"
        type="button"
          style={{ width: "100px", height: "40px", padding: "0"}}
        >
          Chose Avatar
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
