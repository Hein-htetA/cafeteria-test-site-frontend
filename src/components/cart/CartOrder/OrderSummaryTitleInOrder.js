import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DetailShowHideBtn from "./DetailShowHideBtn";

const OrderSummaryTitleInOrder = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "1.1rem",
        marginRight: "auto",
      }}
    >
      <FontAwesomeIcon icon={faClipboard} />{" "}
      <div>
        Order Summary
        <DetailShowHideBtn />
      </div>
    </div>
  );
};

export default OrderSummaryTitleInOrder;
