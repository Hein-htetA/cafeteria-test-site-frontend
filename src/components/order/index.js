import React from "react";
import { useAppContext } from "../../Context/context";
import "./index.css";
import SingleOrder from "./SingleOrder";

const Order = () => {
  const { data } = useAppContext();
  return (
    <main className="order-container">
      <h3>Order Queue</h3>
      {data.map((order) => {
        return <SingleOrder {...order} key={order.id} />;
      })}
    </main>
  );
};

export default Order;
