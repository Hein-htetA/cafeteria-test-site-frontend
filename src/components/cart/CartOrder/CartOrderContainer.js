import React from "react";
import "./CartOrderContainer.css";

const CartOrderContainer = ({ children, orderState }) => {
  return (
    <div
      className={
        orderState === "newOrder"
          ? "cart-order-container cart-order-container-received"
          : orderState === "order"
          ? "cart-order-container cart-order-container-accepted"
          : orderState === "onDelivery"
          ? "cart-order-container cart-order-container-onDelivery"
          : orderState === "recycleBin"
          ? "cart-order-container cart-order-container-recycleBin"
          : "cart-order-container cart-order-container-completed"
      }
    >
      {children}
    </div>
  );
};

export default CartOrderContainer;
