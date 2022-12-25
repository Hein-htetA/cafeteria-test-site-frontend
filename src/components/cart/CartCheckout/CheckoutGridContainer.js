import React from "react";

const CheckoutGridContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content auto 2fr",
        gap: "10px 20px",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default CheckoutGridContainer;
