import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";
import { useOrderContext } from "../../Context/OrderContext";

import ConnectionError from "./OrderStates/ConnectionError";
import EmptyOrder from "./OrderStates/EmptyOrder";
import EmptyOrder1 from "./OrderStates/EmptyOrder1";

import "./index.css";
import LoadingOrder from "./OrderStates/LoadingOrder";
import OrderNav from "./OrderNav";
import SingleOrder from "./SingleOrder";

export const displayOrder = (data, type, orderLoading, orderError) => {
  if (orderError) {
    return <ConnectionError />;
  }

  if (orderLoading) {
    return <LoadingOrder />;
  }

  const afterFilter = data.filter((order) => order.orderState === type);
  if (afterFilter.length === 0) {
    if (type === "onDelivery") return <EmptyOrder />;
    return <EmptyOrder1 />;
  }
  return afterFilter.map((order) => <SingleOrder {...order} key={order._id} />);
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
