import React from "react";
import "./AccountInfoCheckbox.css";

const AccountInfoCheckbox = () => {
  return (
    <div className="info-checkbox-container">
      <input type="checkbox" id="info" name="info" />
      <label htmlFor="info">Use My Account Informations</label>
    </div>
  );
};

export default AccountInfoCheckbox;
