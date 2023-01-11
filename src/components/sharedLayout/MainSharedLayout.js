import React, { useEffect, useRef } from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import { localBaseUrl } from "../utils/baseUrl";
import { useCartContext } from "../../Context/CartContext";
import { setOnline, setOffline } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOrder as addNewOrderRTK,
  fetchInitialOrders,
  fetchOrdersAfterSSEFailed,
} from "../../features/orderSlice";
import { fetchMenu, fetchRestaurant } from "../../features/restaurantSlice";

const MainSharedLayout = () => {
  const userData = useSelector((state) => state.user.userData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const _id = useSelector((state) => state.user.userData._id);
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);

  const { setOrderHistory, setOrderHistoryLoading, updateOrderHistory } =
    useCartContext();

  const dispatch = useDispatch();

  const newOrderSSE = useRef(null);
  const updateOrderSSEOnError = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let updateOrderSSE;
    if (isLoggedIn) {
      //restaurantId is available only after user logged in
      updateOrderSSE = new EventSource(
        localBaseUrl + `/orders/${_id}/updateOrder`
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
                `${localBaseUrl}/orders/customer/${_id}`,
                requestOptions
              );
              if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
              }
              const { orderHistory } = await response.json();
              setOrderHistoryLoading();
              setOrderHistory(orderHistory);
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
  }, [isLoggedIn, restaurantId]);

  useEffect(() => {
    let sse;
    if (isLoggedIn && restaurantId) {
      //restaurantId is available only after user logged in
      dispatch(fetchInitialOrders(restaurantId));
      sse = new EventSource(localBaseUrl + `/orders/${restaurantId}/newOrder`);
      sse.onopen = () => {
        dispatch(setOnline());

        if (newOrderSSE.current) {
          //fetch order ajax if error occured
          dispatch(fetchOrdersAfterSSEFailed(restaurantId));
        }
      };
      sse.onmessage = (e) => {
        dispatch(addNewOrderRTK(JSON.parse(e.data)));
      };
      sse.onerror = () => {
        dispatch(setOffline());
        newOrderSSE.current = true; //not to update fetch on without error
      };
    }
    return () => {
      sse.close();
    };
  }, [isLoggedIn, restaurantId]);

  useEffect(() => {
    const offlineHandler = () => {
      dispatch(setOffline());
    };
    const onlineHandler = () => {
      dispatch(setOnline());
    };
    window.addEventListener("offline", offlineHandler);
    window.addEventListener("online", onlineHandler);

    return () => {
      window.removeEventListener("offline", offlineHandler);
      window.removeEventListener("online", onlineHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchRestaurant(userData.restaurantId));
  }, []);

  useEffect(() => {
    dispatch(fetchMenu(userData.restaurantId));
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
