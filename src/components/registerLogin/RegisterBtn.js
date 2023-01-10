import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const RegisterBtn = (props) => {
  const status = useSelector((state) => state.user.status);

  const { handleRegister } = props;
  return (
    <button className="register-btn" onClick={handleRegister}>
      {status === "loading" ? (
        "Registering..."
      ) : status === "failed" ? (
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
