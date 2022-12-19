import React, { useEffect, useRef } from "react";
import Navbar from "../navbar";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import { localBaseUrl } from "../utils/baseUrl";
import { useUiContext } from "../../Context/UiContext";
import { useOrderContext } from "../../Context/OrderContext";
import Register from "../registerLogin/Register";
import Login from "../registerLogin/Login";

const MainSharedLayout = () => {
  const { setOrderState, addNewOrder, setUpdateOrderState } = useOrderContext();
  const { onlineIndicate, isLoggedIn, setUser, setLoggedIn, user } =
    useUiContext();
  const onError = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //     setLoggedIn();
  //     navigate("/");
  //   }
  // }, []);

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
          // setUpdateOrderState(controller);
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
