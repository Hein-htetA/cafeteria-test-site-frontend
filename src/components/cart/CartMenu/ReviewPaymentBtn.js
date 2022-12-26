import React from "react";
import "./ReviewPaymentBtn.css";

const ReviewPaymentBtn = ({ restaurantId, handleReviewPayment }) => {
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
