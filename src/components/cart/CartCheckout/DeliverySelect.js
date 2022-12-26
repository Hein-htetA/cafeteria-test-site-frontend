import React from "react";
import "./DeliverySelect.css";

const DeliverySelect = ({ delivery, onChangeInput }) => {
  return (
    <select
      name="delivery"
      id="delivery"
      className="deli-select"
      value={delivery}
      onChange={onChangeInput}
    >
      <option value="true">Request Delivery</option>
      <option value="false">Pick-Up at Restaurant</option>
    </select>
  );
};

export default DeliverySelect;
