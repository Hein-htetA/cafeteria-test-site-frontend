import React, { useState } from "react";
import "./RegisterPaymentMethod.css";
const RegisterPaymentMethod = (props) => {
  const { paymentMethods, onChangeCheckbox } = props;
  // const copyPaymentMethods = JSON.parse(JSON.stringify(paymentMethods));

  return (
    <>
      <div>Payment Methods</div>
      <div>:</div>
      <div className="payment-input-checkbox-container">
        {paymentMethods.map((method, index) => (
          <label key={index} className="payment-input-label">
            <input
              type="checkbox"
              checked={method.checked}
              onChange={(e) => onChangeCheckbox(e, index, "checkbox")}
            />
            <span>{method.value}</span>
          </label>
        ))}
      </div>
      {paymentMethods[1].checked && (
        <>
          <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
            KBZPay Name
          </div>
          <div>:</div>
          <input
            className="additional-payment-info-input"
            name="name"
            value={paymentMethods[1].additionalInfo.name}
            onChange={(e) => onChangeCheckbox(e, 1, "additionalInfo")}
          />
          <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
            KBZPay No.
          </div>
          <div>:</div>
          <input
            className="additional-payment-info-input"
            name="number"
            type={"number"}
            value={paymentMethods[1].additionalInfo.number}
            onChange={(e) => onChangeCheckbox(e, 1, "additionalInfo")}
          />
        </>
      )}
      {paymentMethods[2].checked && (
        <>
          <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
            WavePay Name
          </div>
          <div>:</div>
          <input
            className="additional-payment-info-input"
            name="name"
            value={paymentMethods[2].additionalInfo.name}
            onChange={(e) => onChangeCheckbox(e, 2, "additionalInfo")}
          />
          <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
            WavePay No.
          </div>
          <div>:</div>
          <input
            className="additional-payment-info-input"
            name="number"
            type={"number"}
            value={paymentMethods[2].additionalInfo.number}
            onChange={(e) => onChangeCheckbox(e, 2, "additionalInfo")}
          />
        </>
      )}
    </>
  );
};

export default RegisterPaymentMethod;
