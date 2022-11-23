import React, { useState } from "react";
import "./OrderNav.css";

const OrderNav = (props) => {
  const { queue, newOrder, delivery, onClick1, onClick2, onClick3 } = props;

  return (
    <div className="order-nav-container">
      <button
        className={queue ? "order-nav-btn order-nav-btn-show" : "order-nav-btn"}
        onClick={onClick1}
      >
        Order Queue
      </button>
      <div>/</div>
      <button
        className={
          newOrder ? "order-nav-btn order-nav-btn-show" : "order-nav-btn"
        }
        onClick={onClick2}
      >
        New Orders
      </button>
      <div>/</div>
      <button
        className={
          delivery ? "order-nav-btn order-nav-btn-show" : "order-nav-btn"
        }
        onClick={onClick3}
      >
        On Delivery
      </button>
    </div>
  );
};

export default OrderNav;
