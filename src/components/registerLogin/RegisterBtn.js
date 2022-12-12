import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RegisterBtn = (props) => {
  const { handleRegister, registerLoading, registerError } = props;
  return (
    <button className="register-btn" onClick={handleRegister}>
      {registerLoading ? (
        "Registering..."
      ) : registerError ? (
        <>
          <FontAwesomeIcon icon={faArrowRotateRight} />
          <div>Try Again</div>
        </>
      ) : (
        "Register"
      )}
    </button>
  );
};

export default RegisterBtn;
