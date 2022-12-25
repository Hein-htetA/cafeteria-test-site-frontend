import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BackToCart = () => {
  return (
    <button className="checkout-btn">
      <FontAwesomeIcon icon={faAnglesLeft} style={{ marginRight: "auto" }} />
      <div className="checkout-btn-text">Back To Cart</div>
    </button>
  );
};

export default BackToCart;
