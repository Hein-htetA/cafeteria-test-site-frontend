import React, { useEffect } from "react";
import "./EmptyOrder.css";
import "./ConnectionError.css";
import { useOrderContext } from "../../../Context/OrderContext";
import { useUserContext } from "../../../Context/UserContext";

const ConnectionError = () => {
  const { setOrderState } = useOrderContext();
  const { user } = useUserContext();
  const controller = new AbortController();

  // useEffect(() => {
  //   return () => controller.abort();
  // }, []);

  return (
    <div className="empty-box">
      <button onClick={() => setOrderState(controller, user.restaurantId)}>
        Try Again ?
      </button>
    </div>
  );
};

export default ConnectionError;
