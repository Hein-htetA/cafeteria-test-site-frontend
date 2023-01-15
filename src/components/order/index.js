import React, { useRef } from "react";

import ConnectionError from "./OrderStates/ConnectionError";
import EmptyOrder from "./OrderStates/EmptyOrder";
import EmptyOrder1 from "./OrderStates/EmptyOrder1";

import "./index.css";
import LoadingOrder from "./OrderStates/LoadingOrder";
import OrderNav from "./OrderNav";
import SingleOrder from "./SingleOrder";
import { useSelector } from "react-redux";

export const displayOrder = (data, type, status) => {
  if (status === "failed") {
    return <ConnectionError />;
  } else if (status === "loading") {
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

  const orderData = useSelector((state) => state.order.orderData);
  const status = useSelector((state) => state.order.status);

  return (
    <main className="order-container">
      <OrderNav {...{ onClick1, onClick2, onClick3 }} />
      <h3 ref={orderAcceptedRef}>Order Queue</h3>
      {displayOrder(orderData, "order", status)}

      <h3 ref={onDeliveryRef} className="on-delivery-title">
        On Delivery
      </h3>
      {displayOrder(orderData, "onDelivery", status)}
    </main>
  );
};

export default Order;
