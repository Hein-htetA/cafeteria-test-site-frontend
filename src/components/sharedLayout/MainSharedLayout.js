import React, { useEffect, useRef } from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import { localBaseUrl } from "../utils/baseUrl";
import { setOnline, setOffline } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOrder as addNewOrderRTK,
  fetchInitialOrders,
  fetchOrdersAfterSSEFailed,
} from "../../features/orderSlice";
import { fetchMenu, fetchRestaurant } from "../../features/restaurantSlice";

import {
  fetchOrder,
  updateOrderFromOrderHistory,
} from "../../features/cartSlice";

const MainSharedLayout = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.userData._id);
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);

  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );
  const menuData = useSelector((state) => state.restaurant.menuData);

  const dispatch = useDispatch();

  const newOrderSSEOnError = useRef(null);
  const updateOrderSSEOnError = useRef(null);

  useEffect(() => {
    const updateOrderSSE = new EventSource(
      localBaseUrl + `/orders/${userId}/updateOrder`
    );

    if (isLoggedIn) {
      //dont need restaurantId to order from other restaurant
      updateOrderSSE.onopen = (e) => {
        if (updateOrderSSEOnError.current) {
          dispatch(fetchOrder());
        }
      };
      updateOrderSSE.onmessage = (e) => {
        const {
          _id: orderId,
          orderState,
          paymentStatus,
          updatedAt,
        } = JSON.parse(e.data);
        dispatch(
          updateOrderFromOrderHistory({
            orderId,
            orderState,
            paymentStatus,
            updatedAt,
          })
        );
      };
      updateOrderSSE.onerror = () => {
        updateOrderSSEOnError.current = true; //not to update fetch on without error
      };
    } else {
      updateOrderSSE.close();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const newOrderSSE = new EventSource(
      localBaseUrl + `/orders/${restaurantId}/newOrder`
    );
    if (isLoggedIn && restaurantId) {
      //restaurantId is available only after user logged in
      dispatch(fetchInitialOrders(restaurantId));
      newOrderSSE.onopen = (e) => {
        if (newOrderSSEOnError.current) {
          //fetch order ajax if error occured
          dispatch(fetchOrdersAfterSSEFailed(restaurantId));
        }
      };
      newOrderSSE.onmessage = (e) => {
        dispatch(addNewOrderRTK(JSON.parse(e.data)));
      };
      newOrderSSE.onerror = () => {
        dispatch(setOffline());
        newOrderSSEOnError.current = true; //not to update fetch on without error
      };
    } else {
      newOrderSSE.close();
    }
  }, [isLoggedIn, restaurantId]);

  useEffect(() => {
    if (navigator.onLine) {
      dispatch(setOnline());
    } else {
      dispatch(setOffline());
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
      }
    };
    const offlineHandler = () => {
      dispatch(setOffline());
    };
    const onlineHandler = () => {
      dispatch(setOnline());
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("offline", offlineHandler);
    window.addEventListener("online", onlineHandler);

    return () => {
      window.removeEventListener("offline", offlineHandler);
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (
      restaurantId &&
      isLoggedIn &&
      (Object.keys(restaurantData).length === 0 || menuData.length === 0)
    ) {
      dispatch(fetchMenu(restaurantId));
      dispatch(fetchRestaurant(restaurantId));
    }
  }, [isLoggedIn]);

  //clear notification when page visit
  useEffect(() => {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration
          .getNotifications()
          .then((notifications) =>
            notifications.forEach((notification) => notification.close())
          );
      })
      .catch((e) => console.log(e));
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
