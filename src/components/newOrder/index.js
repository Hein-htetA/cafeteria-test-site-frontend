import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import { displayOrder } from "../order";
import LoadingOrder from "../order/OrderStates/LoadingOrder";
import ConnectionError from "../order/OrderStates/ConnectionError";
import { useSelector } from "react-redux";

const NewOrder = () => {
  // const { data, orderLoading, orderError, sseUpdateLoading, sseUpdateError } =
  //   useOrderContext();

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
      {statusAfterSSEFailed === "loading" && <LoadingOrder />}
      {statusAfterSSEFailed === "failed" && <ConnectionError />}
    </div>
  );
};

export default NewOrder;
