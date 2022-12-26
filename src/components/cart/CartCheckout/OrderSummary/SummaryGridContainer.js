import React from "react";

const SummaryGridContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
      }}
    >
      {children}
    </div>
  );
};

export default SummaryGridContainer;
