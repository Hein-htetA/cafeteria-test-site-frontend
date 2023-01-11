import React from "react";
import { useOrderContext } from "../../Context/OrderContext";

import { displayOrder } from "../order";

import "../newOrder/index.css";
import { useSelector } from "react-redux";

const RecycleBin = () => {
  const orderData = useSelector((state) => state.order.orderData);
  const status = useSelector((state) => state.order.status);

  return (
    <div className="trashbin-container">
      <div className="trashbin-title">Recycle Bin</div>
      {displayOrder(orderData, "recycleBin", status)}
    </div>
  );
};

export default RecycleBin;
