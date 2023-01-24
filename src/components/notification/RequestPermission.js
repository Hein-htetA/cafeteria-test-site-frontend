import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSubscriptionToRestaurant } from "../../features/restaurantSlice";
import "./RequestPermission.css";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const RequestPermission = () => {
  const [reqNotiPermission, setReqNotiPermission] = useState(false);
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);

  const dispatch = useDispatch();

  const handleLater = () => {
    setReqNotiPermission(false);
    localStorage.setItem("lastReqPermissionDate", JSON.stringify(Date.now()));
  };

  const requestPermission = async () => {
    setReqNotiPermission(false);
    const permission = await Notification.requestPermission();
    //console.log("permission", permission);
    if (permission === "granted") {
      try {
        const registeration = await navigator.serviceWorker.ready;
        //console.log("registeration", registeration);
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BBVH0N7P_05Q1-_gkRESzaqKltQzOGXDR75uVKEbD6hW0GoBLN5WHgu_Jg3CwC-RaoUkhNJbPyg_-Lk9Zhieb3w"
          ),
        };
        const PushSubscription = await registeration.pushManager.subscribe(
          subscribeOptions
        );
        //console.log(PushSubscription);
        localStorage.setItem("LastSubscribedRestaurantId", restaurantId);
        dispatch(saveSubscriptionToRestaurant(PushSubscription));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (Notification.permission === "denied") return;
    const checkSubAndReq = async () => {
      const registeration = await navigator.serviceWorker.ready;
      const subscription = await registeration.pushManager.getSubscription();
      const LastSubscribedRestaurantId = localStorage.getItem(
        "LastSubscribedRestaurantId"
      );
      //console.log("LastSubscribedRestaurantId", LastSubscribedRestaurantId);
      //console.log("sublc ption", subscription);
      if (
        restaurantId === LastSubscribedRestaurantId &&
        LastSubscribedRestaurantId
      ) {
        //already subcribe
        //console.log(subscription);
        return;
      }
      //console.log("sub not exist");
      //not subcribed yet
      const lastReqPermissionDate = localStorage.getItem(
        "lastReqPermissionDate"
      );
      if (
        !lastReqPermissionDate ||
        Date.now() - JSON.parse(lastReqPermissionDate) > 5000
      ) {
        setReqNotiPermission(true);
      }
    };
    checkSubAndReq();
  }, [restaurantId]);
  return (
    <div
      className={
        reqNotiPermission
          ? "noti-permission-outer-container"
          : "noti-permission-outer-container noti-permission-outer-container-hide"
      }
    >
      <div className="noti-permission-container">
        <h3>
          <FontAwesomeIcon icon={faBell} style={{ marginRight: "5px" }} />
          Notifications
          <FontAwesomeIcon icon={faBell} style={{ marginLeft: "5px" }} />
        </h3>
        <p>
          Let us send you notifications when your restaurant receive new orders.
        </p>
        <div className="noti-permission-btn-container">
          <button className="noti-later" onClick={handleLater}>
            LATER
          </button>
          <button className="noti-okay" onClick={requestPermission}>
            OKAY
          </button>
        </div>
        <button className="close-noti-req" onClick={handleLater}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default RequestPermission;
