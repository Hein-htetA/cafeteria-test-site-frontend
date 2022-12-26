import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EmptyCheckout = () => {
  return (
    <div className="empty-cart-container">
      <p className="empty-cart-text">No Item in Checkout</p>
    </div>
  );
};

export default EmptyCheckout;
