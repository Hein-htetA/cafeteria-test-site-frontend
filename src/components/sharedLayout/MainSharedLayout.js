import React, { useEffect, useRef } from "react";
import Navbar from "../navbar";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import { localBaseUrl } from "../utils/baseUrl";
import { useUserContext } from "../../Context/UserContext";
import { useOrderContext } from "../../Context/OrderContext";
import Register from "../registerLogin/Register";
import Login from "../registerLogin/Login";
import { useCartContext } from "../../Context/CartContext";

const MainSharedLayout = () => {
  const { setOrderState, addNewOrder, setUpdateOrderState } = useOrderContext();
  const { onlineIndicate, isLoggedIn, setUser, setLoggedIn, user } =
    useUserContext();

  const { setOrderHistory, setOrderHistoryLoading, updateOrderHistory } =
    useCartContext();
  const onError = useRef(null);
  const updateOrderSSEOnError = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    let updateOrderSSE;
    if (isLoggedIn) {
      //restaurantId is available only after user logged in
      setOrderState(controller, user.restaurantId);
      updateOrderSSE = new EventSource(
        localBaseUrl + `/orders/${user._id}/updateOrder`
      );

      updateOrderSSE.onopen = () => {
        if (updateOrderSSEOnError.current) {
          //fetch order ajax if error occured
          const fetchOrder = async () => {
            try {
              //setOrderLoading();
              const controller = new AbortController();
              setOrderHistoryLoading();
              const requestOptions = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                signal: controller.signal,
              };
              const response = await fetch(
                `${localBaseUrl}/orders/customer/${user._id}`,
                requestOptions
              );
              if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
              }
              const { orderHistory } = await response.json();
              setOrderHistoryLoading();
              setOrderHistory(orderHistory);
              //orderFetchSuccessful();
              // console.log("data", responseData.data);
            } catch (e) {
              //setOrderError();
              console.log(e);
            }
          };
          fetchOrder();
        }
      };
      updateOrderSSE.onmessage = (e) => {
        console.log("updateOrderSSE on message");
        // console.log("updated order", e.data);
        const { _id: orderId, orderState, paymentStatus } = JSON.parse(e.data);
        updateOrderHistory(orderId, orderState, paymentStatus);
        // console.log("updated order", JSON.parse(e.data));
        // addNewOrder(JSON.parse(e.data));
      };
      updateOrderSSE.onerror = () => {
        console.log("Error in connecting sse");
        updateOrderSSEOnError.current = true; //not to update fetch on without error
      };
    }
    return () => {
      //updateOrderSSE.close();
      controller.abort();
    };
  }, [isLoggedIn, user.restaurantId]);

  useEffect(() => {
    const controller = new AbortController();
    let sse;
    if (isLoggedIn && user.restaurantId) {
      //restaurantId is available only after user logged in
      setOrderState(controller, user.restaurantId);
      sse = new EventSource(
        localBaseUrl + `/orders/${user.restaurantId}/newOrder`
      );
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
    }
    return () => {
      //sse.close();
      controller.abort();
    };
  }, [isLoggedIn, user.restaurantId]);

  useEffect(() => {
    const offlineHandler = () => {
      console.log("offline handler ran");
      onlineIndicate(false);
    };
    const onlineHandler = () => {
      console.log("online handler ran");
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
      {/* <ScrollToTop /> */}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainSharedLayout;
