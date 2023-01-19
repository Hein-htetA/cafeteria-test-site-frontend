import React from "react";
import { useSearchParams } from "react-router-dom";
import "./EmptySearchResult.css";

const EmptySearchResult = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="empty-result-container">
      <div className="empty-result-title">
        No results for{" "}
        <span className="search-params">{searchParams.get("name")}</span> .
      </div>
      <p>Try checking your spelling or use more general terms.</p>
    </div>
  );
};

export default EmptySearchResult;
