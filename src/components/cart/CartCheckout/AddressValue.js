import React from "react";

const AddressValue = () => {
  return (
    <textarea
      style={{
        width: "100%",
        border: "none",
        height: "50px",
        overflow: "scroll",
        textAlign: "justify",
      }}
      value={
        "A box-shadow CSS generator that helps you quickly generate box-sh"
      }
      readOnly
    ></textarea>
  );
};

export default AddressValue;
