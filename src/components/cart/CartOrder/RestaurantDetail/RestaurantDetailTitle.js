import React from "react";
import DetailShowHideBtn from "../DetailShowHideBtn";

const RestaurantDetailTitle = () => {
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
        Restaurant Detail
        <DetailShowHideBtn />
      </div>
    </div>
  );
};

export default RestaurantDetailTitle;
