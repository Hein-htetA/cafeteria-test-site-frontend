import React from "react";

const CountName = ({ count, name }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content auto 1fr",
        gap: "15px",
        marginLeft: "5px",
      }}
    >
      <div>{count}</div>
      <div>x</div>
      <div>{name}</div>
    </div>
  );
};

export default CountName;
