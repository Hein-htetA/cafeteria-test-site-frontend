import React from "react";
import "./DeliverySelect.css";

const DeliverySelect = () => {
  return (
    <select name="delivery" id="delivery" className="deli-select">
      <option value="delivery">Request Delivery</option>
      <option value="pickUp">Pick-Up at Restaurant</option>
    </select>
  );
};

export default DeliverySelect;
