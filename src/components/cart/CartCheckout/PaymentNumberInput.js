import React from "react";

const PaymentNumberInput = ({
  number,
  onChangeAdditionalInfo,
  paymentNumberError,
}) => {
  return (
    <div className="ph-no-container">
      <input value={"+95"} readOnly className="ph-no-prefix" />
      <input
        type={"number"}
        value={number}
        name="number"
        className="ph-no-input"
        placeholder="9xxxxxxxxx"
        onChange={onChangeAdditionalInfo}
        onKeyDown={(event) => {
          if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.stopPropagation();
            event.preventDefault();
          }
        }}
      />
      <span
        style={{
          fontSize: "0.8rem",
          color: "red",
          marginRight: "5px",
        }}
      >
        {paymentNumberError}
      </span>
    </div>
  );
};

export default PaymentNumberInput;
