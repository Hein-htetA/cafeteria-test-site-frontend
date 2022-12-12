import React from "react";

const RegisterWarning = (props) => {
  const { registerError, errorMsg } = props;
  return (
    <>
      {registerError ? (
        <div className="register-server-err-msg">{errorMsg}</div>
      ) : (
        <div className="warning-text">
          <span>*</span> fields are required
        </div>
      )}
    </>
  );
};

export default RegisterWarning;
