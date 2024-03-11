import React from "react";

const CartItemsGroupParts = ({groupParts}) => {
  return (
    <div className="group-parts-items rounded-2">
      <div className="container-image-group-parts">
        <img className="image-group-parts" src="https://ik.imagekit.io/Huynh3710/BrandParts/LightSpeed.png?updatedAt=1709736232301" alt="" style={{width: "100%"}}/>
        <p></p>
      </div>
      <div className="group-parts-content justify-content-center">
        <h6 className="text-center">{groupParts.name}</h6>
      </div>
    </div>
  );
};

export default CartItemsGroupParts;
