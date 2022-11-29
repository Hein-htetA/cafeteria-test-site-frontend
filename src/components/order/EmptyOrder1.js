import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./EmptyOrder.css";

const EmptyOrder1 = () => {
  return (
    <div className="empty-box">
      <FontAwesomeIcon icon={faKitchenSet} bounce />
    </div>
  );
};

export default EmptyOrder1;
