import React from "react";
import "./RestaurantStatus.css";

const RestaurantStatus = ({ status, onChangeInput, disabled }) => {
  return (
    <div className="status-container">
      <select
        name="status"
        value={status}
        onChange={onChangeInput}
        disabled={disabled}
      >
        <option value="open">We Are Open</option>
        <option value="closed">Sorry We Are Closed!</option>
      </select>
    </div>
  );
};

export default RestaurantStatus;
