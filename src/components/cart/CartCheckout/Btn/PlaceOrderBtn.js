import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PlaceOrderBtn = () => {
  return (
    <button className="checkout-btn">
      <div className="checkout-btn-text">Place Order</div>
      <FontAwesomeIcon icon={faAnglesRight} style={{ marginLeft: "auto" }} />
    </button>
  );
};

export default PlaceOrderBtn;
