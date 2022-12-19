import React from "react";
import { usePublicDataContext } from "../../../Context/PublicDataContext";
import "./TryAgain.css";

const TryAgain = () => {
  const { fetchRestaurants } = usePublicDataContext();
  return (
    <>
      <div className="try-again-err">Something Went Wrong!</div>
      <button
        className="try-again"
        onClick={() => fetchRestaurants(new AbortController(), 1)}
      >
        Try again ?
      </button>
      ;
    </>
  );
};

export default TryAgain;
