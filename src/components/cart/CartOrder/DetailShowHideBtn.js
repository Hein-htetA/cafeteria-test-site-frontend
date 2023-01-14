import React from "react";
import { useDispatch } from "react-redux";
import { toggleOrderUiState } from "../../../features/cartSlice";
import "./DetailShowHideBtn.css";

const DetailShowHideBtn = ({ hide, showHideOrderHistory, type, orderId }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="detail-show-hide-btn"
      onClick={() => dispatch(toggleOrderUiState({ orderId, type }))}
    >
      {hide ? "show" : "hide"}
    </button>
  );
};

export default DetailShowHideBtn;
