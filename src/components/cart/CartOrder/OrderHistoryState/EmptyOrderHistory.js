import React from "react";

const EmptyOrderHistory = () => {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-img-container">
        <div className="exclamation-mark">!</div>
      </div>
      <p className="empty-cart-text">There is no record for today.</p>
    </div>
  );
};

export default EmptyOrderHistory;
