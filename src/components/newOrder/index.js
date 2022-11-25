import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import SingleOrder from "../order/SingleOrder";

const NewOrder = () => {
  const { data } = useOrderContext();
  return (
    <div className="trashbin-container">
      <div className="trashbin-title">New Orders</div>
      {data
        .filter(
          (order) => order.orderState === "order" && order.status === "received"
        )
        .map((order) => (
          <SingleOrder {...order} key={order.id} />
        ))}
    </div>
  );
};

export default NewOrder;
