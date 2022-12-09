import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";
import { useOrderContext } from "../../Context/OrderContext";
import { useUiContext } from "../../Context/UiContext";
import { localBaseUrl } from "../utils/baseUrl";
import ConnectionError from "./OrderStates/ConnectionError";
import EmptyOrder from "./OrderStates/EmptyOrder";
import EmptyOrder1 from "./OrderStates/EmptyOrder1";

import "./index.css";
import LoadingOrder from "./OrderStates/LoadingOrder";
import OrderNav from "./OrderNav";
import SingleOrder from "./SingleOrder";

const dateSortFun = (a, b) => {
  if (a.updatedAt > b.updatedAt) {
    return -1;
  } else if (a.updatedAt < b.updatedAt) {
    return 1;
  } else {
    return 0;
  }
};

export const displayOrder = (data, type, orderLoading, orderError) => {
  if (orderError) {
    return <ConnectionError />;
  }

  if (orderLoading) {
    return <LoadingOrder />;
  }

  const afterFilterSort = data.filter((order) => order.orderState === type);
  if (afterFilterSort.length === 0) {
    if (type === "onDelivery") return <EmptyOrder />;
    return <EmptyOrder1 />;
  }
  return afterFilterSort.map((order) => (
    <SingleOrder {...order} key={order._id} />
  ));
};

const Order = () => {
  const { data, orderLoading, orderError } = useOrderContext();

  const orderReceivedRef = useRef(null);
  const orderAcceptedRef = useRef(null);
  const onDeliveryRef = useRef(null);
  const onClick1 = () => {
    window.scrollTo(0, orderAcceptedRef.current.offsetTop);
  };
  const onClick2 = () => {
    window.scrollTo(0, orderReceivedRef.current.offsetTop);
  };
  const onClick3 = () => {
    window.scrollTo(0, onDeliveryRef.current.offsetTop);
  };

  return (
    <main className="order-container">
      <OrderNav {...{ onClick1, onClick2, onClick3 }} />
      <h3 ref={orderAcceptedRef}>Order Queue</h3>
      {displayOrder(data, "order", orderLoading, orderError)}

      <h3 ref={onDeliveryRef}>On Delivery</h3>
      {displayOrder(data, "onDelivery", orderLoading, orderError)}
    </main>
  );
};

export default Order;
