import React from "react";
import "./EmptyOrder.css";
import "./ConnectionError.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAfterSSEFailed } from "../../../features/orderSlice";

const ConnectionError = () => {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);

  return (
    <div className="empty-box">
      <button onClick={() => dispatch(fetchOrdersAfterSSEFailed(restaurantId))}>
        Try Again ?
      </button>
    </div>
  );
};

export default ConnectionError;
