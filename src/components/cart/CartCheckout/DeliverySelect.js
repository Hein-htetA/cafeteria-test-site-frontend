import React from "react";
import { useCartContext } from "../../../Context/CartContext";
import "./DeliverySelect.css";

const DeliverySelect = ({ requestDelivery, onChangeInput }) => {
  const { checkout } = useCartContext();
  return (
    <div>
      <select
        name="requestDelivery"
        id="delivery"
        className="deli-select"
        value={requestDelivery}
        onChange={onChangeInput}
        disabled={!checkout.deliveryService}
      >
        <option value="true">Request Delivery</option>
        <option value="false">Pick-Up at Restaurant</option>
      </select>
      {!checkout.deliveryService && (
        <div className="delivery-not-available-text">
          This restaurant doesn't offer delivery service
        </div>
      )}
    </div>
  );
};

export default DeliverySelect;
