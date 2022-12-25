import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./OrderStatus.css";

const OrderStatus = () => {
  return (
    <div className="order-status-container">
      <select
        name="status"
        id="status"
        className="order-status-select order-status-select-received"
      >
        <option value="received">Order Received</option>
        <option value="accepted">Order Accepted</option>
        <option value="onDelivery">On Delivery</option>
        <option value="history">Order Completed</option>
      </select>
      <div className="status-time">
        <FontAwesomeIcon icon={faClock} style={{ marginRight: "2px" }} />
        3:03 AM
      </div>
    </div>
  );
};

export default OrderStatus;
