import React from "react";
import "./RadioPaymentMethod.css";

const RadioPaymentMethod = () => {
  return (
    <div className="radio-container">
      <div className="single-radio">
        <input type="radio" id="cash" name="paymentMethods" value="Cash" />
        <label htmlFor="cash">Cash</label>
      </div>
      <div className="single-radio">
        <input type="radio" id="KBZPay" name="paymentMethods" value="KBZPay" />
        <label htmlFor="KBZPay">KBZPay</label>
      </div>
      <div className="single-radio">
        <input
          type="radio"
          id="WavePay"
          name="paymentMethods"
          value="WavePay"
        />
        <label htmlFor="WavePay">WavePay</label>
      </div>
    </div>
  );
};

export default RadioPaymentMethod;
