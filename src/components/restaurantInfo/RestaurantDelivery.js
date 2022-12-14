import React from "react";

const RestaurantDelivery = (props) => {
  const { delivery } = props;
  return (
    <>
      <div>
        <label>Delivery</label>
      </div>
      <div>:</div>
      <div>{delivery}</div>
    </>
  );
};

export default RestaurantDelivery;
