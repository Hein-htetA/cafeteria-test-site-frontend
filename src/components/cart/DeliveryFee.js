import React from "react";
import ItemPrice from "./ItemPrice";

const DeliveryFee = ({ deliveryFee }) => {
  return (
    <>
      <div>Delivery Fee</div>
      <ItemPrice amount={deliveryFee} />
    </>
  );
};

export default DeliveryFee;
