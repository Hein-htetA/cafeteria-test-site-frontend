import React from "react";
import "./CheckoutLoading.css";

const CheckoutLoading = () => {
  return (
    <div className="checkout-loading-container">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default CheckoutLoading;
