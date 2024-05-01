import { useState, useEffect } from "react";
import axios from "axios";
// import Cart from "../pages/Cart/Cart";

const useAddToCart = (CartItems) => {
  console.log(CartItems);
  const cartId = localStorage.getItem("cartId");
  //gửi về server
  const [cart, setCart] = useState({});

  const addToCart = async (quanlity) => {
    const price =
    CartItems.discount !== null
      ? CartItems.unitPrice -
        CartItems.unitPrice * (CartItems.discount.discount / 100)
      : CartItems.unitPrice;

    const tempCart = {
      cartId: parseInt(cartId),
      sparePartId: CartItems.id,
      quantity: quanlity,
      price: price,
    };
    // console.log(tempCart);
    setCart(tempCart);
    console.log(tempCart);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/user-cart/add-to-cart`,
        tempCart,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItems = async () => {
    console.log("id product: " + CartItems.id);
    try {
      axios.delete(
        `http://localhost:8080/api/v1/user-cart/delete-cart/${cartId}&${CartItems.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const response = await getAllCart();
      console.log("data cart after delete: " + response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user-cart/cart=${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { addToCart, deleteCartItems, getAllCart };
};

export default useAddToCart;
