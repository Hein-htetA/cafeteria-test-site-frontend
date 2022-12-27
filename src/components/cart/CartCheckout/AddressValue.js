import React from "react";

const AddressValue = ({
  address,
  onChangeInput,
  addressError,
  requestDelivery,
}) => {
  return (
    <div style={{ position: "relative" }}>
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
      <span
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          fontSize: "0.8rem",
          color: "red",
          marginRight: "5px",
        }}
      >
        {addressError}
      </span>
    </div>
  );
};

export default AddressValue;
