import React from "react";
import DeliveryFee from "./DeliveryFee";
import ItemPrice from "./ItemPrice";
import TwoColumnGridContainer from "./TwoColumnGridContainer";

const SubTotal = ({ amount, deliveryFee }) => {
  return (
    <TwoColumnGridContainer>
      <div style={{ fontSize: "1rem", fontWeight: "bold" }}>Subtotal</div>
      <ItemPrice amount={amount} />
      <DeliveryFee deliveryFee={deliveryFee} />
    </TwoColumnGridContainer>
  );
};

export default SubTotal;
