import React from "react";

const RestaurantAddress = (props) => {
  const { address, onChangeInput } = props;

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
        ></textarea>
      </div>
    </>
  );
};

export default RestaurantAddress;
