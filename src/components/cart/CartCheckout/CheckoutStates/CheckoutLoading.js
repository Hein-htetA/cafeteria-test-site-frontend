import React from "react";
import "./CheckoutLoading.css";

const CheckoutLoading = () => {
  return (
    <div className="checkout-loading-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default CheckoutLoading;
