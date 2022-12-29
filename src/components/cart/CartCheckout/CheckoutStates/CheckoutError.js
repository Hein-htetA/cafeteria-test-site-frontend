import React from "react";
import "./CheckoutError.css";

const CheckoutError = ({ closePlaceOrderError }) => {
  return (
    <div className="checkout-loading-container">
      <div className="checkout-error-body">
        <div className="checkout-error-text1">Something went wrong!</div>
        <div className="checkout-error-text2">Try Again Later</div>
        <button className="close-btn" onClick={closePlaceOrderError}>
          close
        </button>
      </div>
    </div>
  );
};

export default CheckoutError;
