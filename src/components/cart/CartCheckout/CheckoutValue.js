import React from "react";

const CheckoutValue = ({ children }) => {
  return (
    <div
      style={{
        padding: "5px",
        backgroundColor: "white",
        borderRadius: "0.5rem",
      }}
    >
      {children}
    </div>
  );
};

export default CheckoutValue;
