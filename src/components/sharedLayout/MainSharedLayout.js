import React, { useEffect, useRef } from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import { localBaseUrl } from "../utils/baseUrl";
import { useUiContext } from "../../Context/UiContext";
import { useOrderContext } from "../../Context/OrderContext";

const MainSharedLayout = () => {
  const { setOrderState, addNewOrder, setUpdateOrderState } = useOrderContext();
  const { restaurantName, onlineIndicate } = useUiContext();

  const onError = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setOrderState(controller);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const sse = new EventSource(
      localBaseUrl +
        `/orders/${restaurantName.trim().replaceAll(" ", "%20")}/newOrder`
    );
    const controller = new AbortController();

    sse.onopen = () => {
      console.log("sse opened");
      onlineIndicate(true);
      if (onError.current) {
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

  useEffect(() => {
    const offlineHandler = () => {
      onlineIndicate(false);
    };
    const onlineHandler = () => {
      onlineIndicate(true);
    };
    window.addEventListener("offline", offlineHandler);
    window.addEventListener("online", onlineHandler);

    return () => {
      window.removeEventListener("offline", offlineHandler);
      window.removeEventListener("online", onlineHandler);
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainSharedLayout;
