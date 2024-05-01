import React from "react";
import "./CartItemsGroupPartsStyle.css";
import {routeImageSparePart} from "../../api/apiGetImage";

const CartItemsGroupParts = ({groupParts}) => {
  console.log(groupParts);
  return (
    <div className="group-parts-items rounded-2">
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
