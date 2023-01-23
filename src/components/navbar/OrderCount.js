import React from "react";
import "./OrderCount.css";

const OrderCount = ({ count }) => {
  return <>{count > 0 && <div className="nav-order-count">{count}</div>}</>;
};

export default OrderCount;
