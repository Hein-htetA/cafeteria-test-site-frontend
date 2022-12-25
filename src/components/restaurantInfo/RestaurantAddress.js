import React from "react";

const RestaurantAddress = (props) => {
  const { address, onChangeInput, isOwner } = props;

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
          disabled={!isOwner}
        ></textarea>
      </div>
    </>
  );
};

export default RestaurantAddress;
