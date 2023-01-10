import React, { useEffect, useRef } from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import { localBaseUrl } from "../utils/baseUrl";
import { useOrderContext } from "../../Context/OrderContext";
import { useCartContext } from "../../Context/CartContext";
import { setOnline, setOffline } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOrder as addNewOrderRTK,
  fetchInitialOrders,
} from "../../features/user/orderSlice";

const MainSharedLayout = () => {
  const { setOrderState, addNewOrder, setUpdateOrderState } = useOrderContext();
  // const { onlineIndicate, isLoggedIn, setLoggedIn, user, logoutUser } =
  //   useUserContext();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const _id = useSelector((state) => state.user.userData._id);
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);

  const { setOrderHistory, setOrderHistoryLoading, updateOrderHistory } =
    useCartContext();

  const dispatch = useDispatch();

  const onError = useRef(null);
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
    const controller = new AbortController();
    let sse;
    if (isLoggedIn && restaurantId) {
      //restaurantId is available only after user logged in
      setOrderState(controller, restaurantId);
      dispatch(fetchInitialOrders(restaurantId));
      sse = new EventSource(localBaseUrl + `/orders/${restaurantId}/newOrder`);
      sse.onopen = () => {
        // console.log("sse opened");
        dispatch(setOnline());

        if (onError.current) {
          //fetch order ajax if error occured
          setUpdateOrderState(controller, restaurantId);
        }
      };
      sse.onmessage = (e) => {
        addNewOrder(JSON.parse(e.data));
        dispatch(addNewOrderRTK(JSON.parse(e.data)));
      };
      sse.onerror = () => {
        dispatch(setOffline());
        onError.current = true; //not to update fetch on without error
      };
    }
    return () => {
      //sse.close();
      controller.abort();
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

  return (
    <div>
      {/* <ScrollToTop /> */}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainSharedLayout;
