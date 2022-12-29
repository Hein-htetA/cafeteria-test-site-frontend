import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./OrderStatus.css";

const OrderStatus = ({ orderState }) => {
  return (
    <div className="order-status-container">
      <select
        name="status"
        id="status"
        className={
          orderState === "newOrder"
            ? "order-status-select order-status-select-received"
            : orderState === "order"
            ? "order-status-select order-status-select-accepted"
            : orderState === "onDelivery"
            ? "order-status-select order-status-select-onDelivery"
            : orderState === "recycleBin"
            ? "order-status-select order-status-select-recycleBin"
            : "order-status-select order-status-select-completed"
        }
        disabled
        value={orderState}
      >
        <option value="received">Order Received</option>
        <option value="order">Order Accepted</option>
        <option value="onDelivery">On Delivery</option>
        <option value="history">Order Completed</option>
        <option value="recycleBin">Rejected</option>
      </select>
      <div className="status-time">
        <FontAwesomeIcon icon={faClock} style={{ marginRight: "2px" }} />
        3:03 AM
      </div>
    </div>
  );
};

export default OrderStatus;
