import React from "react";

const MenuContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr auto 1fr",
        width: "100%",
        gap: "10px",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default MenuContainer;
