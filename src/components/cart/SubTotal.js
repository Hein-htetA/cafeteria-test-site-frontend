import React from "react";
import DeliveryFee from "./DeliveryFee";
import ItemPrice from "./ItemPrice";
import TwoColumnGridContainer from "./TwoColumnGridContainer";

const SubTotal = () => {
  return (
    <TwoColumnGridContainer>
      <div style={{ fontSize: "1rem", fontWeight: "bold" }}>Subtotal</div>
      <ItemPrice />
      <DeliveryFee />
    </TwoColumnGridContainer>
  );
};

export default SubTotal;
