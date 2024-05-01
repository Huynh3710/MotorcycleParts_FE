import React from "react";
import "./SparePartForMotor.css";
import { routeImageCarType } from "../../api/apiGetImage";

const SparePartForMotor = ({ MotorType }) => {
  console.log(MotorType);
  return (
    <div className="group-parts-items rounded-2">
      <div className="container-image-group-parts px-2">
        <img
          className="image-group-parts rounded-2"
          src={`${routeImageCarType}${MotorType.id}`}
          alt=""
        />
        <p></p>
      </div>
      <div className="group-parts-content justify-content-center">
        <h5 className="text-center">{MotorType?.name}</h5>
      </div>
    </div>
  );
};

export default SparePartForMotor;
