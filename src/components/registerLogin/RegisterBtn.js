import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const RegisterBtn = (props) => {
  const registerStatus = useSelector((state) => state.user.registerStatus);

  const { handleRegister } = props;
  return (
    <button
      className="register-btn"
      onClick={handleRegister}
      disabled={registerStatus === "loading"}
    >
      {registerStatus === "loading" ? (
        "Registering..."
      ) : registerStatus === "failed" ? (
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
