import React from "react";
import "./MenuDeleteLoading.css";

const MenuDeleteLoading = () => {
  return (
    <div className="menu-delete-loading-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default MenuDeleteLoading;
