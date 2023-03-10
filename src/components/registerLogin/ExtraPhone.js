import React from "react";

const ExtraPhone = (props) => {
  const { extraPhone, onChangeInput, disabled } = props;
  return (
    <div className="register-form-row">
      <label>Extra Ph.</label>
      <div>:</div>
      <div className="phone-number-prefix">
        <input
          type={"number"}
          readOnly
          placeholder="+95"
          className="phone-number-input1"
          style={{ width: "35px" }}
        />
        <input
          type="number"
          placeholder="9xxxxxxxxx"
          className="phone-number-input"
          name="extraPhone"
          value={extraPhone}
          onChange={onChangeInput}
          disabled={disabled}
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
              event.stopPropagation();
              event.preventDefault();
            }
          }}
        />
        <span className="register-err-msg"></span>
      </div>
    </div>
  );
};

export default ExtraPhone;
