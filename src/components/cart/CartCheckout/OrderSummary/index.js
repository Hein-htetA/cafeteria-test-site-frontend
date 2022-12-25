import React from "react";
import OrderSummaryTitle from "./OrderSummaryTitle";
import "./index.css";
import SummaryGridContainer from "./SummaryGridContainer";
import CountName from "./CountName";
import ItemPrice from "../../ItemPrice";
import SubTotal from "../../SubTotal";

const OrderSummary = () => {
  return (
    <div className="order-summary-container">
      <SummaryGridContainer>
        <CountName />
        <ItemPrice />
        <CountName />
        <ItemPrice />
        <CountName />
        <ItemPrice />
      </SummaryGridContainer>
      <hr
        style={{
          border: "1px solid white",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      />
      <SubTotal />
    </div>
  );
};

export default OrderSummary;
