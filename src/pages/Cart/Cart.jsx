import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import CartItems from "../../components/CartItems/CartItems";
import "../Cart/CartStyle.css";
import useCart from "../../hooks/useCart";
import AuthContext from "../../context/AuthProvider";
import ModalPayment from "./ModalPayment";
import axios from "axios";
const Cart = () => {
  const { getAllCart } = useCart();
  const [dataCart, setDataCart] = useState([]);
  const { cartItemsIdCheckouts } = useContext(AuthContext);
  const [checkAll, setCheckAll] = useState(false);
  //giá khi click check box hoặc tăng giảm số lượng
  const [selectedCartItem, setSelectedCartItem] = useState(0);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      //list of orderItems
      const data = await getAllCart();
      setDataCart(data?.reverse());
      // setDataCart(data);
    };
    fetchData();
  }, []);

 useEffect(() => {
  if (checkAll) {
    // Tính toán lại giá tạm tính khi checkbox "Chọn tất cả" được click
    let totalPrice = 0;
    dataCart.forEach((item) => {
      if (item.quantity > 0) {
        totalPrice += item.price * item.quantity;
      }
    });
    setSelectedCartItem(totalPrice);
  } else {
    // Đặt giá tạm tính về 0 khi "Bỏ chọn tất cả"
    setSelectedCartItem(0);
  }
}, [checkAll, dataCart]);


  // console.log("cart item: "+cartItemsIdCheckouts);
  console.log(cartItemsIdCheckouts);
  //phí vận chuyển tính sao tính
  const shippingFee = 0;
  const total =
    selectedCartItem - shippingFee > 0
      ? (selectedCartItem - shippingFee).toFixed(1)
      : selectedCartItem - shippingFee;

  const [payment, setPayment] = useState({
    customerId: localStorage.getItem("customerId"),
    currency: "USD",
    amount: 10,
    orderDetailsId: cartItemsIdCheckouts,
  });

  useEffect(() => {
    setPayment({
      ...payment,
      orderDetailsId: cartItemsIdCheckouts,
    });
  }, [cartItemsIdCheckouts]);

  const handlePayment = async () => {
    try {
      console.log(payment);
      const response = await axios.post(
        "http://localhost:8080/api/v1/user-payment/orders/create",
        payment
      );
      const linkPayment = response.data.links[1].href;
      window.location.href = linkPayment;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = ()=>{
    setIsShow(false);
  }

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    // Tính toán lại giá tạm tính khi checkbox thay đổi
    let totalPrice = 0;
    dataCart.forEach((item) => {
      if (item.quantity > 0) {
        totalPrice += item.price * item.quantity;
      }
    });
    setSelectedCartItem(totalPrice);
  };

  return (
    <div className="CartWrapper " style={{ height: "100%" }}>
      <Nav />
      <div className="Cart d-flex gap-4">
        <div className="left-cart p-4" style={{ backgroundColor: "white" }}>
          <div className="cart-header">
            <h3 className="cart-title m-0">Shopping Cart</h3>
            <div className="cart-functions d-flex justify-content-between align-items-center p-2">
              <button className="btn-chose-all" onClick={handleCheckAll}>Chọn Tất Cả</button>
            </div>
          </div>

          {dataCart &&
            dataCart.map((e, index) => {
              return (
                <CartItems
                  key={index}
                  CartItems={e}
                  setDataCart={setDataCart}
                  getAllCart={getAllCart}
                  setPrice={setSelectedCartItem}
                  selectedCartItem={selectedCartItem}
                  checkAll={checkAll}
                />
              );
            })}
        </div>

        <div className="right-cart p-4" style={{ backgroundColor: "white" }}>
          <div className="cart-header">
            <h3 className="cart-title m-0">Order Summary</h3>
          </div>
          <div className="cart-summary">
            <div className="cart-summary-item d-flex justify-content-between mt-3">
              <span className="cart-summary-item-title ">Tạm Tính</span>
              <span className="cart-summary-item-price ">
                {selectedCartItem && Number(selectedCartItem).toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div className="cart-summary-item d-flex justify-content-between">
              <span className="cart-summary-item-title ">Phí Vận Chuyển</span>
              <span className="cart-summary-item-price ">{Number(shippingFee).toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="cart-summary-item d-flex justify-content-between mb-4">
              <span className="cart-summary-item-title ">Tổng Cộng</span>
              <span className="cart-summary-item-price ">{Number(total).toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="cart-summary-btn ">
              <button
                disabled={cartItemsIdCheckouts.length < 1}
                className="btn-checkout w-100"
                onClick={() => setIsShow(true)}
              >
                Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div>
      {isShow && <ModalPayment onClose={handleClose} selectedItems={cartItemsIdCheckouts} handlePayment={handlePayment}/>}
    </div>
  );
};

export default Cart;
