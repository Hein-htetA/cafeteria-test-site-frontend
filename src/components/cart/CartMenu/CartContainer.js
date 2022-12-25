import React from "react";

const CartContainer = ({ children }) => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        borderRadius: "0.5rem",
        boxShadow: "0px 0px 6px 5px rgb(238 94 118 / 24%)",
        fontSize: "0.9rem",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default CartContainer;
