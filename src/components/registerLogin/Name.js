import React from "react";

const Name = (props) => {
  const { nameError, name, onChangeInput } = props;
  return (
    <div className="register-form-row">
      <label>
        Name<span>{" * "}</span>
      </label>
      <div>:</div>
      <div
        className={
          nameError
            ? "password-container register-form-error "
            : "password-container"
        }
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChangeInput}
        />
        <span className="register-err-msg" style={{ marginRight: "5px" }}>
          {nameError}
        </span>
      </div>
    </div>
  );
};

export default Name;
