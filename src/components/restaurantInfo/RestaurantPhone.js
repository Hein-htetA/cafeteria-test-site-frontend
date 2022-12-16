import { faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RestaurantPhone = (props) => {
  const { firstPhone, secondPhone, onChangeInput, firstPhoneError } = props;
  return (
    <>
      <div>
        <label>
          Phone No. <span style={{ color: "red" }}>*</span>
        </label>
      </div>
      <div>:</div>
      <div>
        <div
          style={{ marginTop: "-3px" }}
          className={
            firstPhoneError
              ? "res-phone-input-container res-phone-input-container-err"
              : "res-phone-input-container"
          }
        >
          <input value={"+95"} className="res-phone-prefix" readOnly />
          <input
            type={"number"}
            value={firstPhone}
            className="res-phone-postfix"
            name="firstPhone"
            onChange={onChangeInput}
            placeholder="9xxxxxxxxx"
          />
          {firstPhoneError && (
            <span
              style={{
                fontSize: "0.8rem",
                color: "red",
                position: "absolute",
                right: "0",
                backgroundColor: "white",
                height: "20px",
                marginRight: "5px",
              }}
            >
              {firstPhoneError}
            </span>
          )}
          <a href={`tel:+95${firstPhone}`}>
            <FontAwesomeIcon icon={faPhoneFlip} />
          </a>
        </div>

        <div className="res-phone-input-container">
          <input value={"+95"} className="res-phone-prefix" readOnly />
          <input
            value={secondPhone}
            type={"number"}
            className="res-phone-postfix"
            name="secondPhone"
            onChange={onChangeInput}
            placeholder="9xxxxxxxxx"
          />
          <a href={`tel:+95${secondPhone}`}>
            <FontAwesomeIcon icon={faPhoneFlip} />
          </a>
        </div>
      </div>
    </>
  );
};

export default RestaurantPhone;
