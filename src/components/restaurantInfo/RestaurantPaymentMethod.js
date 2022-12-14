import React from "react";

const RestaurantPaymentMethod = () => {
  return (
    <>
      <div>Payment Methods</div>
      <div>:</div>
      <div className="payment-method-container">
        <div className="single-payment-method">Cash</div>
        <div className="single-payment-method">KBZPay</div>
        <div className="single-payment-method">WavePay</div>
      </div>
    </>
  );
};

export default RestaurantPaymentMethod;
