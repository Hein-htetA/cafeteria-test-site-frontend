import React, { useEffect } from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import { baseUrl } from "../utils/baseUrl";
import { useUiContext } from "../../Context/UiContext";
import { useOrderContext } from "../../Context/OrderContext";

const MainSharedLayout = () => {
  const { setOrderLoading, setOrderError, orderFetchSuccessful } =
    useUiContext();
  const { setOrderState, addNewOrder } = useOrderContext();

  useEffect(() => {
    const controller = new AbortController();
    const fetchOrder = async () => {
      try {
        setOrderLoading();
        const response = await fetch(`${baseUrl}/orders/T-food`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setOrderState(data.data);
        orderFetchSuccessful();
        console.log("data", data);
      } catch (e) {
        setOrderError();
        console.log(e);
      }
    };
    fetchOrder();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const sse = new EventSource(baseUrl + "/orders/T-food/newOrder");

    sse.onmessage = (e) => {
      // console.log("on message");
      // console.log(JSON.parse(e.data));
      addNewOrder(JSON.parse(e.data));
    };

    sse.onerror = () => {
      console.log("in sse error");
      sse.close();
    };

    return () => {
      sse.close();
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
