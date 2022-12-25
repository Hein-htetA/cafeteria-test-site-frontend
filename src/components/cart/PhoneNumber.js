import React from "react";
import "./PhoneNumber.css";

const PhoneNumber = () => {
  return (
    <div className="ph-no-container">
      <input value={"+95"} readOnly className="ph-no-prefix" />
      <input value="999999999" readOnly className="ph-no-input" />
    </div>
  );
};

export default PhoneNumber;
