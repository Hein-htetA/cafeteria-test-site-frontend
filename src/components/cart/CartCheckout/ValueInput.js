import React from "react";

const ValueInput = ({ customerName, onChangeInput, nameError }) => {
  return (
    <div className="ph-no-container">
      <input
        value={customerName}
        style={{ border: "none", fontSize: "1rem", width: "100%" }}
        name="customerName"
        placeholder="Enter Your Name"
        onChange={onChangeInput}
      />
      <span
        style={{
          fontSize: "0.8rem",
          color: "red",
          marginRight: "5px",
        }}
      >
        {nameError}
      </span>
    </div>
  );
};

export default ValueInput;
