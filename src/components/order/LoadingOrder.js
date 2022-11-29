import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./EmptyOrder.css";

const LoadingOrder = () => {
  return (
    <div className="empty-box">
      <FontAwesomeIcon icon={faCircleNotch} style={{ fontSize: "3rem" }} spin />
    </div>
  );
};

export default LoadingOrder;
