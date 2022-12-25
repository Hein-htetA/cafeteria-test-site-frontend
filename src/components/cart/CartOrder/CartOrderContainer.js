import React from "react";
import "./CartOrderContainer.css";

const CartOrderContainer = ({ children }) => {
  return (
    <div className="cart-order-container cart-order-container-received">
      {children}
    </div>
  );
};

export default CartOrderContainer;
