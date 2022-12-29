import React from "react";
import "./DetailShowHideBtn.css";

const DetailShowHideBtn = ({ hide, showHideOrderHistory, type, orderId }) => {
  return (
    <button
      className="detail-show-hide-btn"
      onClick={() => showHideOrderHistory(orderId, type)}
    >
      {hide ? "show" : "hide"}
    </button>
  );
};

export default DetailShowHideBtn;
