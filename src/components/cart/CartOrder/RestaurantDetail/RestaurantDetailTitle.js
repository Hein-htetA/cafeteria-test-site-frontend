import React from "react";
import DetailShowHideBtn from "../DetailShowHideBtn";

const RestaurantDetailTitle = ({
  hideRestaurantDetails,
  type,
  orderId,
  showHideOrderHistory,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "1.1rem",
        marginRight: "auto",
        marginBottom: "10px",
      }}
    >
      <div>
        Restaurant Details
        <DetailShowHideBtn
          hide={hideRestaurantDetails}
          type={type}
          showHideOrderHistory={showHideOrderHistory}
          orderId={orderId}
        />
      </div>
    </div>
  );
};

export default RestaurantDetailTitle;
