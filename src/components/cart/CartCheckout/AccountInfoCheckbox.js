import React from "react";
import "./AccountInfoCheckbox.css";

const AccountInfoCheckbox = ({ onChangeAccountInfo }) => {
  return (
    <div className="info-checkbox-container">
      <input
        type="checkbox"
        id="info"
        name="info"
        onChange={onChangeAccountInfo}
      />
      <label htmlFor="info">Use My Account Informations</label>
    </div>
  );
};

export default AccountInfoCheckbox;
