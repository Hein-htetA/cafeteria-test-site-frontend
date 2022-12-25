import React from "react";
import "./RegisterDelivery.css";

const RegisterDelivery = (props) => {
  const { delivery, onChangeInput, isOwner } = props;
  return (
    <>
      <div>
        <label>Delivery</label>
      </div>
      <div>:</div>
      <div>
        <select
          name="delivery"
          id="delivery"
          className="delivery-select"
          onChange={onChangeInput}
          value={delivery}
          disabled={!isOwner}
        >
          <option value={"Available"}>Available</option>
          <option value={"Unavailable (Pick-up Only)"}>
            Unavailable (Pick-up Only)
          </option>
        </select>
      </div>
    </>
  );
};

export default RegisterDelivery;
