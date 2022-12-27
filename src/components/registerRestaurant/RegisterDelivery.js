import React from "react";
import "./RegisterDelivery.css";

const RegisterDelivery = (props) => {
  const { deliveryService, onChangeDeliverySelect, isOwner } = props;
  return (
    <>
      <div>
        <label>Delivery</label>
      </div>
      <div>:</div>
      <div>
        <select
          name="deliveryService"
          id="delivery"
          className="delivery-select"
          onChange={onChangeDeliverySelect}
          value={deliveryService}
          disabled={!isOwner}
        >
          <option value={true}>Available</option>
          <option value={false}>Unavailable (Pick-up Only)</option>
        </select>
      </div>
    </>
  );
};

export default RegisterDelivery;
