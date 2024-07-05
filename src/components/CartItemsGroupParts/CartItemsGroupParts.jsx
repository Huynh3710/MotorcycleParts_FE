import React from "react";
import "./CartItemsGroupPartsStyle.css";
import {routeImageSparePart} from "../../api/apiGetImage";
import { useNavigate } from "react-router-dom";

const CartItemsGroupParts = ({groupParts}) => {
  const navigate = useNavigate();
  const handleProductByGroupPart = () => {
    navigate(`/product?type=part-type&typePartId=${groupParts.id}`);
  }
  return (
    <div className="group-parts-items rounded-2" onClick={handleProductByGroupPart}>
      <div className="container-image-group-parts px-2">
        <img className="image-group-parts rounded-2" src={`${routeImageSparePart}${groupParts.id}`} alt=""/>
        <p></p>
      </div>
      <div className="group-parts-content justify-content-center">
        <h5 className="text-center">{groupParts.name}</h5>
      </div>
    </div>
  );
};

export default CartItemsGroupParts;
