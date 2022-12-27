import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PlaceOrderBtn = ({ handlePlaceOrder }) => {
  return (
    <button className="checkout-btn" onClick={handlePlaceOrder}>
      <div className="checkout-btn-text">Place Order</div>
      <FontAwesomeIcon icon={faAnglesRight} style={{ marginLeft: "auto" }} />
    </button>
  );
};

export default PlaceOrderBtn;
