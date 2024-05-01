import React, { memo } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCart from "../../hooks/useCart";
import "./CartItemsMainPageStyle.css";
import { routeImage } from "../../api/apiGetImage";
const CartItemsMainPage = ({
  CartItems,
  widthItemMainPage = 100,
  heightImgae = 100,
  heightBodyItem = 100,
}) => {
  // console.log(CartItems.id);
  const navigate = useNavigate();
  const { addToCart } = useCart(CartItems);

  const hanldeProductDetail = () => {
    navigate("/product-detail", { state: { sparePartsId: CartItems.id } });
  };

  const handleCartClick = (event) => {
    event.stopPropagation();
  };
  const handleAddToCart = (event) => {
    if (localStorage.getItem("customerId")) {
      event.stopPropagation();
      // addToCart(CartItems.id);
      addToCart(1);
      // alert("Thêm vào giỏ hàng thành công");
      toast.success("Thêm vào giỏ hàng thành công");
    } else {
      // alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
    }
  };

  return (
    <div
      className="cart-items d-flex flex-column justify-content-between"
      style={{ width: `${widthItemMainPage}%` }}
      onClick={hanldeProductDetail}
    >
      <div className="mb-3 " style={{ height: `${heightImgae}%` }}>
        {/* <img src={CartItems.image} alt="" className="image-cart-items" /> */}
        <img
          src={`${routeImage}${CartItems.id}`}
          alt=""
          className="image-cart-items"
        />
      </div>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ height: `${heightBodyItem}%` }}
      >
        <div className="content-cart-items mb-3">
          <h5 className="name-product">{CartItems.name}</h5>
        </div>
        <div className="price-cart-items d-flex justify-content-around align-items-center">
          {/* <h4 className="price-product m-0">{Number(CartItems.unitPrice).toLocaleString('vi-VN')}đ</h4> */}
          <h4 className="price-product m-0">
            {CartItems?.discount
              ? Number(
                  CartItems.unitPrice -
                    CartItems.unitPrice * (CartItems?.discount?.discount / 100)
                ).toLocaleString("vi-VN") + "đ"
              : Number(CartItems.unitPrice).toLocaleString("vi-VN") + "đ"}
          </h4>
          <div
            className="btn-add-carts-items d-flex justify-content-center align-items-center"
            onClick={handleCartClick}
          >
            {/* <Link to={"/cart"}><FaCartPlus size={"35px"} className="cart-icon-mainpage"/></Link> */}
            <div
              className="btn-add-carts-items d-flex justify-content-center align-items-center"
              onClick={handleAddToCart}
            >
              <FaCartPlus size={"35px"} className="cart-icon-mainpage" />
              {/* <ToastContainer /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItemsMainPage);
