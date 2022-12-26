import React from "react";

const PaymentNumberInput = ({ number, onChangeAdditionalInfo }) => {
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
      />
    </div>
  );
};

export default PaymentNumberInput;
