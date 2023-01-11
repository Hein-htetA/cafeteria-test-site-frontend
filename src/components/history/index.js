import React from "react";
import { displayOrder } from "../order";
import { useSelector } from "react-redux";

const History = () => {
  const orderData = useSelector((state) => state.order.orderData);
  const status = useSelector((state) => state.order.status);

  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Completed Orders</div>
      {displayOrder(orderData, "history", status)}
    </div>
  );
};

export default History;
