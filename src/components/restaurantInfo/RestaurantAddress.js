import React from "react";

const RestaurantAddress = (props) => {
  const { address, onChangeInput, isOwner, disabled } = props;

  return (
    <>
      <div>
        <label>Address</label>
      </div>
      <div>:</div>
      <div>
        <textarea
          name="address"
          value={address}
          onChange={onChangeInput}
          disabled={!isOwner || disabled}
        ></textarea>
      </div>
    </>
  );
};

export default RestaurantAddress;
