import React from "react";
import { useDispatch } from "react-redux";
import { closePlaceOrderError } from "../../../../features/cartSlice";
import "./CheckoutError.css";

const CheckoutError = () => {
  const dispatch = useDispatch();
  return (
    <div className="checkout-loading-container">
      <div className="checkout-error-body">
        <div className="checkout-error-text1">Something went wrong!</div>
        <div className="checkout-error-text2">Try Again Later</div>
        <button
          className="close-btn"
          onClick={() => dispatch(closePlaceOrderError())}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default CheckoutError;
