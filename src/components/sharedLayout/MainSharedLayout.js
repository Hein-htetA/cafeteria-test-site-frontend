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
  const { onlineIndicate, isLoggedIn, setUser, setLoggedIn, user, logoutUser } =
    useUserContext();

  const { setOrderHistory, setOrderHistoryLoading, updateOrderHistory } =
    useCartContext();
  const onError = useRef(null);
  const updateOrderSSEOnError = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let updateOrderSSE;
    if (isLoggedIn) {
      //restaurantId is available only after user logged in
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
        // console.log("updateOrderSSE on message");
        const {
          _id: orderId,
          orderState,
          paymentStatus,
          updatedAt,
        } = JSON.parse(e.data);
        updateOrderHistory(orderId, orderState, paymentStatus, updatedAt);
        // console.log("updated order", JSON.parse(e.data));
        // addNewOrder(JSON.parse(e.data));
      };
      updateOrderSSE.onerror = () => {
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
        // console.log("sse opened");
        onlineIndicate(true);
        if (onError.current) {
          //fetch order ajax if error occured
          setUpdateOrderState(controller, user.restaurantId);
        }
      };
      sse.onmessage = (e) => {
        addNewOrder(JSON.parse(e.data));
      };
      sse.onerror = () => {
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
      if (jwtPayload.exp * 1000 < new Date().getTime) {
        //token is expire
        logoutUser();
        localStorage.removeItem("token");
      } else {
        setLoggedIn(); //if there is token, user will be there too
      }
    } else {
      logoutUser();
    }
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
