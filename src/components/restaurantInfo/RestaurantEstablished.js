import React from "react";

const RestaurantEstablished = (props) => {
  const { establishedIn, onChangeInput, isOwner } = props;
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
          disabled={!isOwner}
        />
      </div>
    </>
  );
};

export default RestaurantEstablished;
