import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RemoveFromCheckout = () => {
  return (
    <button
      style={{
        position: "absolute",
        top: "0px",
        right: "5px",
        border: "none",
        backgroundColor: "transparent",
      }}
      onClick={() => {}}
    >
      <FontAwesomeIcon
        icon={faXmark}
        style={{
          fontSize: "1.5rem",
          color: "rgb(238, 94, 118)",
        }}
      />
      {/* <div
        style={{
          fontSize: "1rem",
          color: "rgb(238, 94, 118)",
        }}
      >
        clear
      </div> */}
    </button>
  );
};

export default RemoveFromCheckout;
