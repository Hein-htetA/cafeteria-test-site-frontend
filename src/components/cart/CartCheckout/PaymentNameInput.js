import React from "react";

const PaymentNameInput = ({ name, onChangeAdditionalInfo }) => {
  return (
    <div className="ph-no-container">
      <input
        value={name}
        style={{ border: "none", fontSize: "1rem" }}
        name="name"
        placeholder="Name"
        onChange={onChangeAdditionalInfo}
      />
    </div>
  );
};

export default PaymentNameInput;
