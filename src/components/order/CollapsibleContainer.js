import React from "react";
import "./CollapsibleContainer.css";

const CollapsibleContainer = ({ children, detailHide }) => {
  return (
    <div
      className={
        detailHide
          ? " detail-container detail-container-hidden"
          : "detail-container"
      }
    >
      {children}
    </div>
  );
};

export default CollapsibleContainer;
