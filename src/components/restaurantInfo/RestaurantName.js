import React from "react";

const RestaurantName = (props) => {
  const { name, onChangeInput, nameError } = props;
  return (
    <>
      <div>
        <label>
          Name <span style={{ color: "red" }}>*</span>
        </label>
      </div>
      <div>:</div>
      <div style={{ position: "relative" }}>
        <input
          onChange={onChangeInput}
          value={name}
          name="name"
          className={nameError ? "res-input res-input-err" : "res-input"}
        />
        {nameError && (
          <span
            style={{
              position: "absolute",
              bottom: "8px",
              right: "0",
              fontSize: "0.8rem",
              color: "red",
              marginRight: "5px",
            }}
          >
            {nameError}
          </span>
        )}
      </div>
    </>
  );
};

export default RestaurantName;
