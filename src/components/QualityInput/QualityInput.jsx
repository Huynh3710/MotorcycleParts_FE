import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import "./QualityInputStyle.css";
import useGetShippingRate from "../../hooks/useGetShippingRate";
const QualityInput = ({ unitPrice, quantity, setQuantity }) => {
  // const [quantity, setQuantity] = useState(1);
  const { shippingRate } = useGetShippingRate();
  const [totalPrice, setTotalPrice] = useState(unitPrice);
  console.log(quantity);
  const handleAdd = (e) => {
    quantity > 0 && setQuantity(quantity + 1);
    setTotalPrice(((quantity + 1) * unitPrice).toFixed(1));
  };
  const handleSub = (e) => {
    quantity > 1 && setQuantity(quantity - 1);
    quantity > 1 && setTotalPrice(((quantity - 1) * unitPrice).toFixed(1));
  };
  const handleChange = (e) => {
    if (e.target.value < 1) {
      setTotalPrice(((quantity + 1) * unitPrice).toFixed(1));
      return setQuantity(1);
    } else {
      setQuantity(parseInt(e.target.value));
      return setTotalPrice((e.target.value * unitPrice).toFixed(1));
    }
  };
  useEffect(() => {
    setTotalPrice(unitPrice);
  }, [unitPrice]);
  return (
    <div>
      <div className="d-flex gap-1">
        <button className="addBtn rounded-2 quan-border" onClick={handleSub}>
          <RiSubtractLine />
        </button>
        <input
          className="rounded-2 quan-border"
          type="text"
          value={quantity}
          style={{ width: "40px", textAlign: "center" }}
          onChange={handleChange}
        />
        <button className="subBtn rounded-2 quan-border" onClick={handleAdd}>
          <MdAdd />
        </button>
      </div>
      <div className="temp-price mt-2">
        <div className="d-flex justify-content-between">
          <div>
            <h6>Tạm tính</h6>
            <h4 className="text-danger">
              {" "}
              {Number(totalPrice).toLocaleString("vi-VN")}đ
            </h4>
          </div>
          <div>
            <h6>Phí Vận chuyển</h6>
            <h4 className="text-danger">
              {isNaN(shippingRate)
                ? "0đ"
                : Number(shippingRate).toLocaleString("vi-VN") + "đ"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityInput;
