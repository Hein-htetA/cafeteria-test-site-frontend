import React from "react";
import "./RadioPaymentMethod.css";

const RadioPaymentMethod = ({ paymentMethod, onChangePaymentRadio }) => {
  return (
    <div className="radio-container">
      <div className="single-radio">
        <input
          type="radio"
          id="cash"
          name="paymentMethod"
          value="Cash"
          checked={paymentMethod.value === "Cash"}
          onChange={onChangePaymentRadio}
        />
        <label htmlFor="cash">Cash</label>
      </div>
      <div className="single-radio">
        <input
          type="radio"
          id="KBZPay"
          name="paymentMethod"
          value="KBZPay"
          checked={paymentMethod.value === "KBZPay"}
          onChange={onChangePaymentRadio}
        />
        <label htmlFor="KBZPay">KBZPay</label>
      </div>
      <div className="single-radio">
        <input
          type="radio"
          id="WavePay"
          name="paymentMethod"
          value="WavePay"
          checked={paymentMethod.value === "WavePay"}
          onChange={onChangePaymentRadio}
        />
        <label htmlFor="WavePay">WavePay</label>
      </div>
    </div>
  );
};

export default RadioPaymentMethod;
