import React from "react";
import { Outlet } from "react-router-dom";
import CartNavBar from "../cart/CartNavBar";
import "./CartSharedLayout.css";

const CartSharedLayout = () => {
  return (
    <div className="cart-shared-layout-container">
      <CartNavBar />
      <Outlet />
    </div>
  );
};

export default CartSharedLayout;
