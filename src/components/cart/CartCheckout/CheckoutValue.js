import React from "react";

const CheckoutValue = ({ children, error }) => {
  return (
    <div
      style={{
        padding: "5px",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        border: error ? "2px solid red" : "2px solid white",
      }}
    >
      {children}
    </div>
  );
};

export default CheckoutValue;
