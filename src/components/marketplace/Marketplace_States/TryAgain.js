import React from "react";
import { useDispatch } from "react-redux";
import { fetchRestaurantsByPage } from "../../../features/publicDataSlice";
import "./TryAgain.css";

const TryAgain = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="try-again-err">Something Went Wrong!</div>
      <button
        className="try-again"
        onClick={() => dispatch(fetchRestaurantsByPage(1))}
      >
        Try again ?
      </button>
    </>
  );
};

export default TryAgain;
