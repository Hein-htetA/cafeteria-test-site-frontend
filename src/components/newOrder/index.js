import React from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./index.css";
import SingleOrder from "../order/SingleOrder";
import { displayOrder } from "../order";
import { useUiContext } from "../../Context/UserContext";
import LoadingOrder from "../order/OrderStates/LoadingOrder";
import ConnectionError from "../order/OrderStates/ConnectionError";

const NewOrder = () => {
  const { data, orderLoading, orderError, sseUpdateLoading, sseUpdateError } =
    useOrderContext();

  return (
    <div className="trashbin-container">
      <div className="new-order-title">
        <div className="trashbin-title">New Orders</div>
      </div>

      {displayOrder(data, "newOrder", orderLoading, orderError)}
      {sseUpdateLoading && <LoadingOrder />}
      {sseUpdateError && <ConnectionError />}
    </div>
  );
};

export default NewOrder;
