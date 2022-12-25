import React from "react";

const ItemPrice = ({ amount }) => {
  return (
    <div style={{ marginLeft: "auto" }}>
      <span style={{ marginRight: "5px" }}>MMK</span>
      {Number(amount).toLocaleString("en")}
    </div>
  );
};

export default ItemPrice;
