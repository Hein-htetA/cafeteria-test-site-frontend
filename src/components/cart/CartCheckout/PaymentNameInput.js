import React from "react";

const PaymentNameInput = ({
  name,
  onChangeAdditionalInfo,
  paymentNameError,
}) => {
  return (
    <div className="ph-no-container">
      <input
        value={name}
        style={{ border: "none", fontSize: "1rem", width: "100%" }}
        name="name"
        placeholder="Name"
        onChange={onChangeAdditionalInfo}
      />
      <span
        style={{
          fontSize: "0.8rem",
          color: "red",
          marginRight: "5px",
        }}
      >
        {paymentNameError}
      </span>
    </div>
  );
};

export default PaymentNameInput;
