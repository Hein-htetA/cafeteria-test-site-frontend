import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DetailShowHideBtn from "./DetailShowHideBtn";

const OrderSummaryTitleInOrder = ({
  hideOrderSummary,
  showHideOrderHistory,
  orderId,
  type,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "1.1rem",
        marginRight: "auto",
        marginBottom: "15px",
      }}
    >
      <FontAwesomeIcon icon={faClipboard} />
      <div>
        Order Summary
        <DetailShowHideBtn
          hide={hideOrderSummary}
          showHideOrderHistory={showHideOrderHistory}
          type={type}
          orderId={orderId}
        />
      </div>
    </div>
  );
};

export default OrderSummaryTitleInOrder;
