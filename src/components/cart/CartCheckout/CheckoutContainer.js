import React from "react";

const CheckoutContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: "0.5rem",
        padding: "10px",
        boxShadow: "0px 0px 6px 5px rgb(238 94 118 / 24%)",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default CheckoutContainer;
