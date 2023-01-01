import React from "react";

const Phone = (props) => {
  const { phoneError, phone, onChangeInput } = props;
  return (
    <div className="register-form-row">
      <label>
        Phone <span>{" * "}</span>
      </label>
      <div>:</div>
      <div className="phone-number-container">
        <div
          className={
            phoneError
              ? "phone-number-prefix register-form-error"
              : "phone-number-prefix"
          }
        >
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
            className={"phone-number-input"}
            name="phone"
            value={phone}
            onChange={onChangeInput}
            onKeyDown={(event) => {
              if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                event.stopPropagation();
                event.preventDefault();
              }
            }}
          />
          <span className="register-err-msg">{phoneError}</span>
        </div>
      </div>
    </div>
  );
};

export default Phone;
