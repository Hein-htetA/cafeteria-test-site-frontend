import React from "react";

const CountName = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content auto 1fr",
        gap: "15px",
        marginLeft: "5px",
      }}
    >
      <div>34</div>
      <div>x</div>
      <div>Item name</div>
    </div>
  );
};

export default CountName;
