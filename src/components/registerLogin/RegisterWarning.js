import React from "react";
import { useSelector } from "react-redux";

const RegisterWarning = () => {
  const error = useSelector((state) => state.user.error);
  return (
    <>
      {error.serverError ? (
        <div className="register-server-err-msg">{error.serverError}</div>
      ) : (
        <div className="warning-text">
          <span>*</span> fields are required
        </div>
      )}
    </>
  );
};

export default RegisterWarning;
