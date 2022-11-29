import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./EmptyOrder.css";

const EmptyOrder = () => {
  return (
    <div className="empty-box">
      <div>...</div>
      <FontAwesomeIcon icon={faTruckFast} fade />
    </div>
  );
};

export default EmptyOrder;
