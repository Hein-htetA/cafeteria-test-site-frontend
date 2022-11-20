import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import SingleOrder from "./SingleOrder";

const Order = () => {
  const { data } = useOrderContext();
  console.log("order index rerender");
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
