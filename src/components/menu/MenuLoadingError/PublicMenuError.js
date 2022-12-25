import React from "react";
import { useNavigate } from "react-router-dom";

const PublicMenuError = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-box">
      <div>Not Available Yet!</div>
      <button onClick={() => navigate("..")}>Return</button>
    </div>
  );
};

export default PublicMenuError;
