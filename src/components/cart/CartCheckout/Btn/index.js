import React from "react";
import BackToCart from "./BackToCart";
import "./index.css";
import PlaceOrderBtn from "./PlaceOrderBtn";

const CheckoutBtn = () => {
  return (
    <div className="checkout-btn-container">
      <BackToCart />
      <PlaceOrderBtn />
    </div>
  );
};

export default CheckoutBtn;
