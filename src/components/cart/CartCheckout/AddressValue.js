import React from "react";

const AddressValue = ({ address, onChangeInput }) => {
  return (
    <textarea
      style={{
        width: "100%",
        border: "none",
        height: "50px",
        overflow: "scroll",
        textAlign: "justify",
      }}
      value={address}
      name="address"
      placeholder="Delivery Location"
      onChange={onChangeInput}
    ></textarea>
  );
};

export default AddressValue;
