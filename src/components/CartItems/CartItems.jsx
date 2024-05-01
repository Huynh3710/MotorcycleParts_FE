import React, { useContext, useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
// import useCart from "../../hooks/useCart";
import useCart from "../../hooks/useCart";
import { routeImage } from "../../api/apiGetImage";
import axios from "axios";
import "./CartItemsStyle.css";
import AuthContext from "../../context/AuthProvider";

const CartItems = ({
  CartItems,
  setDataCart,
  setPrice,
  selectedCartItem,
  checkAll,
}) => {
  const { setCartItemsIdCheckouts } = useContext(AuthContext); // Lấy setCartItemsIdCheckouts từ context
  const [Checked, setChecked] = useState(false); // Tạo state Checked để lưu trạng thái của checkbox
  console.log(CartItems);
  useEffect(() => {
    setChecked(checkAll);
    setCartItemsIdCheckouts((prevCartItemsIdCheckouts) => {
      if (checkAll) {
        return [...prevCartItemsIdCheckouts, CartItems.id];
      } else {
        return prevCartItemsIdCheckouts.filter((id) => id !== CartItems.id);
      }
    });
  }, [checkAll, CartItems.id, setCartItemsIdCheckouts]);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    setCartItemsIdCheckouts((prevCartItemsIdCheckouts) => {
      if (e.target.checked) {
        // Gọi hàm check khi checkbox được chọn
        // console.log("checked");
        setPrice(
          (prevValue) => prevValue + CartItems.price * CartItems.quantity
        );
      } else if (e.target.checked === false) {
        // Gọi hàm uncheck khi checkbox bị bỏ chọn
        // console.log("unchecked");
        setPrice((prevValue) =>
          Math.max(prevValue - CartItems.price * CartItems.quantity, 0)
        );
      }
      // Nếu ID đã tồn tại trong mảng thì loại bỏ, ngược lại thêm vào
      if (prevCartItemsIdCheckouts.includes(CartItems.id)) {
        return prevCartItemsIdCheckouts.filter((id) => id !== CartItems.id);
      } else {
        return [...prevCartItemsIdCheckouts, CartItems.id];
      }
    });
  };

  const { deleteCartItems, getAllCart } = useCart(CartItems);

  //button delete
  const handleDeleteCartItems = async (e) => {
    try {
      await deleteCartItems();
      const rsa = await getAllCart();
      setDataCart(rsa);
    } catch (error) {
      console.error(error);
    }
  };

  //change value quantity
  const handldeCartItemsQuan = async (e) => {
    const cartId = localStorage.getItem("cartId");
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/user-cart/update-quanlity?cartId=${cartId}&orderDetailId=${CartItems.id}&calculateMethod=change`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // setDataCart(response);
      setDataCart(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //button minus
  const cartItemsMinusbtn = async () => {
    const cartId = localStorage.getItem("cartId");
    setPrice((prevValue) => Math.max(prevValue - CartItems.price, 0));
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/user-cart/update-quanlity?cartId=${cartId}&orderDetailId=${CartItems.id}&calculateMethod=minus`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      setDataCart(response.data.reverse());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //button plus
  const cartItemsPlusbtn = async () => {
    const cartId = localStorage.getItem("cartId");
    let newPrice = selectedCartItem; // Giá mới mặc định ban đầu
    if (Checked) {
      // Nếu checkbox được check, cộng thêm giá tiền của sản phẩm
      newPrice += CartItems.price;
    }
    setPrice(newPrice);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/user-cart/update-quanlity?cartId=${cartId}&orderDetailId=${CartItems.id}&calculateMethod=plus`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // setDataCart(response);
      setDataCart(response.data.reverse());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-items d-flex align-items-center justify-content-between py-2 mt-1">
      <div className="cart-items-left d-flex align-items-center">
        <div>
          <input
            type="checkbox"
            className="cart-items-input"
            checked={Checked} // Trạng thái của checkbox
            onChange={handleCheckboxChange} // Gọi hàm xử lý khi checkbox thay đổi
          />
        </div>
        <div className="mx-4">
          <img
            className="cart-items-image"
            src={`${routeImage}${CartItems.spareParts.id}`}
            alt=""
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <div className="cart-items-infor">
          <div className="cart-items-name">
            <h4 className="m-0">
              {CartItems.spareParts ? CartItems.spareParts.name : "loading"}
            </h4>
          </div>
          <div className="cart-items-description mb-3">
            {CartItems?.spareParts?.discount
              ? `Đã áp dụng khuyến mãi ${CartItems?.spareParts?.discount?.discount}% (Giá gốc ${CartItems?.spareParts?.unitPrice}đ)`
              : "Chưa khuyến mãi"}
          </div>
          <div className="cart-items-functions d-flex gap-2 align-items-center">
            <div className="cart-items-quan-btn d-flex gap-0">
              <button className="cart-items-btn" onClick={cartItemsMinusbtn}>
                -
              </button>
              <input
                type="text"
                className="cart-items-quantity text-center"
                value={CartItems.quantity}
                onChange={handldeCartItemsQuan}
              />
              <button className="cart-items-btn" onClick={cartItemsPlusbtn}>
                +
              </button>
            </div>
            <div className="cart-items-delete-btn">
              <button
                className="cart-items-btn-delete h-100"
                style={{ color: "red" }}
                onClick={handleDeleteCartItems}
              >
                <IoTrash className="mb-1 h-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-items-right pe-5">
        <h4>{Number(CartItems?.price).toLocaleString("vi-VN")}đ</h4>
      </div>
    </div>
  );
};

export default CartItems;
