import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmptyMenuInCategory.css";

const EmptyMenuInCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-menu">
      <p className="empty-menu-text">No item in this category !</p>
      <button className="empty-menu-btn" onClick={() => navigate(-1)}>
        Check Others
      </button>
    </div>
  );
};

export default EmptyMenuInCategory;
