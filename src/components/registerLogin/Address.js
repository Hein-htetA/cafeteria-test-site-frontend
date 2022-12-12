import React from "react";

const Address = (props) => {
  const { address, onChangeInput } = props;
  return (
    <div className="register-form-row">
      <label>Address</label>
      <div>:</div>
      <div>
        <textarea
          placeholder="Address"
          name="address"
          value={address}
          onChange={onChangeInput}
        ></textarea>
      </div>
    </div>
  );
};

export default Address;
