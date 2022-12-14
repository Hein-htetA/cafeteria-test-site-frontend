import React from "react";
import "./RegisterDelivery.css";

const RegisterDelivery = (props) => {
  const { delivery, onChangeInput } = props;
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
