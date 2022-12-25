import React from "react";

const SummaryGridContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        marginTop: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default SummaryGridContainer;
