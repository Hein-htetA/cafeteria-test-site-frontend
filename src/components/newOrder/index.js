import React from "react";
import "./index.css";
import { displayOrder } from "../order";
import LoadingOrder from "../order/OrderStates/LoadingOrder";
import ConnectionError from "../order/OrderStates/ConnectionError";
import { useSelector } from "react-redux";

const NewOrder = () => {
  const orderData = useSelector((state) => state.order.orderData);
  const status = useSelector((state) => state.order.status);
  const statusAfterSSEFailed = useSelector(
    (state) => state.order.statusAfterSSEFailed
  );

  return (
    <div className="trashbin-container">
      <div className="new-order-title">
        <div className="trashbin-title">New Orders</div>
      </div>

      {displayOrder(orderData, "newOrder", status)}
      <div style={{ height: "15px" }}></div>
      {statusAfterSSEFailed === "loading" && <LoadingOrder />}
      {statusAfterSSEFailed === "failed" && <ConnectionError />}
    </div>
  );
};

export default NewOrder;
