import React from "react";

const RestaurantEstablished = (props) => {
  const { establishedIn, onChangeInput } = props;
  return (
    <>
      <div>
        <label>Established In</label>
      </div>
      <div>:</div>
      <div>
        <input
          value={establishedIn}
          name="establishedIn"
          onChange={onChangeInput}
          className="res-input"
        />
      </div>
    </>
  );
};

export default RestaurantEstablished;
