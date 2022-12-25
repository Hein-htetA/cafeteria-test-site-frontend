import React from "react";

const TwoColumnGridContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "100%",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default TwoColumnGridContainer;
