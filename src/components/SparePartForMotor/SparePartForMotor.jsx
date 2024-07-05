import React from "react";
import "./SparePartForMotor.css";
import { routeImageCarType } from "../../api/apiGetImage";
import { useNavigate } from "react-router-dom";

const SparePartForMotor = ({ MotorType }) => {
  // console.log(MotorType);
  const navigate = useNavigate();
  const handleProductByMotor = () => {
    navigate(`/product?type=part-type&typeMotorId=${MotorType.id}`);
  }
  return (
    <div className="group-parts-items rounded-2" onClick={handleProductByMotor}>
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
