import React from "react";
import "./MenuDeleteConfirmation.css";

const MenuDeleteConfirmation = (props) => {
  const { hideDeleteConfirmationBox, deleteMenuServer } = props;
  return (
    <div className="menu-delete-confirmation-container">
      <h3>Remove this item?</h3>
      <div className="menu-delete-confirmation-btn">
        <button className="cancel-btn" onClick={hideDeleteConfirmationBox}>
          Cancel
        </button>
        <button onClick={deleteMenuServer}>Remove</button>
      </div>
    </div>
  );
};

export default MenuDeleteConfirmation;
