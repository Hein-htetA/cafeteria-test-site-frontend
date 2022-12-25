import React from "react";
import { NavLink } from "react-router-dom";
import "./CartNavBar.css";

const CartNavBar = () => {
  return (
    <div>
      <div
        className="restaurant-nav-link-container"
        style={{ fontSize: "0.8rem" }}
      >
        <NavLink
          to={"cartMenu"}
          className={({ isActive }) =>
            isActive ? "menu-info-link menu-info-link-active" : "menu-info-link"
          }
        >
          Cart
        </NavLink>
        <NavLink
          to={"cartCheckout"}
          className={({ isActive }) =>
            isActive ? "menu-info-link menu-info-link-active" : "menu-info-link"
          }
        >
          Checkout
        </NavLink>
        <NavLink
          to={"cartOrder"}
          className={({ isActive }) =>
            isActive ? "cart-order-nav cart-order-nav-active" : "cart-order-nav"
          }
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default CartNavBar;
