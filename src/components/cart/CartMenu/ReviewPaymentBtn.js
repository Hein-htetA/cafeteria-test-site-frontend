import React from "react";
import "./ReviewPaymentBtn.css";

const ReviewPaymentBtn = ({ restaurantId, handleReviewPayment }) => {
  console.log("res id", restaurantId);
  return (
    <button
      className="review-payment-btn"
      onClick={() => handleReviewPayment(restaurantId)}
    >
      Review Payment and Address
    </button>
  );
};

export default ReviewPaymentBtn;
