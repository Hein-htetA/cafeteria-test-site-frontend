import React from "react";
import BackToCart from "./BackToCart";
import "./index.css";
import PlaceOrderBtn from "./PlaceOrderBtn";

const CheckoutBtn = ({
  handlePlaceOrder,
  placeOrderLoading,
  placeOrderError,
}) => {
  return (
    <div className="checkout-btn-container">
      <BackToCart />
      <PlaceOrderBtn
        handlePlaceOrder={handlePlaceOrder}
        placeOrderError={placeOrderError}
        placeOrderLoading={placeOrderLoading}
      />
    </div>
  );
};

export default CheckoutBtn;
