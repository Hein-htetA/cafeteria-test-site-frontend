import React, { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useOrderContext } from "../../Context/OrderContext";
import { useUiContext } from "../../Context/UiContext";
import { localBaseUrl } from "../utils/baseUrl";

const MyAccountSharedLayout = () => {
  const { isLoggedIn, onlineIndicate, user } = useUiContext();
  const { setOrderState, addNewOrder, setUpdateOrderState } = useOrderContext();
  const restaurantName = "";
  const onError = useRef(null);
  useEffect(() => {
    if (!restaurantName) return;
    const controller = new AbortController();
    setOrderState(controller);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!restaurantName) return;
    const sse = new EventSource(
      localBaseUrl +
        `/orders/${restaurantName.trim().replaceAll(" ", "%20")}/newOrder`
    );
    const controller = new AbortController();

    sse.onopen = () => {
      console.log("sse opened");
      onlineIndicate(true);
      if (onError.current) {
        //fetch order ajax if error occured
        setUpdateOrderState(controller);
      }
    };

    sse.onmessage = (e) => {
      console.log("sse on message");
      addNewOrder(JSON.parse(e.data));
    };

    sse.onerror = () => {
      console.log("Error in connecting sse");
      onlineIndicate(false);
      onError.current = true; //not to update fetch on without error
    };

    return () => {
      sse.close();
      controller.abort();
    };
  }, []);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/" replace />}</>;
};

export default MyAccountSharedLayout;
