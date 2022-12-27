import React from "react";
import BackToCart from "./BackToCart";
import "./index.css";
import PlaceOrderBtn from "./PlaceOrderBtn";

const CheckoutBtn = ({ handlePlaceOrder }) => {
  return (
    <div className="checkout-btn-container">
      <BackToCart />
      <PlaceOrderBtn handlePlaceOrder={handlePlaceOrder} />
    </div>
  );
};

export default CheckoutBtn;
