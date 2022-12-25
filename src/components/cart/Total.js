import React from "react";
import ItemPrice from "./ItemPrice";
import TwoColumnGridContainer from "./TwoColumnGridContainer";

const Total = ({ amount }) => {
  return (
    <div style={{ padding: "5px 5px", margin: "5px 0px -10px 0px" }}>
      <TwoColumnGridContainer>
        <div style={{ fontSize: "1rem", fontWeight: "bold" }}>Total</div>
        <ItemPrice amount={amount} />
      </TwoColumnGridContainer>
    </div>
  );
};

export default Total;
