import React from "react";
import "./index.css";
import SingleOrder from "./SingleOrder";

const Order = () => {
  return (
    <main className="order-container">
      <h3>Orders</h3>
      <SingleOrder />
      <SingleOrder />
      <SingleOrder />
      <SingleOrder />
    </main>
  );
};

export default Order;
