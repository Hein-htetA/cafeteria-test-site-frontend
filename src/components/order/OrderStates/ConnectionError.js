import React, { useEffect } from "react";
import "./EmptyOrder.css";
import "./ConnectionError.css";
import { useOrderContext } from "../../../Context/OrderContext";

const ConnectionError = () => {
  const { setOrderState } = useOrderContext();
  const controller = new AbortController();

  // useEffect(() => {
  //   return () => controller.abort();
  // }, []);

  return (
    <div className="empty-box">
      <button onClick={() => setOrderState(controller)}>Try Again ?</button>
    </div>
  );
};

export default ConnectionError;
